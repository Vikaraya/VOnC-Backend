const ImageCategory = require('../models/Image');

const getImagesByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const categoryData = await ImageCategory.findOne({ category });

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(categoryData.images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images' });
  }
};

module.exports = { getImagesByCategory };
