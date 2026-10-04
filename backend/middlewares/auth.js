const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const { CONFIG } = require("../config");
const userModel = require("../models/user.model");

// Check if user is authenticated
const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies.access_token ||
    (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decoded = jwt.verify(token, CONFIG.ACCESS_TOKEN);

  if (!decoded) {
    return next(new ErrorHandler("Access token is not valid", 401));
  }

  const user = await userModel.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  req.user = user;
  next();
});

// Validate role permissions (RBAC)
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizeRoles };
