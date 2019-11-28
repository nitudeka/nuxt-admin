const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const adminCredentialsPath = path.join(
  __dirname,
  "..",
  "..",
  "bin",
  "admin.json"
);

module.exports = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    fs.readFile(adminCredentialsPath, "utf8", (err, data) => {
      const credentials = JSON.parse(data);

      let valid = false;
      for (let i = 0; i < credentials.length; i++) {
        if (
          credentials[i].username === username &&
          credentials[i].password === password
        ) {
          valid = true;
          break;
        }
      }
      if (valid) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET);

        res.json({ token });
      } else {
        res.json({ message: "incorrect username or password" });
      }
    });
  } else {
    res.status(400).json({ message: "missing username or password" });
  }
};
