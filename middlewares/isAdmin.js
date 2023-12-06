exports.isAdmin = async (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  const err = new Error();
  err.status = 401;
  return next(err);
};
