const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Announcement = require("../models/Announcement.model");

router.post("/", async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);

    await newAnnouncement.save();
    const user = await User.findById(req.body.userId);

    user.announcements.push(newAnnouncement._id);
    await user.save();

    res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "There was an error creating the announcement." });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const announcements = await Announcement.find();

    if (announcements.length === 0) {
      return res
        .status(200)
        .json({ message: "No announcements found", data: [] });
    }

    res.status(200).json(announcements);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found." });
    }
    res.json(announcement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "There was an error retrieving the announcement." });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found." });
    }
    res.json(updatedAnnouncement);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "There was an error updating the announcement." });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedAnnouncement = await Announcement.findByIdAndRemove(
      req.params.id
    );
    if (!deletedAnnouncement) {
      return res.status(404).send({ message: "Announcement not found." });
    }

    const user = await User.findById(deletedAnnouncement.userId);
    if (user) {
      user.announcements = user.announcements.filter(
        (announcementId) =>
          announcementId.toString() !== deletedAnnouncement._id.toString()
      );
      await user.save();
    }

    res.json({
      message: `Announcement with ID: ${req.params.id} was deleted.`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "There was an error deleting the announcement." });
  }
});

module.exports = router;
