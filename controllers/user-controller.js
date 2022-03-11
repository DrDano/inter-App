const { User } = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            if (! User.path) {
                const userData = await User.find({})
                res.json(userData);
                return;
            }
            const userData = await User.find({})
            .populate({
                path: "thoughts",
                model: "Thought"
            })
            .populate({
                path: "friends",
                model: "User"
            })
            res.json(userData);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    async getUser(req, res) {
        try {
            const userData = await User.findOne({
                id: req.params.id
            })
            .populate({
                path: "thoughts",
                model: "Thought"
            })
            if (!userData) {
                res.status(404).json({message: "User not found"});
            }
            res.json(userData);
        } catch (error) {
            console.log(error);
            return;
        }
    },

    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            if (!userData) {
                res.status(500).json({message: "There was an internal error, please try again later."})
            }
            res.json(userData);
        } catch (error) {
            console.log(error);
            return;
        }
    }
}

module.exports = userController;
