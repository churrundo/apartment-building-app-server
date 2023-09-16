const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    
    description: {
      type: String,
      required: true,
      trim: true,
    },

    options: [
      {
        optionText: {
          type: String,
          required: true,
          trim: true,
        },
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],

    buildingId: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      required: "true",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    votedUserIds: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],

    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("Poll", PollSchema);

module.exports = Poll;
