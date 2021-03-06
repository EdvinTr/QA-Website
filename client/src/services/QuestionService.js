import Api from "./Api";

export default {
    getQuestions() {
        return Api().get("questions");
    },
    findQuestionById(id) {
        return Api().get(`questions/${id}`);
    },
    createQuestion(question) {
        return Api().post("questions", question)
    },
    decrementAnswerCount(questionId) {
        return Api().patch(`answercount/decrement/${questionId}`)
    },

    deleteQuestionById(id) {
        return Api().delete(`questions/${id}`)
    },
    editQuestion(id, questionData) {
        return Api().put(`questions/${id}`, questionData)
    },
    searchQuestions(query) {
        return Api().post("search", query)
    },
    markQuestionAsDuplicate(id, value) {
        return Api().patch(`questions/${id}`, value)
    },
    findQuestionsMappedToUserId(userId) {
        return Api().get(`users/questions/${userId}`)
    },

    formatDate(dateString) {
        const date = dateString.split("T");
        const time = date[1].slice(0, 8);
        const hours = time.slice(0, 2);
        try {
            const swedishTimezoneHours = parseInt(hours) + 1;
            const fullDate =
                date[0] + " " + swedishTimezoneHours.toString() + time.slice(2, 8);
            return fullDate;
        } catch (err) {
            console.log(err);
        }
    }


}