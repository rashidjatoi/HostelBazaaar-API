const AmentitiesRouter = require("express").Router();
const AmentitiesController = require("../controller/amentities_controller");
const { check } = require("express-validator");

// POST ALL AMENITIES for a Hostel
AmentitiesRouter.post(
  "/hostel/addAmenities",
  [
    check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
    check("freeWifi", "Please provide a valid value for Free Wifi")
      .isBoolean()
      .optional(),
    check(
      "privateBathroom",
      "Please provide a valid value for Private Bathroom"
    )
      .isBoolean()
      .optional(),
    check("freeParking", "Please provide a valid value for Free Parking")
      .isBoolean()
      .optional(),
    check("helpDesk", "Please provide a valid value for Help Desk")
      .isBoolean()
      .optional(),
    check("airCondition", "Please provide a valid value for Air Condition")
      .isBoolean()
      .optional(),
    check("keyAccess", "Please provide a valid value for Key Access")
      .isBoolean()
      .optional(),
    check("transportation", "Please provide a valid value for Transportation")
      .isBoolean()
      .optional(),
  ],
  AmentitiesController.addOrUpdateAmenities
);

module.exports = AmentitiesRouter;
