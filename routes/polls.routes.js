const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll.model");

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find({ status: "Open" });
    res.send(polls);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const transformedOptions = req.body.options.map((option) => {
      return { optionText: option, votes: 0 };
    });
    const pollData = {
      title: req.body.title,
      description: req.body.description,
      options: transformedOptions,
    };
    const newPoll = new Poll(pollData);
    await newPoll.save();
    res.status(201).send(pollData);
  } catch (error) {
    console.error("Error creating poll:", error);

    if (error.name === "ValidationError") {
      // Handle Mongoose validation errors
      res
        .status(400)
        .send({ message: "Validation error", details: error.errors });
    } else if (error.name === "CastError") {
      // Handle specific cast error
      res.status(400).send({ message: "Cast error", details: error.reason });
    } else {
      // Handle generic errors
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
});

router.get("/:pollId", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) {
      return res.status(404).send();
    }
    res.send(poll);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:pollId", async (req, res) => {
  try {
    const poll = await Poll.findByIdAndUpdate(req.params.pollId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!poll) {
      return res.status(404).send();
    }
    res.send(poll);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/:pollId/vote", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) {
      return res.status(404).send({ message: "Poll not found" });
    }
    const option = poll.options.find(opt => opt._id.toString() === req.body.optionId);
    if (!option) {
      return res.status(404).send({ message: "Option not found" });
    }
    option.votes += 1;
    await poll.save();
    res.send(poll);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:pollId", async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.pollId);
    if (!poll) {
      return res.status(404).send();
    }
    res.send(poll);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
