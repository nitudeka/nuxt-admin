module.exports.convertToSlug = txt => {
  return txt
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
