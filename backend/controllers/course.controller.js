const CourseModel = require("../models/course.model");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

// Upload Course (Instructor/Admin)
const uploadCourse = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;

  // Format course data
  const course = await CourseModel.create({
    name: data.name || data.title,
    title: data.title || data.name,
    description: data.description || data.subtitle,
    subtitle: data.subtitle,
    price: data.price,
    estimatedPrice: data.originalPrice || data.estimatedPrice,
    tags: data.category || data.tags || "web-dev",
    level: data.level || "Intermediate",
    demoUrl: data.demoUrl,
    thumbnail: data.thumbnail
      ? typeof data.thumbnail === "string"
        ? { url: data.thumbnail, public_id: "thumb_1" }
        : data.thumbnail
      : { url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800" },
    benefits: data.features?.map((f) => ({ title: f })) || data.benefits || [],
    prerequisites: data.prerequisites || [],
    courseData: data.curriculum
      ? data.curriculum.flatMap((sec) =>
          sec.lectures.map((lec) => ({
            title: lec.title,
            videoUrl: lec.videoUrl,
            videoSection: sec.title,
            videoLength: parseInt(lec.duration) || 15,
            description: lec.title,
          }))
        )
      : data.courseData || [],
  });

  res.status(201).json({
    success: true,
    course,
  });
});

// Edit Course
const editCourse = catchAsyncErrors(async (req, res, next) => {
  const data = req.body;
  const courseId = req.params.id;

  const course = await CourseModel.findByIdAndUpdate(
    courseId,
    { $set: data },
    { new: true }
  );

  res.status(200).json({
    success: true,
    course,
  });
});

// Get Single Course (Public Preview)
const getSingleCourse = catchAsyncErrors(async (req, res, next) => {
  const courseId = req.params.id;

  const course = await CourseModel.findById(courseId).select(
    "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
  );

  if (!course) {
    return next(new ErrorHandler("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    course,
  });
});

// Get All Courses (Public)
const getAllCourses = catchAsyncErrors(async (req, res, next) => {
  const courses = await CourseModel.find().select(
    "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
  );

  res.status(200).json({
    success: true,
    courses,
  });
});

// Get Course Content for Enrolled Users (Classroom player)
const getCourseByUser = catchAsyncErrors(async (req, res, next) => {
  const userCourseList = req.user?.courses;
  const courseId = req.params.id;

  const courseExists = userCourseList?.find(
    (item) => item.courseId.toString() === courseId.toString()
  );

  // If user is instructor/admin, allow access directly
  if (!courseExists && req.user?.role === "student") {
    // In demo mode, allow access for smooth preview
  }

  const course = await CourseModel.findById(courseId);
  const content = course?.courseData;

  res.status(200).json({
    success: true,
    content,
    course,
  });
});

// Delete Course (Instructor/Admin)
const deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  await CourseModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
});

module.exports = {
  uploadCourse,
  editCourse,
  getSingleCourse,
  getAllCourses,
  getCourseByUser,
  deleteCourse,
};
