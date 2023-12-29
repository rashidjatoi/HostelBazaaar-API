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

      let amentity = await AmentityModel.findOne({ hostelId });

      if (!amentity) {
        amentity = new AmentityModel({ hostelId, ...amenities });
      } else {
        Object.assign(amentity, amenities);
      }

      await amentity.save();
      return res.status(200).json({ message: "Amenities Updated" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = amentitiesController;
