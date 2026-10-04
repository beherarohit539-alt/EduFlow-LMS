const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const categorySchema = new mongoose.Schema({
  title: String,
});

const bannerImageSchema = new mongoose.Schema({
  public_id: String,
  url: String,
});

const layoutSchema = new mongoose.Schema({
  type: String,
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: String,
    subTitle: String,
  },
});

const LayoutModel = mongoose.model("Layout", layoutSchema);

module.exports = LayoutModel;
