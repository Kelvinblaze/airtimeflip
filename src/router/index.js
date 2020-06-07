import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home"
  },
  {
    path: "/login",
    component: Login,
    name: "Login"
  },
  {
    path: "/register",
    component: Register,
    name: "Register"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
