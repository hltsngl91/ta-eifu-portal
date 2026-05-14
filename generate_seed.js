import fs from 'fs';

async function generateSeed() {
  const continents = {
    'Africa': [],
    'Asia': [],
    'Europe': [],
    'North America': [],
    'South America': [],
    'Oceania': []
  };

  const countries = JSON.parse(fs.readFileSync('./node_modules/world-countries/countries.json', 'utf8'));

  for (const country of countries) {
    const region = country.region;
    const subregion = country.subregion;
    let continent = null;
    
    if (region === 'Americas') {
      continent = subregion === 'South America' ? 'South America' : 'North America';
    } else if (region === 'Africa') {
      continent = 'Africa';
    } else if (region === 'Asia') {
      continent = 'Asia';
    } else if (region === 'Europe') {
      continent = 'Europe';
    } else if (region === 'Oceania') {
      continent = 'Oceania';
    }

    if (continent && continents[continent]) {
      continents[continent].push({
        name: country.name.common,
        isoCode: country.cca2,
        flag: country.flag || ''
      });
    }
  }

  // Sort countries alphabetically
  for (const c of Object.keys(continents)) {
    continents[c].sort((a, b) => a.name.localeCompare(b.name));
  }

  let sql = `USE TA_EIFU_DB;
GO

IF OBJECT_ID('Countries', 'U') IS NOT NULL DROP TABLE Countries;
IF OBJECT_ID('Continents', 'U') IS NOT NULL DROP TABLE Continents;
GO

CREATE TABLE Continents (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    NameEn NVARCHAR(100) NOT NULL,
    SortOrder INT NOT NULL DEFAULT 0
);
GO

CREATE TABLE Countries (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ContinentId INT NOT NULL FOREIGN KEY REFERENCES Continents(Id),
    NameEn NVARCHAR(100) NOT NULL,
    NameTr NVARCHAR(100) NULL,
    IsoCode NVARCHAR(10) NULL,
    FlagEmoji NVARCHAR(10) NOT NULL,
    IsActive BIT NOT NULL DEFAULT 1,
    SortOrder INT NOT NULL DEFAULT 0
);
GO

INSERT INTO Continents (NameEn, SortOrder) VALUES 
('Africa', 1),
('Asia', 2),
('Europe', 3),
('North America', 4),
('South America', 5),
('Oceania', 6);
GO

`;

  const escapeSql = (str) => str.replace(/'/g, "''");

  for (const continent of Object.keys(continents)) {
    let idx = 1;
    for (const c of continents[continent]) {
      sql += `INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = '${continent}'), N'${escapeSql(c.name)}', '${c.isoCode}', N'${escapeSql(c.flag)}', ${idx});\n`;
      idx++;
    }
    sql += `GO\n\n`;
  }

  fs.writeFileSync('seed_full.sql', sql);
  console.log('seed_full.sql generated.');
}

generateSeed().catch(console.error);
