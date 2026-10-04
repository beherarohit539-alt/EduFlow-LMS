const express = require("express");
const {
  createLayout,
  editLayout,
  getLayoutByType,
} = require("../controllers/layout.controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/edit-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);

layoutRouter.get("/get-layout/:type", getLayoutByType);

module.exports = layoutRouter;
