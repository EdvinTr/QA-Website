const { Question } = require("../models")
const { Sequelize } = require("sequelize")
const Op = Sequelize.Op

module.exports = {
    /* ---------------------------- GET methods START ------------------------------------ */
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
    },

    async findQuestionsMappedToUserId(req, res) {
        try {
            const questions = await Question.findAll({
                where: {
                    userId: req.params.id
                }
            });
            res.send(questions);
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: `Could not fetch questions made by the user of ID ${req.params.id}`
            })
        }
    },

    async searchQuestions(req, res) {
        try {
            const questions = await Question.findAll({
                where: {
                    [Op.or]: {
                        category: {
                            [Op.like]: '%' + req.body.searchTerm + '%'
                        },
                        title: {
                            [Op.like]: '%' + req.body.searchTerm + '%'
                        }
                    }
                }
            })
            res.send(questions)
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Something went wrong trying to search for questions"
            })
        }
    },
    /* ---------------------------- GET methods END ------------------------------------ */


    /* ---------------------------- POST methods START --------------------------------- */
    async createQuestion(req, res) {
        try {
            const question = await Question.create(req.body)
            const questionJson = question.toJSON();
            res.send(questionJson)
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Could not create question"
            })
        }
    },
    /* ---------------------------- POST methods END -------------------------------------- */



    /* ---------------------------- PUT methods START ------------------------------------- */
    async editQuestion(req, res) {
        try {
            const question = await Question.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!question) {
                res.status(400).send()
            } else {
                if (req.body.title == "" || req.body.category == null || req.body.category == "") {
                    res.status(400).send({
                        error: "The question must include a title and a category"
                    })
                }
                const updatedQuestion = await Question.update({
                    title: req.body.title,
                    category: req.body.category,
                    textContent: req.body.textContent
                }, {
                    where: {
                        id: req.params.id
                    }
                })
                if (updatedQuestion) {
                    res.status(200).send()
                } else {
                    res.status(400).send({
                        error: "Could not update question"
                    })
                }
            }
        } catch (err) {
            res.status(500).send({
                error: "An error has occured trying to update the question"
            })
        }
    },
    /* ---------------------------- PUT methods END --------------------------------------- */



    /* ---------------------------- PATCH methods START ----------------------------------- */
    async decrementAnswerCount(req, res) {
        try {
            const question = await Question.findOne({
                where: {
                    id: req.params.questionId
                }
            })
            if (question) {
                const updatedQuestion = await Question.update({
                    answerCount: question.answerCount - 1
                }, {
                    where: {
                        id: req.params.questionId
                    }
                })

                res.send(updatedQuestion)
            }

        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Could not decrement answer count"
            })
        }
    },

    async markQuestionAsDuplicate(req, res) {
        try {
            const question = await Question.update({
                duplicate: req.body.duplicate
            }, {
                where: {
                    id: req.params.id
                }
            }
            )
            res.send(question)
        } catch (err) {
            console.log(err);
            res.status(400).send({
                error: "Could not mark the question as duplicate"
            })
        }
    },
    /* ---------------------------- PATCH methods END -------------------------------------- */


    /* ---------------------------- DELETE methods START ----------------------------------- */
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
    /* ---------------------------- DELETE methods END ------------------------------------- */
}