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
      } else {
        const { hostelId, images } = req.body;

        await GalleryModel.findOne({ hostelId })
          .then(async (item) => {
            if (item) {
              item.images.push(...images)
              await item.save();
            } else {
              GalleryModel.create({
                hostelId: hostelId,
                images: images,
              })
            }
            return res.status(200).json({ message: "Gallery Updated" });
          }).catch(() => {
            res.status(400).json({ error: "Data not valid" })
          })
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = galleryController;