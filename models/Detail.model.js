const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailsSchema = new Schema({
    fullName: String,
    apartmentNumber: String,
    profilePicture: String, //Future iteration, implement Cloudinary image upload
    contactNumber: String,
    email: String,
    occupation: String,
    shortBio: String,
    moveInDate: Date,
    emergencyContact: {
        name: String,
        phone: String
    },
    pets: [{
        type: String,
        name: String
    }],
    vehicleDetails: {
        type: String,
        make: String,
        model: String,
        color: String,
        licensePlate: String
    },
    specialSkills: [String],
    socialMediaLinks: {
        instagram: String,
        facebook: String,
        twitter: String,
        other: String,
        linkedin: String,
    },
    languagesSpoken: [String]
});

module.exports = mongoose.model('Detail', detailsSchema);