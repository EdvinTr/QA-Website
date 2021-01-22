import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Register from '@/components/Register';
import QuestionPage from '@/components/QuestionPage/Index';
import CreateQuestion from '@/components/CreateQuestion';
import UserTable from '@/components/UserTable';
import UserPage from "@/components/User/Index"
import QuestionContainer from "@/components/QuestionContainer/Index"
import store from "../store"

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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = store.state.user;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (to.path == '/login' && currentUser) {
    next('/');
  }
  if (requiresAuth && to.path == "/users" && currentUser && currentUser.privilegeLevel != 3) {
    next("/");
  }
  if (requiresAuth && to.path == "/create-question" && currentUser && currentUser.privilegeLevel != 1) {
    next("/");
  }
  if (currentUser && to.path == "/register") {
    next("/")
  }

  else {
    next();
  }
});

export default router;
