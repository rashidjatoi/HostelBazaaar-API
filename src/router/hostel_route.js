const hostelRouter = require("express").Router();
const HostelController = require("../controller/hostel_controller");
const { check } = require("express-validator");

// GET ALL HOSTELS
hostelRouter.get("/hostel/getHostels", HostelController.getHostels);
// POST ALL HOSTELS
hostelRouter.post(
  "/hostel/addHostels",
  [
    check("thumbnail", "Please Enter thumbnail")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("title", "Please Enter a Title").not().isEmpty().trim().escape(),
    check("desc", "Please Enter a Description").not().isEmpty().trim().escape(),
    check("location", "Please Enter a Location")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("rating", "Please Enter Price")
      .not()
      .isEmpty()
      .isNumeric()
      .toInt()
      .trim()
      .escape(),
    check("price", "Please Enter Price")
      .not()
      .isEmpty()
      .isNumeric()
      .toInt()
      .trim()
      .escape(),
  ],
  HostelController.addHostel
);

module.exports = hostelRouter;
