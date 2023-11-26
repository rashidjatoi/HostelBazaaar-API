const NewsletterModel = require("../models/newsletter_model");

// News Controller
const newsletterController = {
  // Save Email Method
  saveEmail: async function (req, res) {
    try {
      const requestData = req.body;
      if (!requestData.name || !requestData.email || !requestData.number) {
        return res.status(400).json({ message: "Please fill all fields" });
      }

      // Check if the email already exists in the database
      const existingEmail = await NewsletterModel.findOne({ email: requestData.email });
      if (existingEmail) {
        return res.json({
          success: true,
          message: "Email already registered",
        });
      }

      const newData = new NewsletterModel(requestData);
      await newData.save();

      return res.json({
        success: true,
        data: newData,
        message: "User Subscribed",
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  // Fetch All Subscribed Emails in Newsletter with Pagination
  fetchEmail: async function (req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const skip = (page - 1) * limit;

      const emailsSubscribe = await NewsletterModel.find({})
        .skip(skip)
        .limit(limit);

      return res.json({
        success: true,
        data: emailsSubscribe,
        message: "Email subscriptions retrieved successfully",
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(emailsSubscribe.length / limit),
          totalItems: emailsSubscribe.length,
        },
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = newsletterController;
