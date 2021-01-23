const { Message, User } = require("../models")
module.exports = {
    async getMessages(req, res) {
        try {
            try {
                const { username, email } = req.body;
                const user = await User.findOne({
                    where: {
                        username: username
                    }
                })
                if (!user) {
                    return res.status(400).send({
                        error: "Could not find the user with that username"
                    })
                }
                if (username == user.username && email == user.email) {
                    const messages = await Message.findAll({
                        where: {
                            receiverId: req.body.userId
                        }
                    });
                    res.status(200).send(messages);

                }
            } catch (err) {
                console.log(err);
                res.status(400).send({
                    error: "Something went wrong trying to validate the sender"
                })
            }

        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: "Could not send all messages"
            })
        }
    },

    async postMessage(req, res) {
        try {
            const message = await Message.create(req.body);
            if (message) {
                res.status(200).send(message)
            } else {
                res.status(400).send("Could not post the message")
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Something went wrong trying to post the message"
            })
        }
    },

    async deleteMessage(req, res) {
        try {
            const message = await Message.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (message) {
                res.status(200).send()
            } else {
                res.status(400).send({
                    error: `Could not delete message with an ID of ${req.params.id}`
                })
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: `Could not delete message with an ID of ${req.params.id}`
            })
        }
    },

}