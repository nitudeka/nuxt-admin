const express = require("express");
const consola = require("consola");
const multer = require("multer");
const path = require("path");
const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const { initDb } = require("./lib/db");
const app = express();

// Initialize multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/uploads/"),
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage: storage }).single("image");

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

// admin routes
const adminRoutes = require("./routes/admin/");

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  const dir = path.join(__dirname, "public");
  app.use(express.static(dir));
  app.use(bodyParser.json());

  // admin routes
  app.use("/api/admin", upload, adminRoutes);

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);

  try {
    await initDb(process.env.MONGO_URL);
    consola.success("connected successfully to database");
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    });
  } catch (err) {
    console.log(err);
    consola.error("could not connect to database");
  }
}
start();
