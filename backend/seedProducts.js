import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { poolPromise, sql } from './db.js';
import { normalizeProductTaxonomy } from './productTaxonomy.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsPath = path.join(__dirname, '../src/data/products.json');

async function seed() {
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8')).map(normalizeProductTaxonomy);
    const pool = await poolPromise;

    await pool.request().query(`
      IF COL_LENGTH('Products', 'Subcategory') IS NULL
      BEGIN
        ALTER TABLE Products ADD Subcategory NVARCHAR(150) NULL
      END
    `);
    
    console.log(`Starting to seed ${products.length} products...`);
    
    // Clear existing products
    await pool.request().query('DELETE FROM Products');
    
    // Using a table valued parameter or multiple inserts? 
    // Since it's a few hundred, individual inserts are fine but slow. 
    // Let's use batches.
    
    const batchSize = 100;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      const request = pool.request();
      
      let batchQuery = 'INSERT INTO Products (Id, Ref, [Group], Subcategory, Name, Platform) VALUES ';
      batch.forEach((p, idx) => {
        const idParam = `id${idx}`;
        const refParam = `ref${idx}`;
        const groupParam = `group${idx}`;
        const subcategoryParam = `subcategory${idx}`;
        const nameParam = `name${idx}`;
        const platformParam = `platform${idx}`;
        
        request.input(idParam, sql.Int, p.id);
        request.input(refParam, sql.NVarChar, p.ref);
        request.input(groupParam, sql.NVarChar, p.group);
        request.input(subcategoryParam, sql.NVarChar, p.subcategory || '');
        request.input(nameParam, sql.NVarChar, p.name);
        request.input(platformParam, sql.NVarChar, p.platform || '');
        
        batchQuery += `(@${idParam}, @${refParam}, @${groupParam}, @${subcategoryParam}, @${nameParam}, @${platformParam})${idx === batch.length - 1 ? '' : ','}`;
      });
      
      await request.query(batchQuery);
      console.log(`Inserted batch ${i / batchSize + 1}`);
    }
    
    console.log('Product seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
