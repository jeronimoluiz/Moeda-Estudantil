import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Register.vue"),
  },
  {
    path: "/home-aluno",
    name: "HomeAluno",
    component: () =>
      import( "../components/HomeAluno.vue"),
  },
  {
    path: "/home-professor",
    name: "HomeProfessor",
    component: () =>
      import( "../components/HomeProfessor.vue"),
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
