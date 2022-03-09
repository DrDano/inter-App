const { User } = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find({})
            .populate({
                path: "thoughts"
            })
            res.json(userData);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}

module.exports = userController;
