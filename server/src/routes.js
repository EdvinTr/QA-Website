const AuthenticationController = require("../src/controllers/AuthenticationController")
const AuthenticationControllerPolicy = require("../src/policies/AuthenticationControllerPolicy");
const UserController = require("../src/controllers/UserController")
const QuestionController = require("../src/controllers/QuestionController")
const AnswerController = require("../src/controllers/AnswerController")
const { User, Question } = require("../src/models")

module.exports = (app) => {
    app.post("/register",
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

    app.post("/login", AuthenticationController.login)

    app.get("/users", UserController.findAll)

    app.get("/users/:id", UserController.findUserById);

    app.get("/users/:id", UserController.deleteUserById);

    app.get("/users/:id/answers", AnswerController.findAnswersMappedToUserId)

    app.get("/users/:id/questions", QuestionController.findQuestionsMappedToUserId)

    //Questions
    app.get("/questions", QuestionController.getAllQuestion);

    app.get("/questions/:id", QuestionController.findQuestionById);

    app.delete("/questions/:id", QuestionController.deleteQuestionById);

    app.post("/questions", QuestionController.createQuestion);

    app.put("/questions/:id", QuestionController.editQuestion);

    app.patch("/questions/:id", QuestionController.markQuestionAsDuplicate);

    app.post("/search", QuestionController.searchQuestionsByCategory);

    // Answers
    app.post("/questions/:id", AnswerController.createAnswer)

    app.patch("/questions/:id", AnswerController.upvoteAnswer)

    app.get("/answers", AnswerController.getAllAnswers)

    app.get("/answer/:id", AnswerController.findOneById)

    app.put("/answers/:id", AnswerController.editAnswer)

    app.delete("/answers/:id", AnswerController.deleteAnswerById)

    app.get("/answers/:id", AnswerController.findAnswersMappedToQuestionId)

}
