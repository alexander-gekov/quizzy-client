import Vue from "vue";
import VueRouter from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

import Profile from "@/views/Profile.vue";

// routes

const routes = [
  {
    path: "/",
    component: Admin,
    children: [
      {
        path: "/setting",
        component: Settings,
      },
      {
        path: "/mycollection",
        component: Tables,
      },
      {
        path: "/maps",
        component: Tables,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/game/join",
    component: Profile,
  },
  {
    path: "/",
    component: Admin,
  },
  { path: "*", redirect: "/" },
];

// app config

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
