import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Question from '@/components/Question';
import CreateQuestion from '@/components/CreateQuestion';
import UserTable from '@/components/UserTable';
import UserPage from "@/components/User/Index"
import QuestionContainer from "@/components/QuestionContainer/Index"

Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [

    {
      path: '/login',
      name: 'login',
      component: Login,

    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: "/users/:username",
      name: 'UserPage',
      component: UserPage
    },
    {
      path: '/questions/:questionId',
      name: 'question',
      component: Question
    },

    {
      path: '/test',
      name: 'questioncontainer',
      component: QuestionContainer
    },
    {
      path: '/create-question',
      name: 'createquestion',
      component: CreateQuestion,
      //redirect: '/login',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: UserTable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ],

})




export default router;
