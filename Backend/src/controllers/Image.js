const Image = require("../models/Image");

const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    if (!images.length) {
      return res.status(404).json({ message: "No images found." });
    }

    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching images." });
  }
};


module.exports = { getImages };

