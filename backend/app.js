const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { CONFIG } = require("./config");
const { errorMiddleware } = require("./middlewares/error");
const userRouter = require("./routes/user.routes");
const courseRouter = require("./routes/course.routes");
const orderRouter = require("./routes/order.routes");
const notificationRouter = require("./routes/notification.route");
const analyticsRouter = require("./routes/analytics.routes");
const layoutRouter = require("./routes/layout.routes");

// body-parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://eduflow-lms-42xn.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || origin.includes("onrender.com")) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true, // to send cookies
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/layout", layoutRouter);

// testing route
app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "api is working",
  });
});

app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);

module.exports = { app };
