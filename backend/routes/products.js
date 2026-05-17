import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { poolPromise, sql } from '../db.js';
import { normalizeProductTaxonomy } from '../productTaxonomy.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.resolve(__dirname, '..', '..', 'src', 'data', 'products.json');

let fallbackProductsCache = null;

const extractRefFromUdi = (value = '') => {
  const source = String(value).trim();
  const match = source.match(/\+EAMG([A-Z0-9]+?)1\/\$/i)
    || source.match(/\+EAMG([A-Z0-9]+?)1\//i)
    || source.match(/\+EAMG([A-Z0-9]{6,10})/i);

  if (!match) return null;

  const ref = match[1].toUpperCase();
  return /[A-Z]1$/.test(ref) ? ref.slice(0, -1) : ref;
};

const loadFallbackProducts = () => {
  if (!fallbackProductsCache) {
    fallbackProductsCache = JSON.parse(fs.readFileSync(productsPath, 'utf8'))
      .map(normalizeProductTaxonomy)
      .map((product) => ({
        Id: product.id,
        Ref: product.ref,
        Group: product.group,
        Name: product.name,
        Platform: product.platform || '',
        Subcategory: product.subcategory || ''
      }));
  }

  return fallbackProductsCache;
};

const sendFallbackResponse = (res, data, err, label) => {
  const reason = err?.message || 'Unknown database error';
  console.warn(`${label} database unavailable; serving fallback data. Reason: ${reason}`);
  res.setHeader('X-Data-Source', 'fallback');
  return res.status(200).json({
    ok: false,
    source: 'fallback',
    error: 'Database unavailable; serving fallback data.',
    data
  });
};

const filterFallbackProducts = ({ category, subcategory, search }) => {
  const normalizedSearch = typeof search === 'string' ? search.trim() : '';
  const searchTerm = (extractRefFromUdi(normalizedSearch) || normalizedSearch).toLowerCase();

  return loadFallbackProducts()
    .filter((product) => {
      if (category && category !== 'default' && product.Group !== category) return false;
      if (subcategory && subcategory !== 'default' && product.Subcategory !== subcategory) return false;
      if (!searchTerm) return true;

      return product.Ref.toLowerCase().includes(searchTerm)
        || product.Name.toLowerCase().includes(searchTerm);
    })
    .sort((first, second) => (
      first.Group.localeCompare(second.Group)
      || first.Subcategory.localeCompare(second.Subcategory)
      || first.Name.localeCompare(second.Name)
    ));
};

router.get('/', async (req, res) => {
  try {
    const { category, subcategory, search } = req.query;
    const normalizedSearch = typeof search === 'string' ? search.trim() : '';
    const searchTerm = extractRefFromUdi(normalizedSearch) || normalizedSearch;
    const pool = await poolPromise;
    let query = 'SELECT * FROM Products WHERE 1=1';
    const request = pool.request();

    if (category && category !== 'default') {
      query += ' AND [Group] = @category';
      request.input('category', sql.NVarChar, category);
    }

    if (subcategory && subcategory !== 'default') {
      query += ' AND Subcategory = @subcategory';
      request.input('subcategory', sql.NVarChar, subcategory);
    }

    if (searchTerm) {
      query += ' AND (LOWER(Ref) LIKE @search OR LOWER(Name) LIKE @search)';
      request.input('search', sql.NVarChar, `%${searchTerm.toLowerCase()}%`);
    }

    query += ' ORDER BY [Group], Subcategory, Name';
    
    const result = await request.query(query);
    res.setHeader('X-Data-Source', 'database');
    res.json(result.recordset);
  } catch (err) {
    return sendFallbackResponse(res, filterFallbackProducts(req.query), err, 'Products');
  }
});

// Helper to get unique categories for the dropdown
router.get('/categories', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT DISTINCT [Group] FROM Products WHERE [Group] IS NOT NULL ORDER BY [Group]');
    res.setHeader('X-Data-Source', 'database');
    res.json(result.recordset.map(r => r.Group));
  } catch (err) {
    const categories = [...new Set(loadFallbackProducts().map((product) => product.Group).filter(Boolean))].sort();
    return sendFallbackResponse(res, categories, err, 'Categories');
  }
});

router.get('/subcategories', async (req, res) => {
  try {
    const { category } = req.query;
    const pool = await poolPromise;
    const request = pool.request();
    let query = "SELECT DISTINCT Subcategory FROM Products WHERE Subcategory IS NOT NULL AND LTRIM(RTRIM(Subcategory)) <> ''";

    if (category && category !== 'default') {
      query += ' AND [Group] = @category';
      request.input('category', sql.NVarChar, category);
    }

    query += ' ORDER BY Subcategory';
    const result = await request.query(query);
    res.setHeader('X-Data-Source', 'database');
    res.json(result.recordset.map(r => r.Subcategory));
  } catch (err) {
    const { category } = req.query;
    const subcategories = [...new Set(
      loadFallbackProducts()
        .filter((product) => !category || category === 'default' || product.Group === category)
        .map((product) => product.Subcategory)
        .filter(Boolean)
    )].sort();
    return sendFallbackResponse(res, subcategories, err, 'Subcategories');
  }
});

export default router;
