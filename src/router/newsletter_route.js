const newsletterRouter = require("express").Router();
const newsletterController = require("../controller/news_letter_controller");

newsletterRouter.post("/", newsletterController.saveEmail);
newsletterRouter.get("/", newsletterController.fetchEmail);

module.exports = newsletterRouter;
