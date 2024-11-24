const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  category: { type: String, required: true },
  images: [
    {
      path: { type: String, required: true },
    },
  ],
});

const Images = mongoose.model("Images", Image);
module.exports = Images;
