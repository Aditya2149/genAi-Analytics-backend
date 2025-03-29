const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database.db');
const db = new sqlite3.Database(dbPath);

// Initialize database with users and sample data
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Sample data table
  db.run(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT,
      region TEXT,
      amount REAL,
      date TEXT
    )
  `);

  // Insert sample sales data if empty
  db.get("SELECT COUNT(*) as count FROM sales", (err, row) => {
    if (row.count === 0) {
      db.run(`
        INSERT INTO sales (product, region, amount, date)
        VALUES 
          ('Laptop', 'North', 1200.50, '2023-01-15'),
          ('Phone', 'South', 800.25, '2023-01-16'),
          ('Tablet', 'East', 450.75, '2023-01-17')
      `);
    }
  });
});

module.exports = db;