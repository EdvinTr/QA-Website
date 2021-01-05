import Api from "./Api";

export default {
    getQuestions() {
        return Api().get("questions");
    }


}