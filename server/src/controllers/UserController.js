const { User } = require("../models")
const bcrypt = require("bcrypt");

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

    async updateUser(req, res) {
        try {
            const userId = req.params.id
            const salt = bcrypt.genSaltSync();
            await User.update(
                {
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, salt),
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    privilegeLevel: req.body.privilegeLevel
                }
                , {
                    where: {
                        id: userId
                    }
                }
            )
            const updatedUser = await User.findOne({
                where: {
                    id: userId
                }
            })
            if (updatedUser) {
                res.send(updatedUser)
            } else {
                res.send({
                    error: `Could not find user with ID ${userId} after updating`
                })
            }

        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Something went wrong trying to update the user with ID ${req.params.id}`
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
    },
    async createContributor(req, res) {
        try {
            const user = await User.create(req.body);
            if (!user) {
                return res.status(400).send({
                    error: `Could not create user`
                })
            } else {
                res.send(user);
            }
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not find users`
            })
        }
    },

    async blockUser(req, res) {
        try {
            const userId = req.params.id
            await User.update(
                {
                    privilegeLevel: 0
                }
                , {
                    where: {
                        id: userId
                    }
                }
            )
            const user = User.findOne({
                where: {
                    id: userId
                }
            })
            if (!user) {
                return res.status(400).send({
                    error: `Could not block user`
                })
            } else {
                res.send(user);
            }
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not block the user`
            })
        }
    }
}