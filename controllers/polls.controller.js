const Poll = require("../models/Poll.model");

exports.getAllPolls = async (req, res) => {
  try {
    const buildingId = req.query.buildingId;
    const filter = buildingId ? { buildingId: buildingId } : {};
    const polls = await Poll.find(filter);
    res.status(200).json(polls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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
      buildingId: req.body.buildingId
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
    const poll = await Poll.findByIdAndDelete(req.params.pollId);
    if (!poll) {
      return res.status(404).send();
    }
    res.send(poll);
  } catch (error) {
    res.status(500).send(error);
  }
};
