const router = require("express").Router();
// routes
const signin = require("./signin");
const { imageUpload, save } = require("./post");

router.post("/signin", signin);
router.post("/post", save);
router.post("/post/img", imageUpload);

module.exports = router;
