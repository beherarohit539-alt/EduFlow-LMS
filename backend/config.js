require("dotenv").config();

const CLOUD_DB_URL =
  "mongodb+srv://beherarohit752:Rohit12345@cluster0.0y5anh6.mongodb.net/lms_database?retryWrites=true&w=majority&appName=Cluster0";

const CONFIG = {
  PORT: process.env.PORT || 8000,
  ORIGIN: process.env.ORIGIN || ["http://localhost:3000", "http://localhost:5173"],
  DB_URL:
    process.env.DB_URL &&
    !process.env.DB_URL.includes("127.0.0.1") &&
    !process.env.DB_URL.includes("localhost")
      ? process.env.DB_URL
      : CLOUD_DB_URL,
  CLOUD_NAME: process.env.CLOUD_NAME || "demo_cloud",
  CLOUDINARY_API: process.env.CLOUDINARY_API || "123456789",
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET || "sample_secret",
  REDIS_URL: process.env.REDIS_URL || "",
  ACTIVATION_SECRET: process.env.ACTIVATION_SECRET || "activation_secret_key_12345",
  ACCESS_TOKEN: process.env.ACCESS_TOKEN || "access_token_secret_jwt_key_67890",
  REFRESH_TOKEN: process.env.REFRESH_TOKEN || "refresh_token_secret_jwt_key_67890",
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE || 300,
  REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE || 1200,
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: process.env.SMTP_PORT || "465",
  SMTP_SERVICE: process.env.SMTP_SERVICE || "gmail",
  SMTP_MAIL: process.env.SMTP_MAIL || "eduflow.lms@gmail.com",
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || "app_password_here"
};

module.exports = { CONFIG };
