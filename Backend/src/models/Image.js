const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
  category: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
