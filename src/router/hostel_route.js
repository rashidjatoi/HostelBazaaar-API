const hostelRouter = require('express').Router();
const HostelController = require("../controller/hostel_controller");

hostelRouter.get('/hostel/getHostels', HostelController.getHostels);

module.exports = hostelRouter;