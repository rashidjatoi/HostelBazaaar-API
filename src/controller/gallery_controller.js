const GalleryModel = require("../models/gallery_model");
const { validationResult } = require("express-validator");

const galleryController = {
  // Add Gallery
  addGallery: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((err) => err.msg) });
      }

      const { hostelId, images } = req.body;

      let gallery = await GalleryModel.findOne({ hostelId });

      if (!gallery) {
        gallery = new GalleryModel({
          hostelId: hostelId,
          images: images,
        });
      } else {
        if (images && images.length > 0) {
          gallery.images.push(...images);
        }
      }

      await gallery.save();

      return res.status(200).json({ message: "Gallery Updated" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = galleryController;
