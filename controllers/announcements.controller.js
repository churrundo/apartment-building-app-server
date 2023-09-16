const User = require("../models/User.model");
const Announcement = require("../models/Announcement.model");

exports.createAnnouncement = async (req, res) => {
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
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const filter = req.query.buildingId
      ? { buildingId: req.query.buildingId }
      : {};

    const announcements = await Announcement.find(filter);
    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAnnouncementById = async (req, res) => {
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
};

exports.updateAnnouncement = async (req, res) => {
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
};

exports.deleteAnnouncement = async (req, res) => {
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
};
