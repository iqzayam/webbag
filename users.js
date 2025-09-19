const Database = require("better-sqlite3");
const db = new Database("tokens.db");

module.exports = (req, res) => {
  const rows = db.prepare("SELECT * FROM users").all();
  return res.json(rows);
};
