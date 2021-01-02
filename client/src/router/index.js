import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home"
import Register from "../components/Register"

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "root",
            component: Home
        },
        {
            path: "/register",
            name: "register",
            component: Register
        }
    ]
})