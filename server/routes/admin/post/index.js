module.exports.imageUpload = (req, res) => {
  res.json({
    success: 1,
    file: {
      url: `${process.env.BASE_URL}/uploads/${req.file.filename}`
    }
  });
};
