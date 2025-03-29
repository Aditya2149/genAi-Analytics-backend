const db = require('../config/db');

class User {
  static findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  }

  static createUser(email, password) {
    const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
      .run(email, password);
    return result.lastInsertRowid;
  }
}

module.exports = User;