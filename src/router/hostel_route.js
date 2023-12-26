const hostelRouter = require('express').Router();
const HostelController = require("../controller/hostel_controller");

// GET ALL HOSTELS
hostelRouter.get('/hostel/getHostels', HostelController.getHostels);

module.exports = hostelRouter;