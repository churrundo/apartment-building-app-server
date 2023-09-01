const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    complaints: [{
        type: Schema.Types.ObjectId,
        ref: 'Complaint'
    }],
    detailsId: {
        type: Schema.Types.ObjectId,
        ref: 'Detail'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    announcements: [{
        type: Schema.Types.ObjectId,
        ref: 'Announcement'
    }],
    details: {
        makeAvailable: Boolean,
        apartmentNumber: String,
        profilePicture: String, // Future iteration, implement Cloudinary image upload
        contactNumber: String,
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
            linkedin: String,
            other: String,
        },
        languagesSpoken: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);