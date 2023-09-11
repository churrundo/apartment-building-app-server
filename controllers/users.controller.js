const User = require("../models/User.model");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error("Error retrieving all users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(
      `Error retrieving details for user with ID: ${userId}`,
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createNewUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating a new user", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(`Error updating user with ID: ${userId}`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserBuilding = async (req, res) => {
  const { userId, buildingId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.residence = { building: buildingId };
    await user.save();

    res.status(200).json({ message: "Building updated for user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(`Error deleting user with ID: ${userId}`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};