const express = require("express");
const { getNotifications, updateNotification } = require("../controllers/notification.controller");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const notificationRouter = express.Router();

notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

module.exports = notificationRouter;
