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

INSERT INTO Continents (NameEn, SortOrder) VALUES 
('Africa', 1),
('Asia', 2),
('Europe', 3),
('North America', 4),
('South America', 5),
('Oceania', 6);
GO

INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Algeria', 'DZ', N'🇩🇿', 1);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Angola', 'AO', N'🇦🇴', 2);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Benin', 'BJ', N'🇧🇯', 3);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Botswana', 'BW', N'🇧🇼', 4);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'British Indian Ocean Territory', 'IO', N'🇮🇴', 5);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Burkina Faso', 'BF', N'🇧🇫', 6);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Burundi', 'BI', N'🇧🇮', 7);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Cameroon', 'CM', N'🇨🇲', 8);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Cape Verde', 'CV', N'🇨🇻', 9);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Central African Republic', 'CF', N'🇨🇫', 10);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Chad', 'TD', N'🇹🇩', 11);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Comoros', 'KM', N'🇰🇲', 12);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Djibouti', 'DJ', N'🇩🇯', 13);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'DR Congo', 'CD', N'🇨🇩', 14);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Egypt', 'EG', N'🇪🇬', 15);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Equatorial Guinea', 'GQ', N'🇬🇶', 16);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Eritrea', 'ER', N'🇪🇷', 17);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Eswatini', 'SZ', N'🇸🇿', 18);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Ethiopia', 'ET', N'🇪🇹', 19);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Gabon', 'GA', N'🇬🇦', 20);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Gambia', 'GM', N'🇬🇲', 21);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Ghana', 'GH', N'🇬🇭', 22);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Guinea', 'GN', N'🇬🇳', 23);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Guinea-Bissau', 'GW', N'🇬🇼', 24);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Ivory Coast', 'CI', N'🇨🇮', 25);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Kenya', 'KE', N'🇰🇪', 26);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Lesotho', 'LS', N'🇱🇸', 27);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Liberia', 'LR', N'🇱🇷', 28);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Libya', 'LY', N'🇱🇾', 29);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Madagascar', 'MG', N'🇲🇬', 30);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Malawi', 'MW', N'🇲🇼', 31);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Mali', 'ML', N'🇲🇱', 32);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Mauritania', 'MR', N'🇲🇷', 33);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Mauritius', 'MU', N'🇲🇺', 34);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Mayotte', 'YT', N'🇾🇹', 35);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Morocco', 'MA', N'🇲🇦', 36);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Mozambique', 'MZ', N'🇲🇿', 37);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Namibia', 'NA', N'🇳🇦', 38);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Niger', 'NE', N'🇳🇪', 39);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Nigeria', 'NG', N'🇳🇬', 40);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Republic of the Congo', 'CG', N'🇨🇬', 41);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Réunion', 'RE', N'🇷🇪', 42);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Rwanda', 'RW', N'🇷🇼', 43);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Saint Helena, Ascension and Tristan da Cunha', 'SH', N'🇸🇭', 44);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'São Tomé and Príncipe', 'ST', N'🇸🇹', 45);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Senegal', 'SN', N'🇸🇳', 46);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Seychelles', 'SC', N'🇸🇨', 47);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Sierra Leone', 'SL', N'🇸🇱', 48);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Somalia', 'SO', N'🇸🇴', 49);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'South Africa', 'ZA', N'🇿🇦', 50);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'South Sudan', 'SS', N'🇸🇸', 51);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Sudan', 'SD', N'🇸🇩', 52);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Tanzania', 'TZ', N'🇹🇿', 53);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Togo', 'TG', N'🇹🇬', 54);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Tunisia', 'TN', N'🇹🇳', 55);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Uganda', 'UG', N'🇺🇬', 56);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Western Sahara', 'EH', N'🇪🇭', 57);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Zambia', 'ZM', N'🇿🇲', 58);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Africa'), N'Zimbabwe', 'ZW', N'🇿🇼', 59);
GO

INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Afghanistan', 'AF', N'🇦🇫', 1);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Armenia', 'AM', N'🇦🇲', 2);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Azerbaijan', 'AZ', N'🇦🇿', 3);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Bahrain', 'BH', N'🇧🇭', 4);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Bangladesh', 'BD', N'🇧🇩', 5);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Bhutan', 'BT', N'🇧🇹', 6);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Brunei', 'BN', N'🇧🇳', 7);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Cambodia', 'KH', N'🇰🇭', 8);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'China', 'CN', N'🇨🇳', 9);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Georgia', 'GE', N'🇬🇪', 10);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Hong Kong', 'HK', N'🇭🇰', 11);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'India', 'IN', N'🇮🇳', 12);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Indonesia', 'ID', N'🇮🇩', 13);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Iran', 'IR', N'🇮🇷', 14);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Iraq', 'IQ', N'🇮🇶', 15);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Israel', 'IL', N'🇮🇱', 16);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Japan', 'JP', N'🇯🇵', 17);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Jordan', 'JO', N'🇯🇴', 18);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Kazakhstan', 'KZ', N'🇰🇿', 19);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Kuwait', 'KW', N'🇰🇼', 20);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Kyrgyzstan', 'KG', N'🇰🇬', 21);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Laos', 'LA', N'🇱🇦', 22);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Lebanon', 'LB', N'🇱🇧', 23);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Macau', 'MO', N'🇲🇴', 24);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Malaysia', 'MY', N'🇲🇾', 25);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Maldives', 'MV', N'🇲🇻', 26);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Mongolia', 'MN', N'🇲🇳', 27);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Myanmar', 'MM', N'🇲🇲', 28);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Nepal', 'NP', N'🇳🇵', 29);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'North Korea', 'KP', N'🇰🇵', 30);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Oman', 'OM', N'🇴🇲', 31);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Pakistan', 'PK', N'🇵🇰', 32);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Palestine', 'PS', N'🇵🇸', 33);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Philippines', 'PH', N'🇵🇭', 34);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Qatar', 'QA', N'🇶🇦', 35);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Saudi Arabia', 'SA', N'🇸🇦', 36);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Singapore', 'SG', N'🇸🇬', 37);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'South Korea', 'KR', N'🇰🇷', 38);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Sri Lanka', 'LK', N'🇱🇰', 39);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Syria', 'SY', N'🇸🇾', 40);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Taiwan', 'TW', N'🇹🇼', 41);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Tajikistan', 'TJ', N'🇹🇯', 42);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Thailand', 'TH', N'🇹🇭', 43);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Timor-Leste', 'TL', N'🇹🇱', 44);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Türkiye', 'TR', N'🇹🇷', 26);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Turkmenistan', 'TM', N'🇹🇲', 46);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'United Arab Emirates', 'AE', N'🇦🇪', 47);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Uzbekistan', 'UZ', N'🇺🇿', 48);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Vietnam', 'VN', N'🇻🇳', 49);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Asia'), N'Yemen', 'YE', N'🇾🇪', 50);
GO

INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Åland Islands', 'AX', N'🇦🇽', 1);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Albania', 'AL', N'🇦🇱', 2);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Andorra', 'AD', N'🇦🇩', 3);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Austria', 'AT', N'🇦🇹', 4);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Belarus', 'BY', N'🇧🇾', 5);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Belgium', 'BE', N'🇧🇪', 6);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Bosnia and Herzegovina', 'BA', N'🇧🇦', 7);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Bulgaria', 'BG', N'🇧🇬', 8);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Croatia', 'HR', N'🇭🇷', 9);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Cyprus', 'CY', N'🇨🇾', 10);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Czechia', 'CZ', N'🇨🇿', 11);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Denmark', 'DK', N'🇩🇰', 12);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Estonia', 'EE', N'🇪🇪', 13);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Faroe Islands', 'FO', N'🇫🇴', 14);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Finland', 'FI', N'🇫🇮', 15);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'France', 'FR', N'🇫🇷', 16);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Germany', 'DE', N'🇩🇪', 17);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Gibraltar', 'GI', N'🇬🇮', 18);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Greece', 'GR', N'🇬🇷', 19);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Guernsey', 'GG', N'🇬🇬', 20);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Hungary', 'HU', N'🇭🇺', 21);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Iceland', 'IS', N'🇮🇸', 22);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Ireland', 'IE', N'🇮🇪', 23);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Isle of Man', 'IM', N'🇮🇲', 24);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Italy', 'IT', N'🇮🇹', 25);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Jersey', 'JE', N'🇯🇪', 26);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Kosovo', 'XK', N'🇽🇰', 27);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Latvia', 'LV', N'🇱🇻', 28);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Liechtenstein', 'LI', N'🇱🇮', 29);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Lithuania', 'LT', N'🇱🇹', 30);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Luxembourg', 'LU', N'🇱🇺', 31);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Malta', 'MT', N'🇲🇹', 32);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Moldova', 'MD', N'🇲🇩', 33);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Monaco', 'MC', N'🇲🇨', 34);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Montenegro', 'ME', N'🇲🇪', 35);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Netherlands', 'NL', N'🇳🇱', 36);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'North Macedonia', 'MK', N'🇲🇰', 37);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Norway', 'NO', N'🇳🇴', 38);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Poland', 'PL', N'🇵🇱', 39);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Portugal', 'PT', N'🇵🇹', 40);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Romania', 'RO', N'🇷🇴', 41);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Russia', 'RU', N'🇷🇺', 42);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'San Marino', 'SM', N'🇸🇲', 43);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Serbia', 'RS', N'🇷🇸', 44);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Slovakia', 'SK', N'🇸🇰', 45);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Slovenia', 'SI', N'🇸🇮', 46);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Spain', 'ES', N'🇪🇸', 47);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Svalbard and Jan Mayen', 'SJ', N'🇸🇯', 48);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Sweden', 'SE', N'🇸🇪', 49);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Switzerland', 'CH', N'🇨🇭', 50);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Ukraine', 'UA', N'🇺🇦', 51);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'United Kingdom', 'GB', N'🇬🇧', 52);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Europe'), N'Vatican City', 'VA', N'🇻🇦', 53);
GO

INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Anguilla', 'AI', N'🇦🇮', 1);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Antigua and Barbuda', 'AG', N'🇦🇬', 2);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Aruba', 'AW', N'🇦🇼', 3);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Bahamas', 'BS', N'🇧🇸', 4);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Barbados', 'BB', N'🇧🇧', 5);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Belize', 'BZ', N'🇧🇿', 6);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Bermuda', 'BM', N'🇧🇲', 7);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'British Virgin Islands', 'VG', N'🇻🇬', 8);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Canada', 'CA', N'🇨🇦', 9);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Caribbean Netherlands', 'BQ', N'', 10);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Cayman Islands', 'KY', N'🇰🇾', 11);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Costa Rica', 'CR', N'🇨🇷', 12);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Cuba', 'CU', N'🇨🇺', 13);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Curaçao', 'CW', N'🇨🇼', 14);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Dominica', 'DM', N'🇩🇲', 15);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Dominican Republic', 'DO', N'🇩🇴', 16);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'El Salvador', 'SV', N'🇸🇻', 17);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Greenland', 'GL', N'🇬🇱', 18);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Grenada', 'GD', N'🇬🇩', 19);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Guadeloupe', 'GP', N'🇬🇵', 20);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Guatemala', 'GT', N'🇬🇹', 21);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Haiti', 'HT', N'🇭🇹', 22);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Honduras', 'HN', N'🇭🇳', 23);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Jamaica', 'JM', N'🇯🇲', 24);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Martinique', 'MQ', N'🇲🇶', 25);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Mexico', 'MX', N'🇲🇽', 26);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Montserrat', 'MS', N'🇲🇸', 27);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Nicaragua', 'NI', N'🇳🇮', 28);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Panama', 'PA', N'🇵🇦', 29);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Puerto Rico', 'PR', N'🇵🇷', 30);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Saint Barthélemy', 'BL', N'🇧🇱', 31);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Saint Kitts and Nevis', 'KN', N'🇰🇳', 32);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Saint Lucia', 'LC', N'🇱🇨', 33);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Saint Martin', 'MF', N'🇲🇫', 34);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Saint Pierre and Miquelon', 'PM', N'🇵🇲', 35);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Saint Vincent and the Grenadines', 'VC', N'🇻🇨', 36);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Sint Maarten', 'SX', N'🇸🇽', 37);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Trinidad and Tobago', 'TT', N'🇹🇹', 38);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'Turks and Caicos Islands', 'TC', N'🇹🇨', 39);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'United States', 'US', N'🇺🇸', 40);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'United States Minor Outlying Islands', 'UM', N'🇺🇲', 41);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'North America'), N'United States Virgin Islands', 'VI', N'🇻🇮', 42);
GO

INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Argentina', 'AR', N'🇦🇷', 1);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Bolivia', 'BO', N'🇧🇴', 2);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Brazil', 'BR', N'🇧🇷', 3);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Chile', 'CL', N'🇨🇱', 4);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Colombia', 'CO', N'🇨🇴', 5);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Ecuador', 'EC', N'🇪🇨', 6);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Falkland Islands', 'FK', N'🇫🇰', 7);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'French Guiana', 'GF', N'🇬🇫', 8);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Guyana', 'GY', N'🇬🇾', 9);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Paraguay', 'PY', N'🇵🇾', 10);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Peru', 'PE', N'🇵🇪', 11);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Suriname', 'SR', N'🇸🇷', 12);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Uruguay', 'UY', N'🇺🇾', 13);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'South America'), N'Venezuela', 'VE', N'🇻🇪', 14);
GO

INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'American Samoa', 'AS', N'🇦🇸', 1);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Australia', 'AU', N'🇦🇺', 2);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Christmas Island', 'CX', N'🇨🇽', 3);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Cocos (Keeling) Islands', 'CC', N'🇨🇨', 4);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Cook Islands', 'CK', N'🇨🇰', 5);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Fiji', 'FJ', N'🇫🇯', 6);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'French Polynesia', 'PF', N'🇵🇫', 7);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Guam', 'GU', N'🇬🇺', 8);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Kiribati', 'KI', N'🇰🇮', 9);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Marshall Islands', 'MH', N'🇲🇭', 10);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Micronesia', 'FM', N'🇫🇲', 11);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Nauru', 'NR', N'🇳🇷', 12);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'New Caledonia', 'NC', N'🇳🇨', 13);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'New Zealand', 'NZ', N'🇳🇿', 14);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Niue', 'NU', N'🇳🇺', 15);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Norfolk Island', 'NF', N'🇳🇫', 16);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Northern Mariana Islands', 'MP', N'🇲🇵', 17);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Palau', 'PW', N'🇵🇼', 18);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Papua New Guinea', 'PG', N'🇵🇬', 19);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Pitcairn Islands', 'PN', N'🇵🇳', 20);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Samoa', 'WS', N'🇼🇸', 21);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Solomon Islands', 'SB', N'🇸🇧', 22);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Tokelau', 'TK', N'🇹🇰', 23);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Tonga', 'TO', N'🇹🇴', 24);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Tuvalu', 'TV', N'🇹🇻', 25);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Vanuatu', 'VU', N'🇻🇺', 26);
INSERT INTO Countries (ContinentId, NameEn, IsoCode, FlagEmoji, SortOrder) VALUES ((SELECT Id FROM Continents WHERE NameEn = 'Oceania'), N'Wallis and Futuna', 'WF', N'🇼🇫', 27);
GO
