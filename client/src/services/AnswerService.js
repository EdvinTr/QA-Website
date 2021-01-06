import Api from "./Api";

export default {

    createAnswer(answer) {
        return Api().post(`questions/${answer.questionId}`, answer);
    },
    findAnswersMappedToQuestionId(id) {
        return Api().get(`answers/${id}`);
    },
    deleteAnswerById(id) {
        return Api().delete(`answers/${id}`)
    }


}