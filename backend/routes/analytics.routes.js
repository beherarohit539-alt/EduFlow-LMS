const express = require("express");
const {
  getUserAnalytics,
  getCoursesAnalytics,
  getOrderAnalytics,
} = require("../controllers/analytics.controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);

analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin", "instructor"),
  getCoursesAnalytics
);

analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrderAnalytics
);

module.exports = analyticsRouter;
