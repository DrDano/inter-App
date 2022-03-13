const { Thought, User } = require("../models");

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughtData = await Thought.find({});
      if (thoughtData.length < 1) {
        console.log("You need to create a thought first");
        res.status(404).json({ message: "You need to create a thought first" });
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
      const thoughtData = await Thought.findOne({
        _id: req.params.id,
      }).populate({
        path: "user",
        select: "-thoughts"
      });
      if (!thoughtData) {
        console.log("No thought found with that id");
        res.status(404).json({ message: "No thought found with that id" });
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
      if (!thoughtData) {
        console.log("No thought found with that id");
        res.status(404).json({ message: "No thought found with that id" });
        return;
      }
      if (!req.body.userId) {
        console.log("A 'userId' is required");
        res.status(404).json({ message: "A 'userId' is required" });
      }
      thoughtData.thoughtText = req.body.thoughtText;
      thoughtData.save();
      res.json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async newThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      if (!user) {
        console.log("No user found with that id");
        return res.status(404).json({ message: "No user found with that id" });
      }
      
      const thoughtData = await Thought.create(req.body);
      const userData = await User.updateOne(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData } }
      );
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async deleteThought(req, res) {
    const thought = await Thought.findOne({ _id: req.params.id });
    if (!thought) {
      console.log("No thought by that id");
      res.status(404).json({ message: "No thought by that id" });
      return;
    }
    await User.updateOne({ _id: thought.userId }, { $pull: { thoughts: thought._id } })
    await Thought.deleteOne({ _id: req.params.id });
    res.json(thought);
  },

  async deleteAllThoughts(req, res) {
    try {
      const thought = await Thought.find();
      if (thought.length < 1) {
        console.log("No thoughts exist in the database");
        return res.status(404).json({
          message: "No thoughts exist in the database",
        });
      }
      const thoughtData = await Thought.deleteMany({});
      res.json(thoughtData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      if (!thought) {
        console.log("No thought by that id");
        return res.status(404).json({ message: "No thought by that id" });
      }
      const thoughtData = await Thought.updateOne(
        { _id: req.params.id },
        { $push: { reactions: req.body } }
      );
      res.json(thought);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      if (!thought) {
        console.log("No thought by that id");
        return res.status(404).json({ message: "No thought by that id" });
      }
      await Thought.updateOne(
        { _id: req.params.id },
        { $pull: { reactions: { _id: req.body.reactionId } } }
      );
      res.json(thought);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = thoughtController;
