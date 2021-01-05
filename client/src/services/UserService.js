import Api from "./Api";

export default {
    getUserById(id) {
        return Api().get("users");
    }


}