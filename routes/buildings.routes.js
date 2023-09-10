const express = require("express");
const router = express.Router();
const buildingController = require("../controllers/buildings.controller");

// Create a new building
router.post("/", buildingController.createNewBuilding);

// Get building by address
router.get("/", buildingController.getBuildingByAddress);

// Get building by ID
router.get("/:buildingId", buildingController.getBuildingById);

// Add a user to a building
router.put("/:buildingId/addUser/:userId", buildingController.addUserToBuilding);

// Add an announcement to a building
router.put("/:buildingId/addAnnouncement/:announcementId", buildingController.addAnnouncementToBuilding);

// Add a poll to a building
router.put("/:buildingId/addPoll/:pollId", buildingController.addPollToBuilding);

// Delete a building (Placeholder)
router.delete("/:id", buildingController.deleteBuilding);

module.exports = router;
