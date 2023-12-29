const HostelModel = require("../models/hostel_model");
const AmentityModel = require("../models/amentities_model");
const hostelController = {
  // GET ALL HOSTEL
  getHostels: async (req, res) => {
    try {
      const hostels = await HostelModel.find();
      let hostelsWithAmenities = [];

      for (const element of hostels) {
        const amenities = await AmentityModel.findOne({
          hostelId: element._id,
        });

        const hostelWithAmenities = {
          _id: element._id,
          thumbnail: element.thumbnail,
          title: element.title,
          desc: element.desc,
          price: element.price,
          location: element.location,
          rating: element.rating,
          date: element.date,
          amentities: amenities
            ? {
                freeWifi: amenities.freeWifi,
                privateBathroom: amenities.privateBathroom,
                freeParking: amenities.freeParking,
                helpDesk: amenities.helpDesk,
                airCondition: amenities.airCondition,
                keyAccess: amenities.keyAccess,
                transportation: amenities.transportation,
              }
            : null,
        };
        hostelsWithAmenities.push(hostelWithAmenities);
      }
      res.json({ hostels: hostelsWithAmenities });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = hostelController;
