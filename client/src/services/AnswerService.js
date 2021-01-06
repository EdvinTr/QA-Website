import Api from "./Api";

export default {

    createAnswer(id) {
        return Api().post(`questions/${id}`);
    },
    findAnswersMappedToQuestionId(id) {
        return Api().get(`answers/${id}`);
    },


}