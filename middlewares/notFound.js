const notFound = (req, res, next) => {
  res.status(404).json("Route is not found");
};
module.exports = notFound;
