const mongoose = require("mongoose");
const { CONFIG } = require("../config");

const connectDb = async () => {
  try {
    const data = await mongoose.connect(CONFIG.DB_URL);
    console.log(`Database connected with ${data.connection.host}`);
  } catch (error) {
    console.log(`Database connection failed: ${error.message}`);
    // Don't exit process in development so server continues running
  }
};

module.exports = connectDb;
