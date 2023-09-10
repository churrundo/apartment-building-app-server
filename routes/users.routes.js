const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    updateUserBuilding,
    deleteUser
} = require('../controllers/users.controller');

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createNewUser);

router.put("/:id", updateUser);

router.put("/:userId/updateBuilding/:buildingId", updateUserBuilding);

router.delete("/:id", deleteUser);

module.exports = router;