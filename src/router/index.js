// Composables
import useAuthUser from "@/composables/UseAuthUser";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        meta: {
          requiresAuth: false,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "login",
        name: "Login",
        meta: {
          requiresAuth: false,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        meta: {
          requiresAuth: false,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "register" */ "@/views/auth/Register.vue"
          ),
      },
      {
        path: "email-confirmation",
        name: "EmailConfirmation",
        meta: {
          requiresAuth: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "email-confimation" */ "@/views/auth/EmailConfirmation.vue"
          ),
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        meta: {
          requiresAuth: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "orgot-password" */ "@/views/auth/ForgotPassword.vue"
          ),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/layouts/admin/Default.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        meta: {
          requiresAuth: true,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "home" */ "../components/chat/ChatLog.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // here we check it the user is logged in
  // if they aren't and the route requries auth we redirect to the login page
  const { isLoggedIn } = useAuthUser();
  if (!isLoggedIn() && to.meta.requiresAuth) {
    return { name: "Login" };
  }
});

export default router;
