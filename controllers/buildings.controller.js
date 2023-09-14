const Building = require("../models/Building.model");
const User = require("../models/User.model");
const {generateToken} = require("../utils/tokenUtil");

exports.createNewBuilding = async (req, res) => {
  try {
    const { address, totalApartments, admin } = req.body;
    const { name, email, _id } = req.payload;

    if (!address || !totalApartments) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingBuilding = await Building.findOne({ address });
    if (existingBuilding) {
      return res
        .status(400)
        .json({ message: "Building with this address already exists." });
    }

    const building = new Building({
      address,
      totalApartments,
      admin,
      residents: [admin],
    });

    const savedBuilding = await building.save(); // Capture the saved building
    res.status(201).json({
      message: "Building created successfully!",
      building: savedBuilding,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getResidents = async (req, res, next) => {
  const buildingId = req.params.buildingId;
  try {
    const building = await Building.findById(buildingId).populate({
      path: "residents",
      match: { "details.makeAvailable": true },
    });
    if (!building) {
      return res.status(404).json({ error: "Building not found" });
    }
    res.json(building.residents);
    console.log(building.residents);
  } catch (error) {
    console.error(
      `Error retrieving residents for building with ID: ${buildingId}`,
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBuildingByAddress = async (req, res) => {
  const building = await Building.findOne({ address: req.query.address });
  if (!building) {
    return res.status(404).json({ message: "Building not found." });
  }
  return res.json(building);
};

exports.getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.buildingId);
    if (!building) {
      return res.status(404).json({ message: "Building not found." });
    }
    return res.json(building);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

exports.addUserToBuilding = async (req, res) => {
  try {
    const buildingId = req.params.buildingId;
    const userId = req.params.userId;

    const building = await Building.findByIdAndUpdate(
      buildingId,
      {
        $push: { residents: userId },
      },
      { new: true }
    );

    if (!building) {
      return res.status(404).json({ message: "Building not found." });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        "residence.building": buildingId,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    };

    const authToken = generateToken(user)
    res.status(200).json({ authToken });
  } catch (error) {
    console.error("Error adding user to building:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.addAnnouncementToBuilding = async (req, res) => {
  const { buildingId, announcementId } = req.params;

  try {
    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ error: "Building not found" });
    }

    if (!building.announcements.includes(announcementId)) {
      building.announcements.push(announcementId);
      await building.save();
    }

    res
      .status(200)
      .json({ message: "Announcement added to building successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addPollToBuilding = async (req, res) => {
  const { buildingId, pollId } = req.params;

  try {
    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ error: "Building not found" });
    }

    if (!building.polls.includes(pollId)) {
      building.polls.push(pollId);
      await building.save();
    }

    res.status(200).json({ message: "Poll added to building successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteBuilding = (req, res) => {
  // This function is a placeholder, you'd need to implement the logic to actually delete the building.
  res.json(`Delete building with ID: ${req.params.id}`);
};
