import { createRouter, createWebHistory } from "vue-router"
import LoginView from "../views/LoginView.vue"
import DirectoryView from "../views/DirectoryView.vue"
import DetailsView from "../views/DetailsView.vue"
import ManagementView from "../views/ManagementView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/directory",
      name: "directory",
      component: DirectoryView
    },
    {
      path: "/details",
      name: "details",
      component: DetailsView
    },
    {
      path: "/management",
      name: "management",
      component: ManagementView
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authRequired = to.path != "/login"
  const accessToken = localStorage.getItem("accessToken")
  if (authRequired && (accessToken == null || accessToken == undefined)) {
    return next("/login")
  } else if (to.path == "/") {
    return next("/directory")
  }
  next()
})

export default router
