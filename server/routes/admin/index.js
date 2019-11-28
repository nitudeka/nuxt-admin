const router = require("express").Router();
// routes
const signin = require("./signin");
const { imageUpload } = require("./post");

router.post("/signin", signin);
router.post("/post/img", imageUpload);

module.exports = router;
