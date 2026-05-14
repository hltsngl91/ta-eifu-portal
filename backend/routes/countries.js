import express from 'express';
import { poolPromise } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        con.NameEn AS ContinentName,
        c.Id,
        c.NameEn AS CountryName,
        c.FlagEmoji,
        c.IsoCode
      FROM Continents con
      JOIN Countries c ON con.Id = c.ContinentId
      WHERE c.IsActive = 1
      ORDER BY con.SortOrder, c.SortOrder
    `);
    
    const data = {};
    result.recordset.forEach(row => {
      if (!data[row.ContinentName]) {
        data[row.ContinentName] = [];
      }
      data[row.ContinentName].push({
        id: row.Id,
        name: row.CountryName,
        flag: row.FlagEmoji,
        isoCode: row.IsoCode
      });
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
