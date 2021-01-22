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

    /* ------------------------ User Routes START ---------------------------------- */
    app.get("/users", UserController.findAll)

    app.get("/users/:id", UserController.findUserById);

    app.get("/username/find/:username", UserController.findUserByUsername)

    app.post("/users", UserController.createContributor)

    app.put("/users/:id", UserController.updateUser)

    app.patch("/users/:id", UserController.blockUser)

    app.patch(`/unblock/:id`, UserController.unblockUser)

    app.delete("/users/:id", UserController.deleteUserById)
    /* ------------------------ User Routes END ------------------------------------ */


    /* ------------------------ Question Routes START ------------------------------ */
    app.get("/questions", QuestionController.getAllQuestion);

    app.get("/questions/:id", QuestionController.findQuestionById);

    app.get("/users/questions/:id", QuestionController.findQuestionsMappedToUserId)

    app.post("/search", QuestionController.searchQuestions);

    app.post("/questions", QuestionController.createQuestion);

    app.put("/questions/:id", QuestionController.editQuestion);

    app.patch("/questions/:id", QuestionController.markQuestionAsDuplicate);

    app.patch("/answercount/decrement/:questionId", QuestionController.decrementAnswerCount)

    app.delete("/questions/:id", QuestionController.deleteQuestionById);
    /* ------------------------ Question Routes END -------------------------------- */


    /* ------------------------ Answer Routes START -------------------------------- */
    app.get("/answers", AnswerController.getAllAnswers)

    app.get("/answer/:id", AnswerController.findOneById)

    app.get("/answers/:id", AnswerController.findAnswersMappedToQuestionId)

    app.get("/users/:id/answers", AnswerController.findAnswersMappedToUserId)

    app.post("/questions/:id", AnswerController.createAnswer)

    app.put("/answers/:id", AnswerController.editAnswer)

    app.patch("/answers/upvote/:id", AnswerController.upvoteAnswer)

    app.patch("/answers/downvote/:id", AnswerController.downvoteAnswer)

    app.delete("/answers/:id", AnswerController.deleteAnswerById)
    /* ------------------------ Answer Routes END ---------------------------------- */
}
