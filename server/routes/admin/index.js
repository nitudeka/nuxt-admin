const router = require("express").Router();
// routes
const signin = require("./signin");

router.post("/signin", signin);

module.exports = router;
