const NotificationModel = require("../models/notification.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Get all notifications (Admin)
const getNotifications = catchAsyncErrors(async (req, res, next) => {
  const notifications = await NotificationModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    notifications,
  });
});

// Update notification status (Admin)
const updateNotification = catchAsyncErrors(async (req, res, next) => {
  const notification = await NotificationModel.findById(req.params.id);
  if (!notification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  notification.status = "read";
  await notification.save();

  const notifications = await NotificationModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    notifications,
  });
});

module.exports = {
  getNotifications,
  updateNotification,
};
