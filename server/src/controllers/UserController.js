const { User } = require("../models")
const bcrypt = require("bcrypt");
const _ = require("lodash")
module.exports = {
    /* ---------------------------- GET methods START ------------------------------------ */
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

    async findUserByUsername(req, res) {
        try {
            const user = await User.findOne({
                attributes: {
                    exclude: ["password"]
                },
                where: {
                    username: req.params.username
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: `Could not find user with the username: ${username}`
                })
            } else {
                res.send(user.toJSON());
            }
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not find user with username: ${username}`
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
    /* ---------------------------- GET methods END ------------------------------------- */


    /* ---------------------------- POST methods start ---------------------------------- */
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
    /* ---------------------------- POST methods END ------------------------------------ */


    /* ---------------------------- PUT methods START ----------------------------------- */
    async updateUser(req, res) {
        try {
            const userId = req.params.id
            const salt = bcrypt.genSaltSync();
            const user = await User.findOne({
                where: {
                    id: req.params.id
                }
            })
            const password = req.body.password != undefined ? bcrypt.hashSync(req.body.password, salt) : user.password

            let bodyData = {
                username: req.body.username,
                password: password,
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                privilegeLevel: req.body.privilegeLevel
            }
            if (bodyData.email == user.email) {
                console.log("---------TRUE");
                _.omit(bodyData, "email")
            }
            console.log(bodyData);
            await User.update(
                bodyData
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
            res.send(updatedUser)


        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Something went wrong trying to update the user with ID ${req.params.id}`
            })
        }
    },
    /* ---------------------------- PUT methods END ----------------------------------- */


    /* ---------------------------- PATCH methods START ------------------------------- */
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
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })
            res.send(user)
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not block the user`
            })
        }
    },

    async unblockUser(req, res) {
        try {
            const userId = req.params.id
            await User.update(
                {
                    privilegeLevel: 1
                }
                , {
                    where: {
                        id: userId
                    }
                }
            )
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })
            res.send(user)
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `An error occured trying to unblock the user`
            })
        }
    },
    /* ---------------------------- PATCH methods END --------------------------------- */


    /* ---------------------------- DELETE methods START ------------------------------ */
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
    /* ---------------------------- DELETE methods END ----------------------------- */
}