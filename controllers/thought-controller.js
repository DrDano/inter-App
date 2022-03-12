const { Thought, User } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({});
      if (!thoughtData) {
        console.log("You need to create a thought first");
        res.status(500).json({ message: "You need to create a thought first" });
        return;
      }
      res.json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.id })
      .populate({
        path: "user",
      });
      if (!thoughtData) {
        console.log("No thought found with that id");
        res.status(500).json({ message: "No thought found with that id" });
        return;
      }
      res.json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({
        _id: req.params.id,
      });
      if (!req.body.userId) {
        console.log("A 'userId' is required");
        res.status(404).json({ message: "A 'userId' is required" });
      }
      if (req.body.thoughtText) {
        thoughtData.thoughtText = req.body.thoughtText;
      }
      thoughtData.userId = req.body.userId;
      thoughtData.save();
      res.json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async newThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.updateOne(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData } },
        { new: true }
      );
      if (!userData) {
        console.log("No user found with that id");
        res.status(404).json({ message: "No user found with that id" });
      }
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async deleteThought(req, res) {
    const thoughtData = await Thought.deleteOne({ _id: req.params.id });
    if (!thoughtData) {
      console.log("No thought by that id");
      res.status(500).json({ message: "No thought by that id" });
      return;
    }
    res.json(thoughtData);
  },

  async deleteAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.deleteMany({});
      if (!thoughtData) {
        console.log(
          "unable to delete records at this time due to internal server error"
        );
        return res
          .status(500)
          .json({
            message:
              "unable to delete records at this time due to internal server error",
          });
      }
      res.json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async addReaction(req, res) {
    try {
      const thoughtData = await Thought.updateOne(
        { _id: req.params.id },
        { $push: { reactions: req.body } }
      );
      if (!thoughtData) {
        console.log("No thought by that id");
        return res.status(500).json({ message: "No thought by that id" });
      }
      res.json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thoughtData = await Thought.updateOne(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.body.reactionId } } }
      );
      if (!thoughtData) {
        console.log("No thought by that id");
        return res.status(500).json({ message: "No thought by that id" });
      }
      res.json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtController;
