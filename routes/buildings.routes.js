const express = require("express");
const router = express.Router();
const Building = require("../models/Building.model");

router.post("/", async (req, res) => {
  try {
    const { name, address, totalApartments } = req.body;

    // Validation (can be more in-depth, this is basic)
    if (!name || !address || !totalApartments) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if building already exists based on the address
    const existingBuilding = await Building.findOne({ address });
    if (existingBuilding) {
      return res
        .status(400)
        .json({ message: "Building with this address already exists." });
    }

    // Create a new building
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
});

router.get("/", async (req, res) => {
  if (req.query.address) {
    const building = await Building.findOne({ address: req.query.address });
    if (!building) {
      return res.status(404).json({ message: "Building not found." });
    }
    return res.json(building);
  }
});

router.get("/:buildingId", async (req, res) => {
  if (req.query.address) {
    const building = await Building.findById(req.params.buildingId);
    if (!building) {
      return res.status(404).json({ message: "Building not found." });
    }
    return res.json(building);
  }
});

router.put("/:buildingId/addUser/:userId", async(req, res) => {
  const { buildingId, userId } = req.params;

  console.log('Received request with buildingId:', buildingId);
  console.log('Received request with userId:', userId);

  try {
    const building = await Building.findById(buildingId);
    
    if (!building) {
        console.error('Error: Building not found for ID:', buildingId);
        return res.status(404).json({ error: 'Building not found' });
    }

    console.log('Found building:', building);

    if (!building.residents.includes(userId)) {
        console.log('User not already in building. Adding...');
        building.residents.push(userId);
        await building.save();
        console.log('User added to building successfully');
    } else {
        console.log('User already in building. Skipping addition.');
    }

    res.status(200).json({ message: 'User added to building successfully' });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// router.put("/:buildingId/addAnnouncement/:announcementId", async(req, res) => {
//   const { buildingId, announcementId } = req.params;

//   try {
//     const building = await Building.findById(buildingId);
//     if (!building) {
//         return res.status(404).json({ error: 'Building not found' });
//     }

//     if (!building.announcements.includes(announcementId)) {
//         building.announcements.push(announcementId);
//         await building.save();
//     }

//     res.status(200).json({ message: 'Announcement added to building successfully' });
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
// }
// });

// router.put("/:buildingId/addPoll/:PollId", async(req, res) => {
//   const { buildingId, pollId } = req.params;

//   try {
//     const building = await Building.findById(buildingId);
//     if (!building) {
//         return res.status(404).json({ error: 'Building not found' });
//     }

//     if (!building.polls.includes(pollId)) {
//         building.polls.push(pollId);
//         await building.save();
//     }

//     res.status(200).json({ message: 'Poll added to building successfully' });
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
// }
// });

router.delete("/:id", (req, res, next) => {
  res.json(`Delete building with ID: ${req.params.id}`);
});

module.exports = router;
