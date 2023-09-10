const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll.model");

router.get("/", async (req, res) => {
  try {
      const buildingId = req.query.buildingId;

      const filter = buildingId ? { buildingId: buildingId } : {};

      const polls = await Poll.find(filter);
      res.status(200).json(polls);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
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
      createdBy: req.body.createdBy,
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
  const { optionId, userId } = req.body;
  const { pollId } = req.params;

  console.log(userId);
  const poll = await Poll.findById(pollId);
  if (!poll) {
    return res.status(404).send("Poll not found.");
  }

  if (poll.votedUserIds.includes(userId)) {
    return res.status(403).send("User has already voted on this poll.");
  }

  const option = poll.options.find((opt) => opt._id.toString() === optionId);
  if (!option) {
    return res.status(404).send("Option not found.");
  }

  option.votes += 1;
  poll.votedUserIds.push(userId);
  await poll.save();

  return res.status(200).json(poll);
});

router.put("/:pollId/close", async (req, res) => {
  console.log("Request body:", req.body);
  const { userId } = req.body; // Get userId from frontend
  const { pollId } = req.params;
  const poll = await Poll.findById(pollId);
  console.log("Closing poll with id:", pollId);
  if (!poll) {
    return res.status(404).send("Poll not found.");
  }
  console.log("poll was created by user:", userId);
  if (poll.createdBy.toString() !== userId) {
    return res.status(403).send("User not authorized to close this poll.");
  }

  poll.status = "Closed";
  await poll.save();

  return res.status(200).json(poll);
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
