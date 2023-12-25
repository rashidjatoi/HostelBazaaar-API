const reviewsRouter = require("express").Router();
const reviewsController = require("../controller/reviews_controller");

reviewsRouter.post("/reviews", reviewsController.saveReviews);
reviewsRouter.get("/reviews/:hostelId", reviewsController.getReviewsByHostelId);

module.exports = reviewsRouter;
