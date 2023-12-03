const notFound = (req, res, next) => {
  res.status(404).json("Route isn't found");
};
module.exports = notFound;
