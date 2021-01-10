import Api from "./Api";

export default {

    createAnswer(answer) {
        return Api().post(`questions/${answer.questionId}`, answer);
    },
    findAnswersMappedToQuestionId(id) {
        return Api().get(`answers/${id}`);
    },
    findAnswersMappedToUserId(id) {
        return Api().get(`users/${id}/answers`);
    },
    findOneById(id) {
        return Api().get(`answer/${id}`)
    },
    editAnswer(id, answer) {
        return Api().put(`answers/${id}`, answer)
    },
    upvoteAnswer(id) {
        return Api().patch(`answers/upvote/${id}`)
    },

    downvoteAnswer(id) {
        return Api().patch(`answers/downvote/${id}`)
    },
    deleteAnswerById(id) {
        return Api().delete(`answers/${id}`)
    },


}