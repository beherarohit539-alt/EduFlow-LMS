const { app } = require("./app");
const { CONFIG } = require("./config");
const connectDb = require("./utils/db");
const { v2: cloudinary } = require("cloudinary");

// cloudinary config
cloudinary.config({
  cloud_name: CONFIG.CLOUD_NAME,
  api_key: CONFIG.CLOUDINARY_API,
  api_secret: CONFIG.CLOUDINARY_SECRET,
});

const PORT = CONFIG.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/test`);
  connectDb();
});
