const { Question } = require("../models")

module.exports = {
    async createQuestion(req, res) {
        try {
            const question = await Question.create(req.body)
            console.log(req.body);
            const questionJson = question.toJSON();
            res.send(questionJson)
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Could not create question"
            })
        }
    }
}