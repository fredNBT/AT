// .. other imports ..

import { authGuard } from "./my-app/src/auth/authGuard";

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // .. other routes ..
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    }
  ]
});