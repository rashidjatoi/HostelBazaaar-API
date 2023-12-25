const ReviewsModel = require("../models/reviews_model");

// Reviews Controller
const reviewsController = {
  saveReviews: async function (req, res) {
    try {
      const {
        hostelId,
        noUser,
        cleanliness,
        amenities,
        location,
        comfort,
        wifi,
      } = req.body;

      if (
        !hostelId ||
        !noUser ||
        !cleanliness ||
        !amenities ||
        !location ||
        !comfort ||
        !wifi
      ) {
        return res.status(400).json({
          success: false,
          message: "All required fields must be provided",
        });
      }

      let existingReview = await ReviewsModel.findOne({ hostelId });

      if (existingReview) {
        existingReview.noUser += 1;
        existingReview.reviews.cleanliness += cleanliness;
        existingReview.reviews.amenities += amenities;
        existingReview.reviews.location += location;
        existingReview.reviews.comfort += comfort;
        existingReview.reviews.wifi += wifi;
      } else {
        existingReview = new ReviewsModel({
          hostelId,
          noUser: noUser + 1,
          reviews: {
            cleanliness,
            amenities,
            location,
            comfort,
            wifi,
          },
        });
      }

      await existingReview.save();

      return res.status(200).json({
        success: true,
        message: "Review saved successfully",
        data: existingReview,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  getReviewsByHostelId: async function (req, res) {
    try {
      const { hostelId } = req.params;

      if (!hostelId) {
        return res.status(400).json({
          success: false,
          message: "Hostel ID parameter is missing",
        });
      }

      const reviews = await ReviewsModel.find({ hostelId });

      if (!reviews || reviews.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No reviews found for the given hostel ID",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = reviewsController;
