const ReviewsModel = require("../models/reviews_model");
const HostelModel = require("../models/hostel_model");
const UserReviewModel = require("../models/user_reviews_model");
const { validationResult } = require("express-validator");

// Reviews Controller
const reviewsController = {
  getUserReview: async function (req, res) {
    try {
      let reviews;

      const { hostelId, userId } = req.query;

      if (hostelId) {
        reviews = await UserReviewModel.find({ hostelId });
      } else if (userId) {
        reviews = await UserReviewModel.find({ userId });
      } else {
        reviews = await UserReviewModel.find();
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
