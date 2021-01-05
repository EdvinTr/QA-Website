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
    }
}