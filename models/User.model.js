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
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);