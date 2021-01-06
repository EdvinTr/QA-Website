import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Question from '@/components/Question';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [

    {
      path: '/login',
      name: 'login',
      component: Login
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
      path: '/',
      name: 'home',
      component: Home
    },
  ]
});
