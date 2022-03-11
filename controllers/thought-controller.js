const { Thought, User } = require('../models');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find({})
            res.json(thoughtData)
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
                {thoughts: thoughtData._id}
                );
            if (!userData) {
                console.log("No user found with that id")
                res.status(404).json({message: "No user found with that id"})
            }
            res.json(userData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = thoughtController;
