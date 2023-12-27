const mongoose = require("mongoose");
const reviewsSchema = mongoose.Schema({
  hostelId: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  noUser: {
    type: Number,
    required: true,
    default: 1,
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

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reviews", reviewsSchema);