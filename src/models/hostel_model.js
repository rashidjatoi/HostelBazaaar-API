const mongoose = require("mongoose");
const hostelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    // amenities: {
    //     type: Array,
    //     required: true
    // },
    // reviews: {
    //     Cleanliness: {
    //         type: Number
    //     },
    //     Amenities: {
    //         type: Number
    //     },
    //     Location: {
    //         type: Number
    //     },
    //     Comfort: {
    //         type: Number
    //     },
    //     Wifi: {
    //         type: Number
    //     }
    // },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("hostel", hostelSchema);