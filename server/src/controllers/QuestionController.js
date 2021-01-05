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
    },

    async deleteQuestionById(req, res) {
        try {
            const question = await Question.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (question) {
                res.status(200).send()
            } else {
                res.status(400).send({
                    error: `Could not find question with an ID of ${req.params.id}`
                })
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: `Could not delete question with an ID of ${req.params.id}`
            })
        }
    },

    async getAllQuestion(req, res) {
        try {
            const questions = await Question.findAll();
            res.send(questions);
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: "Could not fetch all questions"
            })
        }
    },

    async findQuestionById(req, res) {
        try {
            const questionId = req.params.id;
            const question = await Question.findOne({
                where: {
                    id: questionId
                }
            })
            if (!question) {
                return res.status(403).send({
                    error: `Could not find question with ID of ${questionId}`
                })
            } else {
                res.send(question);
            }
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not find question with ID of ${questionId}`
            })
        }
    }
}