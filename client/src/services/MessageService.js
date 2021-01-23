import Api from "./Api";

export default {
    getMessages(credentials) {
        return Api().post(`get/messages`, credentials)
    },
    postMessage(message) {
        return Api().post(`messages`, message)
    },
    deleteMessage(id) {
        return Api().delete(`messages/${id}`)
    },
}