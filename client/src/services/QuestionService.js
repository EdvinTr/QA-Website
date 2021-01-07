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

    deleteQuestionById(id) {
        return Api().delete(`questions/${id}`)
    },

    splitDate(dateString) {
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