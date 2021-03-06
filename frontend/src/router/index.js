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
    path: "/login-fornecedor",
    name: "LoginFornecedor",
    component: () =>
      import("../components/LoginFornecedor.vue"),
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
    path: "/register-fornecedor",
    name: "RegisterFornecedor",

    component: () =>
      import("../components/RegisterFornecedor.vue"),
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
  {
    path: "/produtos-loja",
    name: "produtosLoja",
    props: true,
    component: () =>
      import("../components/ProdutosLoja.vue"),
  },
  {
    path: "/lojas",
    name: "lojas",
    component: () =>
      import("../components/ListaLojas.vue"),
  },
  {
    path: "/transacoes-aluno",
    name: "transacoesAluno",
    component: () =>
      import( "../components/TransacoesAluno.vue"),
  },
  {
    path: "/home-fornecedor",
    name: "HomeFornecedor",
    component: () =>
      import( "../components/HomeFornecedor.vue"),
  },


];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
