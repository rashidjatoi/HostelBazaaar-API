const AmentityModel = require("../models/amentities_model");
const { validationResult } = require("express-validator");

const amentitiesController = {
  addOrUpdateAmenities: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((err) => err.msg) });
      }

      const { hostelId, ...amenities } = req.body;

      await AmentityModel.findOne({ hostelId })
        .then(async (amentity) => {
          if (!amentity) {
            await AmentityModel.create({ hostelId, ...amenities });
          } else {
            Object.assign(amentity, amenities);
            await amentity.save();
          }
          return res.status(200).json({ message: "Amenities Updated" });
        }).catch((err) => {
          return res.status(200).json({ error: "Data not valid" });
        })
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = amentitiesController;
