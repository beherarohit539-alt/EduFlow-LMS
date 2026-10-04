const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unread",
    },
    userId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notification", notificationSchema);

module.exports = NotificationModel;
