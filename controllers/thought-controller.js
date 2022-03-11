const { Thought } = require('../models');

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
            if (!thoughtData) {
                res.status(500).json({message: "Please provide a thought"})
            }
            res.json(thoughtData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = thoughtController;
