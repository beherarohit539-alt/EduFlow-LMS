const OrderModel = require("../models/order.model");
const userModel = require("../models/user.model");
const CourseModel = require("../models/course.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create Order / Enrollment
const createOrder = catchAsyncErrors(async (req, res, next) => {
  const { courseId, payment_info } = req.body;
  const user = await userModel.findById(req.user?._id);

  const courseAlreadyPurchased = user?.courses?.some(
    (item) => item.courseId === courseId
  );

  if (courseAlreadyPurchased) {
    return next(new ErrorHandler("You have already enrolled in this course", 400));
  }

  const course = await CourseModel.findById(courseId);

  const orderData = {
    courseId,
    userId: user?._id || "usr_guest",
    payment_info,
  };

  // Push course to user courses
  if (user) {
    user.courses.push({ courseId });
    await user.save();
  }

  // Update purchased count on course
  if (course) {
    course.purchased = (course.purchased || 0) + 1;
    await course.save();
  }

  const order = await OrderModel.create(orderData);

  res.status(201).json({
    success: true,
    order,
  });
});

// Get All Orders (Admin)
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
});

module.exports = {
  createOrder,
  getAllOrders,
};
