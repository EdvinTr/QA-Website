import Api from "./Api";

export default {

    createAnswer({ questionId, userId, textContent }) {
        return Api().post(`questions/${questionId}`, questionId, userId, textContent);
    },
    findAnswersMappedToQuestionId(id) {
        return Api().get(`answers/${id}`);
    },


}