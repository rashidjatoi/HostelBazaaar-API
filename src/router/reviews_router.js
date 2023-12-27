const reviewsRouter = require("express").Router();
const reviewsController = require("../controller/reviews_controller");
const { check } = require("express-validator");

reviewsRouter.get("/reviews/:hostelId", reviewsController.getReviewsByHostelId);
reviewsRouter.get("/reviews", reviewsController.getUserReview);

module.exports = reviewsRouter;
