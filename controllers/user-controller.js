const { User } = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            if (!User.path) {
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
            res.status(500).json(error);
        }
    },

    async getUser(req, res) {
        try {
            if (!User.path) {
                const userData = await User.findOne({
                    _id: req.params.id
                })
                res.json(userData);
                return;
            }
            const userData = await User.findOne({
                _id: req.params.id
            })
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
            res.status(500).json(error);
        }
    },

    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            if (!userData) {
                res.status(400).json({message: "Please provide a username and email address"})
            }
            res.json(userData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    async updateUser(req, res) {
        try {
            const userData = await User.findOne({
                _id: req.params.id
            })
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
            const userData = await User.deleteOne({
                _id: req.params.id
            })
            if (!userData._id) {
                console.log("no user found with that id");
                return res.status(404).json({ message: "no user found with that id" })
            }
            res.json(userData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = userController;
