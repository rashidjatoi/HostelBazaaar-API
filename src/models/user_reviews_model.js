const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  hostelId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  reviews: {
    cleanliness: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Number,
      required: true,
    },
    location: {
      type: Number,
      required: true,
    },
    comfort: {
      type: Number,
      required: true,
    },
    wifi: {
      type: Number,
      required: true,
    },
  },
});

const HostelReview = mongoose.model("HostelReview", reviewSchema);

module.exports = HostelReview;
