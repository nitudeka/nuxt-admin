const { convertToSlug } = require("../../../lib/common");
const { getDb } = require("../../../lib/db");

module.exports.imageUpload = (req, res) => {
  res.json({
    success: 1,
    file: {
      url: `${process.env.BASE_URL}/uploads/${req.file.filename}`
    }
  });
};

module.exports.save = async (req, res) => {
  const db = getDb();

  const { heading, featuredImg, description, author, data } = req.body;

  if (heading && featuredImg && description && author && data) {
    const currentTimestamp = Date.now();
    const slug = convertToSlug(heading);

    const doc = {
      author,
      heading,
      featuredImg,
      description,
      data,
      slug,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp
    };

    await db.posts.insertOne(doc);
    res.json(doc);
  } else {
    res.status(400).json({ message: "missing required fields" });
  }
};
