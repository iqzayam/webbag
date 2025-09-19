const Database = require("better-sqlite3");
const db = new Database("tokens.db");

module.exports = (req, res) => {
  if (req.method === "POST") {
    const { token, username, password } = req.body;

    const row = db.prepare("SELECT * FROM tokens WHERE code = ?").get(token);
    if (!row) {
      return res.status(400).json({ error: "Token tidak valid" });
    }

    db.prepare("INSERT INTO users (username, password, package) VALUES (?, ?, ?)").run(username, password, row.package);
    db.prepare("DELETE FROM tokens WHERE code = ?").run(token);

    return res.json({
      success: true,
      username,
      password,
      package: row.package
    });
  }

  res.status(405).json({ error: "Method not allowed" });
};
