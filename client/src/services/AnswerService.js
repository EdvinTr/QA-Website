import Api from "./Api";

export default {

    createAnswer(answer) {
        return Api().post(`questions/${answer.questionId}`, answer);
    },
    findAnswersMappedToQuestionId(id) {
        return Api().get(`answers/${id}`);
    },
    editAnswer(id) {
        return Api().patch(`answers/${id}`)
    },
    deleteAnswerById(id) {
        return Api().delete(`answers/${id}`)
    }


}