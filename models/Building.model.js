const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  totalApartments: {
    type: Number,
    required: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  residents: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  announcements: [{
    type: Schema.Types.ObjectId,
    ref: 'Announcement'
  }],
  polls:[{
    type: Schema.Types.ObjectId,
    ref: "Poll"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Building = mongoose.model('Building', BuildingSchema);

module.exports = Building;