import Api from "./Api";

export default {
    findUserById(id) {
        return Api().get(`users/${id}`);
    }


}