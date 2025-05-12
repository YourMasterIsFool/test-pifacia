import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import { useAuth } from "../composable/auth/useAuth";
import path from "path";
import { useAuthStore } from "@/store/authStore";

const defaultLayout = import("../layouts/DefaultLayout.vue");
const authenticatedLayout = import("../layouts/AuthenticatedLayout.vue");

const token = localStorage.getItem("token");
const routes = [
  {
    path: "/",
    component: () => import("../layouts/AuthenticatedLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: "dashboard",
        path: "",
        component: () => import("../pages/dashboard/index.vue"),
       
      },

      {
        name:'permission_denied',
        path:"/permission-denied",
        component: () => import("../pages/permission_denied/index.vue"),
        
      },

      {
        path: "/role/edit/:id",
        name: "role-edit",
        component: () => import("../pages/role/form.vue"),
        
      },

      {
        path: "/role/create",
        name: "role-create",
        component: () => import("../pages/role/form.vue"),
        
      },

      {
        name: "role",
        path: "/role",
        component: () => import("../pages/role/index.vue"),

        
      },

      {
        path: "/project/edit/:id",
        name: "project-edit",
        component: () => import("../pages/project/form.vue"),
        
      },

      {
        path: "/project/create",
        name: "project-create",
        component: () => import("../pages/project/form.vue"),
        
      },

      {
        name: "project",
        path: "/project",
        component: () => import("../pages/project/index.vue"),

        
      },

      {
        path: "/task/edit/:id",
        name: "task-edit",
        component: () => import("../pages/task/form.vue"),
        
      },

      {
        path: "/task/create",
        name: "task-create",
        component: () => import("../pages/task/form.vue"),
        
      },

      {
        name: "task",
        path: "/task",
        component: () => import("../pages/task/index.vue"),
        
      },

      {
        path: "/sub_task/edit/:id",
        name: "sub_task-edit",
        component: () => import("../pages/sub_task/form.vue"),
        
      },

      {
        path: "/sub_task/create",
        name: "sub_task-create",
        component: () => import("../pages/sub_task/form.vue"),
        
      },

      {
        path: "/sub_task/edit/:id",
        name: "sub_task-edit",
        component: () => import("../pages/sub_task/form.vue"),
        
      },

      {
        path: "/sub_task/create",
        name: "sub_task-create",
        component: () => import("../pages/sub_task/form.vue"),
        
      },

      {
        name: "sub_task",
        path: "/sub_task",
        component: () => import("../pages/sub_task/index.vue"),

        
      },

      {
        name: "user",
        path: "/user",
        component: () => import("../pages/user/index.vue"),

        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "/user/edit/:id",
        name: "user-edit",
        component: () => import("../pages/sub_task/form.vue"),
        
      },

      {
        path: "/user/create",
        name: "user-create",
        component: () => import("../pages/user/form.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/",
    name: "root",
    component: () => (token ? authenticatedLayout : defaultLayout),
    children: [
      {
        name: "home",
        path: "/",
        component: () => import("../pages/home/index.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/auth/login.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { getterUser } = useAuthStore();

  // just adminstrator can login

  // if (
  //   to.meta.requiresAdmin &&
  //   getterUser &&
  //   getterUser.value.role.name != "administrator"
  // ) {
  //   next({
  //     name: "permission_denied",
  //   });
  // }
  // if (to.name == "login" && getterUser) {
  //   next({ name: "dashboard" });
  // }

  // if (to.name == "home" && getterUser) {
  //   next({ name: "dashboard" });
  // }

  // if (to.name != "login" && to.name != "home" && !getterUser) {
  //   next({ name: "login" });
  // }
  next();
});

export default router;
