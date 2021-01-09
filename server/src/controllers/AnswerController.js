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

    async upvoteAnswer(req, res) {
        try {
            const answer = await Answer.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!answer) {
                res.status(400).send({
                    error: `Could update the answers score because it the answer with ID ${req.params.id} could not be found`
                })
            }
            const upvotedAnswer = await Answer.update({
                score: answer.score + 1
            }, {
                where: {
                    id: req.params.id
                }
            }
            )
            res.send(upvotedAnswer)
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Something went wrong trying to upvote the answers score"
            })
        }
    },

    async downvoteAnswer(req, res) {
        try {
            const answer = await Answer.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!answer) {
                res.status(400).send({
                    error: `Could update the answers score because it the answer with ID ${req.params.id} could not be found`
                })
            }
            const upvotedAnswer = await Answer.update({
                score: answer.score - 1
            }, {
                where: {
                    id: req.params.id
                }
            }
            )
            res.send(upvotedAnswer)
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Something went wrong trying to upvote the answers score"
            })
        }
    },

    async getAllAnswers(req, res) {
        try {
            const answers = await Answer.findAll();
            res.send(answers);
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: "Could not fetch all answers"
            })
        }
    },

    async findAnswersMappedToUserId(req, res) {
        try {
            const answers = await Answer.findAll({
                where: {
                    userId: req.params.id
                }
            });
            res.send(answers);
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not fetch all answers by the user of ID ${req.params.id}`
            })
        }
    },

    async findOneById(req, res) {
        try {
            const answer = await Answer.findOne({
                where: {
                    id: req.params.id
                }
            })
            res.send(answer);
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Something went wrong, could not fetch answer with ID of ${req.params.id}`
            })
        }
    },


    async deleteAnswerById(req, res) {
        try {
            const answer = await Answer.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (answer) {
                res.status(200).send()
            } else {
                res.status(400).send({
                    error: `Could not find answer with an ID of ${req.params.id}`
                })
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: `Could not delete answer with an ID of ${req.params.id}`
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
    },

    async editAnswer(req, res) {
        try {
            const newText = req.body.textContent
            const answer = await Answer.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!answer) {
                res.status(400).send()
            } else {
                const updatedAnswer = await Answer.update({
                    textContent: req.body.textContent
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                if (updatedAnswer) {
                    res.status(200).send()
                } else {
                    res.status(400).send({
                        error: "Could not update answer"
                    })
                }
            }
        } catch (err) {
            res.status(500).send({
                error: "An error has occured trying to update the answer"
            })
        }
    }


}