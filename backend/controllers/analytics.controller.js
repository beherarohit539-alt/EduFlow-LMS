const userModel = require("../models/user.model");
const CourseModel = require("../models/course.model");
const OrderModel = require("../models/order.model");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Users analytics
const getUserAnalytics = catchAsyncErrors(async (req, res, next) => {
  const totalUsers = await userModel.countDocuments();
  res.status(200).json({
    success: true,
    totalUsers,
    monthlyUsers: [
      { month: "Jan", count: 120 },
      { month: "Feb", count: 240 },
      { month: "Mar", count: 350 },
    ],
  });
});

// Courses analytics
const getCoursesAnalytics = catchAsyncErrors(async (req, res, next) => {
  const totalCourses = await CourseModel.countDocuments();
  res.status(200).json({
    success: true,
    totalCourses,
  });
});

// Orders analytics
const getOrderAnalytics = catchAsyncErrors(async (req, res, next) => {
  const totalOrders = await OrderModel.countDocuments();
  res.status(200).json({
    success: true,
    totalOrders,
  });
});

module.exports = {
  getUserAnalytics,
  getCoursesAnalytics,
  getOrderAnalytics,
};
