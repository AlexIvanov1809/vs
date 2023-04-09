const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(ApiError.UnauthorizedError());
      }
      // раз уже есть token.service, то работу с jwt нужно вынести туда
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // при такой записи через запятую первое условие будет проигнорировано
      if ((decoded.role !== role, decoded.role !== "OWNER")) {
        return next(ApiError.forbidden());
      }
      req.user = decoded;
      next();
    } catch (e) {
      next(ApiError.UnauthorizedError());
    }
  };
};
