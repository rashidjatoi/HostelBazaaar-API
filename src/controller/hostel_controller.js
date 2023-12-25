const HostelModel = require('../models/hostel_model');

const hostelController = {
    // GET ALL HOSTEL
    getHostels: async (req, res) => {
        try {
            await HostelModel.find()
                .then((item) => {

                    res.status(200).json({ hostels: item })
                }).catch((err) => {
                    res.status(404).json(err)
                })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
};

module.exports = hostelController;