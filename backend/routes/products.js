import express from 'express';
import { poolPromise, sql } from '../db.js';

const router = express.Router();

const extractRefFromUdi = (value = '') => {
  const source = String(value).trim();
  const match = source.match(/\+EAMG([A-Z0-9]+?)1\/\$/i)
    || source.match(/\+EAMG([A-Z0-9]+?)1\//i)
    || source.match(/\+EAMG([A-Z0-9]{6,10})/i);

  if (!match) return null;

  const ref = match[1].toUpperCase();
  return /[A-Z]1$/.test(ref) ? ref.slice(0, -1) : ref;
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
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper to get unique categories for the dropdown
router.get('/categories', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT DISTINCT [Group] FROM Products WHERE [Group] IS NOT NULL ORDER BY [Group]');
    res.json(result.recordset.map(r => r.Group));
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    res.json(result.recordset.map(r => r.Subcategory));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
