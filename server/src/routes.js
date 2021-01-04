const AuthenticationController = require("../src/controllers/AuthenticationController")
const AuthenticationControllerPolicy = require("../src/policies/AuthenticationControllerPolicy");
const QuestionController = require("../src/controllers/QuestionController")
const { User, Question } = require("../src/models")

module.exports = (app) => {
    app.post("/register",
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

    app.post("/login", AuthenticationController.login)

    app.get("/users", async (req, res) => {
        try {
            const users = await User.findAll();
            res.send(users)
        } catch (err) {
            console.log(err);
        }
    })

    app.get("/questions", async (req, res) => {
        try {
            const questions = await Question.findAll();
            res.send(questions);
        } catch (err) {
            console.log(err);
            res.status(424).send({
                error: "Could not fetch all questions"
            })
        }
    })

    app.post("/questions", QuestionController.createQuestion);

}
