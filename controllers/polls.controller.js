const Poll = require("../models/Poll.model");
const Building = require("../models/Building.model");

exports.getAllPolls = async (req, res) => {
  try {
    const filter = req.query.buildingId
      ? { buildingId: req.query.buildingId }
      : {};
    const polls = await Poll.find(filter);
    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPollsByBuilding = (req, res) => {
  try{
    const polls = Poll.find({"buildingId": req.params.buildingId});
    res.status(200).json(polls);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createPoll = async (req, res) => {
  try {
    const transformedOptions = req.body.options.map((option) => {
      return { optionText: option, votes: 0 };
    });
    const pollData = {
      title: req.body.title,
      description: req.body.description,
      options: transformedOptions,
      createdBy: req.body.createdBy,
      buildingId: req.body.buildingId,
    };
    const newPoll = new Poll(pollData);
    await newPoll.save();
    res.status(201).send(pollData);
  } catch (error) {
    console.error("Error creating poll:", error);

    if (error.name === "ValidationError") {
      res
        .status(400)
        .send({ message: "Validation error", details: error.errors });
    } else if (error.name === "CastError") {
      res.status(400).send({ message: "Cast error", details: error.reason });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
};

exports.getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) {
      return res.status(404).send();
    }
    res.send(poll);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updatePoll = async (req, res) => {
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
};

exports.voteOnPoll = async (req, res) => {
  const { optionId, userId } = req.body;
  const { pollId } = req.params;

  try {
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
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.closePoll = async (req, res) => {
  try {
    const { userId } = req.body;
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).send("Poll not found.");
    }

    if (poll.createdBy.toString() !== userId) {
      return res.status(403).send("User not authorized to close this poll.");
    }

    poll.status = "Closed";
    await poll.save();
    res.status(200).json(poll);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deletePoll = async (req, res) => {
  try {
    const { userId, pollId } = req.params;

    if (!pollId) {
      return res.status(404).json({ message: "Poll not found." });
    }

    const poll = await Poll.findOne({ _id: pollId });
    console.log("poll: ", poll);
    if (poll.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this poll." });
    }
    const building = await Building.findOne({ polls: poll._id });

    if (building) {
      // Remove the poll ID from the building's polls array
      building.polls.pull(poll._id);
      await building.save();
    }
    try {
      await Poll.deleteOne({ _id: pollId });
      res.json({ message: `Successfully deleted poll: ${pollId}` });
    } catch (err) {
      console.error("Error removing poll:", err.message);
      return res
        .status(500)
        .json({ message: "Error removing poll.", error: err.message });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
