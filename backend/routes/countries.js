import express from 'express';
import worldCountries from 'world-countries';
import { poolPromise } from '../db.js';

const router = express.Router();

const continentOrder = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

const regionForCountry = (country) => {
  if (country.cca2 === 'TR') {
    return 'Europe';
  }

  if (country.region === 'Americas') {
    return country.subregion === 'South America' ? 'South America' : 'North America';
  }

  return country.region || 'Other';
};

const getFallbackCountries = () => {
  const groupedCountries = {};

  worldCountries
    .filter((country) => country.cca2 && country.name?.common)
    .forEach((country, index) => {
      const region = regionForCountry(country);
      if (!groupedCountries[region]) groupedCountries[region] = [];

      groupedCountries[region].push({
        id: index + 1,
        name: country.name.common,
        flag: country.flag || '',
        isoCode: country.cca2
      });
    });

  return Object.fromEntries(
    Object.entries(groupedCountries)
      .sort(([firstRegion], [secondRegion]) => {
        const firstIndex = continentOrder.indexOf(firstRegion);
        const secondIndex = continentOrder.indexOf(secondRegion);
        if (firstIndex !== -1 || secondIndex !== -1) {
          return (firstIndex === -1 ? 999 : firstIndex) - (secondIndex === -1 ? 999 : secondIndex);
        }
        return firstRegion.localeCompare(secondRegion);
      })
      .map(([region, countries]) => [
        region,
        countries.sort((first, second) => first.name.localeCompare(second.name))
      ])
  );
};

const sendFallbackCountries = (res, err) => {
  const reason = err?.message || 'Unknown database error';
  console.warn(`Countries database unavailable; serving fallback data. Reason: ${reason}`);
  res.setHeader('X-Data-Source', 'fallback');
  return res.status(200).json({
    ok: false,
    source: 'fallback',
    error: 'Database unavailable; serving fallback country data.',
    data: getFallbackCountries()
  });
};

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
      const continentName = row.IsoCode === 'TR' ? 'Europe' : row.ContinentName;

      if (!data[continentName]) {
        data[continentName] = [];
      }
      data[continentName].push({
        id: row.Id,
        name: row.CountryName,
        flag: row.FlagEmoji,
        isoCode: row.IsoCode
      });
    });
    res.setHeader('X-Data-Source', 'database');
    res.json(data);
  } catch (err) {
    return sendFallbackCountries(res, err);
  }
});

export default router;
