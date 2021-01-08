import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Question from '@/components/Question';
import CreateQuestion from '@/components/CreateQuestion';
import UserTable from '@/components/UserTable';

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
      path: '/questions/:questionId',
      name: 'question',
      component: Question
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
      // meta: {
      //   requiresAuth: true
      // }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ],

})




export default router;
