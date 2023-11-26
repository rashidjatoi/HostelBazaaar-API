const newsletterRouter = require("express").Router();
const newsletterController = require("../controller/news_letter_controller");

newsletterRouter.post("/api/v1/newsletter", newsletterController.saveEmail);
newsletterRouter.get("/api/v1/newsletter", newsletterController.fetchEmail);

module.exports = newsletterRouter;
