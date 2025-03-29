const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../database.db');
const db = new Database(dbPath);

// Initialize database structure
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product TEXT,
    region TEXT,
    amount REAL,
    date TEXT
  )
`).run();

// Insert sample data if empty
const rowCount = db.prepare('SELECT COUNT(*) as count FROM sales').get().count;
if (rowCount === 0) {
  const insert = db.prepare(`
    INSERT INTO sales (product, region, amount, date)
    VALUES (@product, @region, @amount, @date)
  `);
  
  const sampleData = [
    { product: 'Laptop', region: 'North', amount: 1200.50, date: '2023-01-15' },
    { product: 'Phone', region: 'South', amount: 800.25, date: '2023-01-16' },
    { product: 'Tablet', region: 'East', amount: 450.75, date: '2023-01-17' }
  ];
  
  const insertMany = db.transaction((data) => {
    for (const item of data) insert.run(item);
  });
  
  insertMany(sampleData);
}

module.exports = db;