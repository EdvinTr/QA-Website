const { Answer } = require("../models")

module.exports = {
    async createAnswer(req, res) {
        try {
            const answer = await Answer.create(req.body)
            console.log(req.body);
            const answerJson = answer.toJSON();
            res.send(answerJson)
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Could not create answer"
            })
        }
    },

    async findAnswersMappedToQuestionId(req, res) {
        try {
            const answers = await Answer.findAll({
                where: {
                    questionId: req.params.id
                }
            })
            if (!answers) {
                return res.status(403).send({
                    error: `Could not find answers to question with ID of ${req.params.id}`
                })
            } else {
                res.send(answers);
            }
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not find answers to question with ID of ${req.params.id}`
            })
        }
    }

}