import { createRouter, createWebHistory } from "vue-router";

import CoachDetails from "./pages/coaches/CoachDetails.vue";
import Coacheslist from "./pages/coaches/CoachesList.vue";
import CoachRegister from "./pages/coaches/CoachRegister.vue";

import CoachContact from "./pages/requests/CoachContact.vue";
import RequestReceived from "./pages/requests/RequestReceived.vue";
import NotFound from "./pages/NotFound.vue";

import UserAuth from "./pages/auth/UserAuth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: "/", redirect: "/coaches"
  }, {
    path: "/coaches",
    component: Coacheslist
  }, {
    path: "/coaches/:id",
    component: CoachDetails,
    props: true,
    children: [{
      path: "contact",
      component: CoachContact
    }]
  }, {
    path: "/register",
    component: CoachRegister
  }, {
    path: "/requests",
    component: RequestReceived
  }, {
    path: "/auth",
    component: UserAuth
  }, {
    path: "/:notFound(.*)",
    component: NotFound
  }]
});

export default router;

