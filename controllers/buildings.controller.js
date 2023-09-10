const Building = require("../models/Building.model");

exports.createNewBuilding = async (req, res) => {
  try {
    const { name, address, totalApartments } = req.body;

    // Validation
    if (!name || !address || !totalApartments) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingBuilding = await Building.findOne({ address });
    if (existingBuilding) {
      return res
        .status(400)
        .json({ message: "Building with this address already exists." });
    }

    const building = new Building({
      name,
      address,
      totalApartments,
    });

    await building.save();
    res
      .status(201)
      .json({ message: "Building created successfully!", building });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
  const { buildingId, userId } = req.params;

  try {
    const building = await Building.findById(buildingId);

    if (!building) {
      return res.status(404).json({ error: "Building not found" });
    }

    if (!building.residents.includes(userId)) {
      building.residents.push(userId);
      await building.save();
    }
    
    res.status(200).json({ message: "User added to building successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
