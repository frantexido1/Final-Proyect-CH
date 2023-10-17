const EErrors = require("../../service/errors/enums");

module.exports = (error, req, res, next) => {
  switch (error.message) {
    case EErrors.INVALID_TYPES_ERROR:
      res.status(401).json({
        message: "Invalid credentials",
      });
      break;
    default:
      res.status(500).json({
        message: "Internal server error",
      });
      break;
  }
};
