const mongoose = require("mongoose");

const newletterSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },

  number: {
    type: Number,
    trim: true,
  },

  email: {
    required: true,
    unique: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },

      message: "Please enter a Valid Email",
    },
  },
});

const newsLetterModel = mongoose.model("NewsLetter", newletterSchema);

module.exports = newsLetterModel;
