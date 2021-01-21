import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import QuestionPage from '@/components/QuestionPage/Index';
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
      name: 'questionpage',
      component: QuestionPage
    },

    {
      path: '/create-question',
      name: 'createquestion',
      component: CreateQuestion,
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
      name: 'questions',
      component: QuestionContainer
    },
  ],

})




export default router;
