import Api from "./Api";

export default {
    findUserById(id) {
        return Api().get(`users/${id}`);
    },
    findAll() {
        return Api().get("users")
    },
    deleteById(id) {
        return Api().delete(`users/${id}`)
    }


}