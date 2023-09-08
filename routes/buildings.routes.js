const express = require("express");
const router = express.Router();
const Building = require("../models/Building.model")

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

router.put("/:id", (req, res, next) => {
  res.json(`Update building with ID: ${req.params.id}`);
});

router.delete("/:id", (req, res, next) => {
  res.json(`Delete building with ID: ${req.params.id}`);
});

module.exports = router;
