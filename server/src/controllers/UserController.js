const { User } = require("../models")

module.exports = {
    async findUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: `Could not find user with ID of ${userId}`
                })
            } else {
                res.send(user);
            }
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not find user with ID of ${userId}`
            })
        }
    },
    async deleteUserById(req, res) {
        try {
            const user = await User.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (user) {
                res.status(200).send()
            } else {
                res.status(400).send({
                    error: `Could not find user with an ID of ${req.params.id}`
                })
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: `Could not delete user with an ID of ${req.params.id}`
            })
        }
    },

    async findAll(req, res) {
        try {
            const users = await User.findAll();
            if (!users) {
                return res.status(403).send({
                    error: `Could not fetch users`
                })
            } else {
                res.send(users);
            }
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not find users`
            })
        }
    }
}