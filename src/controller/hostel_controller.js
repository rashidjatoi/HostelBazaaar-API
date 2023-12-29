const HostelModel = require("../models/hostel_model");
const AmentityModel = require("../models/amentities_model");
const ReviewsModel = require("../models/reviews_model");
const GalleryModel = require("../models/gallery_model");
const { validationResult } = require("express-validator");

const hostelController = {
  // Add Hostel
  addHostel: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((err) => err.msg) });
      } else {
        const { userId, thumbnail, title, desc, price, location, rating } =
          req.body;
        await HostelModel.create({
          userId: userId,
          thumbnail: thumbnail,
          title: title,
          desc: desc,
          price: price,
          location: location,
          rating: rating,
        }).then((user) => {
          return res.status(200).json(user);
        });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // GET ALL HOSTEL
  getHostels: async (req, res) => {
    try {
      const hostels = await HostelModel.find();
      let hostelsWithAmenities = [];

      for (const element of hostels) {
        const amenities = await AmentityModel.findOne({
          hostelId: element._id,
        });
        const hostelReviews = await ReviewsModel.findOne({
          hostelId: element._id,
        });

        const gallery = await GalleryModel.findOne({
          hostelId: element._id,
        });

        const hostelWithAmenities = {
          _id: element._id,
          thumbnail: element.thumbnail,
          title: element.title,
          desc: element.desc,
          price: element.price,
          location: element.location,
          rating: element.rating,
          date: element.date,
          amentities: amenities
            ? {
                freeWifi: amenities.freeWifi,
                privateBathroom: amenities.privateBathroom,
                freeParking: amenities.freeParking,
                helpDesk: amenities.helpDesk,
                airCondition: amenities.airCondition,
                keyAccess: amenities.keyAccess,
                transportation: amenities.transportation,
              }
            : null,
          reviews: hostelReviews
            ? {
                cleanliness: hostelReviews.cleanliness,
                amenities: hostelReviews.cleanliness,
                location: hostelReviews.cleanliness,
                comfort: hostelReviews.cleanliness,
                wifi: hostelReviews.cleanliness,
              }
            : null,

          images: gallery ? gallery.images : null,
        };
        hostelsWithAmenities.push(hostelWithAmenities);
      }
      res.json({ hostels: hostelsWithAmenities });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = hostelController;
