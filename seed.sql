USE TA_EIFU_DB;
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

-- Seed Continents
INSERT INTO Continents (NameEn, SortOrder) VALUES 
('Africa', 1),
('Asia', 2),
('Europe', 3),
('North America', 4),
('South America', 5),
('Oceania', 6);
GO

-- Declare variables for Continent IDs
DECLARE @AfricaId INT = (SELECT Id FROM Continents WHERE NameEn = 'Africa');
DECLARE @AsiaId INT = (SELECT Id FROM Continents WHERE NameEn = 'Asia');
DECLARE @EuropeId INT = (SELECT Id FROM Continents WHERE NameEn = 'Europe');
DECLARE @NorthAmericaId INT = (SELECT Id FROM Continents WHERE NameEn = 'North America');
DECLARE @SouthAmericaId INT = (SELECT Id FROM Continents WHERE NameEn = 'South America');
DECLARE @OceaniaId INT = (SELECT Id FROM Continents WHERE NameEn = 'Oceania');

-- Seed Africa
INSERT INTO Countries (ContinentId, NameEn, FlagEmoji, SortOrder) VALUES
(@AfricaId, 'Egypt', N'🇪🇬', 1),
(@AfricaId, 'South Africa', N'🇿🇦', 2),
(@AfricaId, 'Morocco', N'🇲🇦', 3),
(@AfricaId, 'Tunisia', N'🇹🇳', 4),
(@AfricaId, 'Algeria', N'🇩🇿', 5),
(@AfricaId, 'Nigeria', N'🇳🇬', 6),
(@AfricaId, 'Kenya', N'🇰🇪', 7),
(@AfricaId, 'Ethiopia', N'🇪🇹', 8);

-- Seed Asia
INSERT INTO Countries (ContinentId, NameEn, FlagEmoji, SortOrder) VALUES
(@AsiaId, 'Türkiye', N'🇹🇷', 1),
(@AsiaId, 'Iran', N'🇮🇷', 2),
(@AsiaId, 'Jordan', N'🇯🇴', 3),
(@AsiaId, 'Saudi Arabia', N'🇸🇦', 4),
(@AsiaId, 'United Arab Emirates', N'🇦🇪', 5),
(@AsiaId, 'Qatar', N'🇶🇦', 6),
(@AsiaId, 'Kuwait', N'🇰🇼', 7),
(@AsiaId, 'Iraq', N'🇮🇶', 8),
(@AsiaId, 'Lebanon', N'🇱🇧', 9),
(@AsiaId, 'Israel', N'🇮🇱', 10),
(@AsiaId, 'Japan', N'🇯🇵', 11),
(@AsiaId, 'South Korea', N'🇰🇷', 12),
(@AsiaId, 'China', N'🇨🇳', 13),
(@AsiaId, 'India', N'🇮🇳', 14),
(@AsiaId, 'Pakistan', N'🇵🇰', 15),
(@AsiaId, 'Malaysia', N'🇲🇾', 16),
(@AsiaId, 'Singapore', N'🇸🇬', 17);

-- Seed Europe
INSERT INTO Countries (ContinentId, NameEn, FlagEmoji, SortOrder) VALUES
(@EuropeId, 'Germany', N'🇩🇪', 1),
(@EuropeId, 'Türkiye', N'🇹🇷', 2),
(@EuropeId, 'Netherlands', N'🇳🇱', 3),
(@EuropeId, 'France', N'🇫🇷', 4),
(@EuropeId, 'Italy', N'🇮🇹', 5),
(@EuropeId, 'Spain', N'🇪🇸', 6),
(@EuropeId, 'United Kingdom', N'🇬🇧', 7),
(@EuropeId, 'Switzerland', N'🇨🇭', 8),
(@EuropeId, 'Austria', N'🇦🇹', 9),
(@EuropeId, 'Belgium', N'🇧🇪', 10),
(@EuropeId, 'Poland', N'🇵🇱', 11),
(@EuropeId, 'Sweden', N'🇸🇪', 12),
(@EuropeId, 'Denmark', N'🇩🇰', 13),
(@EuropeId, 'Norway', N'🇳🇴', 14),
(@EuropeId, 'Finland', N'🇫🇮', 15);

-- Seed North America
INSERT INTO Countries (ContinentId, NameEn, FlagEmoji, SortOrder) VALUES
(@NorthAmericaId, 'United States', N'🇺🇸', 1),
(@NorthAmericaId, 'Canada', N'🇨🇦', 2),
(@NorthAmericaId, 'Mexico', N'🇲🇽', 3);

-- Seed South America
INSERT INTO Countries (ContinentId, NameEn, FlagEmoji, SortOrder) VALUES
(@SouthAmericaId, 'Brazil', N'🇧🇷', 1),
(@SouthAmericaId, 'Argentina', N'🇦🇷', 2),
(@SouthAmericaId, 'Chile', N'🇨🇱', 3),
(@SouthAmericaId, 'Colombia', N'🇨🇴', 4),
(@SouthAmericaId, 'Peru', N'🇵🇪', 5);

-- Seed Oceania
INSERT INTO Countries (ContinentId, NameEn, FlagEmoji, SortOrder) VALUES
(@OceaniaId, 'Australia', N'🇦🇺', 1),
(@OceaniaId, 'New Zealand', N'🇳🇿', 2);
GO
