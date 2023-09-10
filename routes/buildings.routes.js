const express = require("express");
const router = express.Router();
const {
  createNewBuilding,
  getBuildingByAddress,
  getBuildingById,
  addUserToBuilding,
  addPollToBuilding,
  addAnnouncementToBuilding,
} = require("../controllers/buildings.controller");

router.post("/", createNewBuilding);
router.get("/", getBuildingByAddress);
router.get("/:buildingId", getBuildingById);
router.put("/:buildingId/addUser/:userId",addUserToBuilding);
router.put(  "/:buildingId/addAnnouncement/:announcementId", addAnnouncementToBuilding);
router.put("/:buildingId/addPoll/:pollId", addPollToBuilding);

module.exports = router;
