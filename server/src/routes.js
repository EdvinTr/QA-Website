const AuthenticationController = require("../src/controllers/AuthenticationController")
const AuthenticationControllerPolicy = require("../src/policies/AuthenticationControllerPolicy");
const UserController = require("../src/controllers/UserController")
const QuestionController = require("../src/controllers/QuestionController")
const AnswerController = require("../src/controllers/AnswerController")

module.exports = (app) => {
    app.post("/register",
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

    app.post("/login", AuthenticationController.login)

    app.get("/users", UserController.findAll)

    app.post("/users", UserController.createContributor)

    app.put("/users/:id", UserController.updateUser)

    app.patch("/users/:id", UserController.blockUser)

    app.delete("/users/:id", UserController.deleteUserById)

    app.get("/users/:id", UserController.findUserById);

    app.get("/username/find/:username", UserController.findUserByUsername)

    app.get("/users/:id/answers", AnswerController.findAnswersMappedToUserId)

    app.get("/users/questions/:id", QuestionController.findQuestionsMappedToUserId)

    app.patch("/answercount/decrement/:questionId", QuestionController.decrementAnswerCount)

    app.patch(`/unblock/:id`, UserController.unblockUser)

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

    app.patch("/answers/upvote/:id", AnswerController.upvoteAnswer)

    app.patch("/answers/downvote/:id", AnswerController.downvoteAnswer)

    app.get("/answers", AnswerController.getAllAnswers)

    app.get("/answer/:id", AnswerController.findOneById)

    app.put("/answers/:id", AnswerController.editAnswer)

    app.delete("/answers/:id", AnswerController.deleteAnswerById)

    app.get("/answers/:id", AnswerController.findAnswersMappedToQuestionId)

}
