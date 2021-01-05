import Api from "./Api";

export default {
    getQuestions() {
        return Api().post("questions");
    }


}