const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const inputFilePath = '/Users/halitsengel/Documents/ta eifu/Stok için data.xlsx';
const outputFilePath = path.join(__dirname, 'src', 'data', 'products.json');

try {
  // Read the Excel file
  console.log('Reading Excel file from:', inputFilePath);
  const workbook = xlsx.readFile(inputFilePath);
  
  // Assuming data is in the first sheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // Convert sheet to JSON array
  const rawData = xlsx.utils.sheet_to_json(worksheet, { defval: '' });
  
  // Filter and format the data
  // The first row contains the actual headers in the values
  const products = [];
  
  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    const ref = (row['Price List'] || '').toString().trim();
    const group = (row['__EMPTY'] || '').toString().trim();
    const name = (row['__EMPTY_1'] || '').toString().trim();
    const platform = (row['__EMPTY_2'] || '').toString().trim();
    
    if (ref && name) {
      products.push({
        id: i,
        ref,
        group,
        name,
        platform
      });
    }
  }
  
  // Create data directory if it doesn't exist
  const dir = path.dirname(outputFilePath);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }

  // Write to JSON
  fs.writeFileSync(outputFilePath, JSON.stringify(products, null, 2), 'utf8');
  console.log(`Successfully extracted ${products.length} products to ${outputFilePath}`);
} catch (error) {
  console.error('Error extracting data:', error);
}
