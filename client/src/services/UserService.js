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
    },
    createContributor(user) {
        return Api().post("users", user)
    },
    updateUser(id, data) {
        return Api().put(`users/${id}`, data)
    },
    blockUser(id) {
        return Api().patch(`users/${id}`)
    }


}