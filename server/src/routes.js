const AuthenticationController = require("../src/controllers/AuthenticationController")
const AuthenticationControllerPolicy = require("../src/policies/AuthenticationControllerPolicy");
const UserController = require("../src/controllers/UserController")
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

    app.get("/users/:id", UserController.findUserById);

    app.get("/questions", QuestionController.getAllQuestion);

    app.get("/questions/:id", QuestionController.findQuestionById);

    app.delete("/questions/:id", QuestionController.deleteQuestionById);

    app.post("/questions", QuestionController.createQuestion);

}
