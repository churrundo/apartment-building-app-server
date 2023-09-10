const express = require("express");
const router = express.Router();
const {
    getAllPolls,
    createPoll,
    getPollById,
    updatePoll,
    voteOnPoll,
    closePoll,
    deletePoll
} = require("../controllers/polls.controller");

router.get("/", getAllPolls);
router.post("/", createPoll);
router.get("/:pollId", getPollById);
router.put("/:pollId", updatePoll);
router.post("/:pollId/vote", voteOnPoll);
router.put("/:pollId/close", closePoll);
router.delete("/:pollId", deletePoll);

module.exports = router;
