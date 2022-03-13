const { User, Thought } = require("../models");

const userController = {
  async getAllUsers(req, res) {
    try {
      const userData = await User.find({})
        .populate({
          path: "thoughts",
          model: "Thought",
        })
        .populate({
          path: "friends",
          model: "User",
        });
      if (userData.length < 1) {
        console.log("You need to create a user first");
        res.status(404).json({ message: "You need to create a user first" });
        return;
      }
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async getUser(req, res) {
    try {
      const userData = await User.findOne({
        _id: req.params.id,
      })
        .populate({
          path: "thoughts",
          model: "Thought",
        })
        .populate({
          path: "friends",
          model: "User",
        });

      if (!userData) {
        console.log("No user found with that id");
        res.status(404).json({ message: "No user found with that id" });
        return;
      }
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      const userData = await User.findOne({
        _id: req.params.id,
      });
      if (!userData) {
        console.log("No user found with that id");
        return res.status(404).json({ message: "No user found with that id" });
      }
      if (req.body.userName) {
        userData.userName = req.body.userName;
      }
      if (req.body.email) {
        userData.email = req.body.email;
      }
      userData.save();
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.id });
      if (!userData) {
        console.log("no user found with that id");
        return res.status(404).json({ message: "no user found with that id" });
      }
      const deletedThoughts = await userData.thoughts.forEach(
        async (thoughtObj) => {
          await Thought.deleteOne({ _id: thoughtObj._id });
        }
      );

      const deletedUser = await User.deleteOne({
        _id: req.params.id,
      });

      res.json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async deleteAllUsers(req, res) {
    try {
      const user = await User.find();
      if (user.length < 1) {
        console.log("No users exist in database");
        return res.status(404).json({ message: "No users exist in database" });
      }
      const userData = await User.deleteMany({});
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        console.log("no user found with that id");
        return res.status(404).json({ message: "no user found with that id" });
      }
      const userData = await User.updateOne(
        { _id: req.params.id },
        { $push: { friends: req.body.friendId } }
      );
      if (!req.body.friendId | !req.params.id) {
          console.log("Friend and User Ids are required");
          return res.status(404).json({ message: "Friend and User Ids are required" });
      }
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  async removeFriend(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
          console.log("no user found with that id");
          return res.status(404).json({ message: "no user found with that id" });
        }
        const userData = await User.updateOne(
            { _id: req.params.id },
            { $pull: { friends: req.body.friendId } }
          );
          if (!req.body.friendId | !req.params.id) {
              console.log("Friend and User Ids are required");
              res.status(404).json({ message: "Friend and User Ids are required" });
          }
          res.json(userData);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
  }
};

module.exports = userController;
