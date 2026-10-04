const LayoutModel = require("../models/layout.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Create layout
const createLayout = catchAsyncErrors(async (req, res, next) => {
  const { type } = req.body;
  const isTypeExist = await LayoutModel.findOne({ type });
  if (isTypeExist) {
    return next(new ErrorHandler(`${type} already exists`, 400));
  }

  const layout = await LayoutModel.create(req.body);

  res.status(200).json({
    success: true,
    message: "Layout created successfully",
    layout,
  });
});

// Edit layout
const editLayout = catchAsyncErrors(async (req, res, next) => {
  const { type } = req.body;
  const layout = await LayoutModel.findOneAndUpdate({ type }, req.body, { new: true });

  res.status(200).json({
    success: true,
    message: "Layout updated successfully",
    layout,
  });
});

// Get layout by type
const getLayoutByType = catchAsyncErrors(async (req, res, next) => {
  const { type } = req.params;
  const layout = await LayoutModel.findOne({ type });

  res.status(200).json({
    success: true,
    layout,
  });
});

module.exports = {
  createLayout,
  editLayout,
  getLayoutByType,
};
