const db = require('../config/db');

class User {
  static findByEmail(email, callback) {
    db.get("SELECT * FROM users WHERE email = ?", [email], callback);
  }

  static createUser(email, password, callback) {
    db.run(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password],
      callback
    );
  }
}

module.exports = User;