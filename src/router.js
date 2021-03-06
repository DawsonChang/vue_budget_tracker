import Vue from "vue";
import Router from "vue-router";
import EventCreate from "./views/EventCreate.vue";
import EventList from "./views/EventList.vue";
import EventShow from "./views/EventShow.vue";
import Dashboard from "./views/Dashboard.vue";
import NotFound from "./views/NotFound.vue";
import NetworkIssue from "./views/NetworkIssue.vue";
import store from "@/store/store";

Vue.use(Router);

const router = new Router({
  // to deploy on github pages, change "mode: history" to "mode: hash"
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "event-list",
      component: EventList,
      props: true,
    },
    {
      path: "/event/:id", // :id 是來自 EventCard :to="{ name: 'event-show', 
                          // params: { id: event.id, page: page } }"
      name: "event-show",
      component: EventShow,
      props: true,
      beforeEnter(routeTo, routeFrom, next) {
        store
          .dispatch("event/fetchEvent", routeTo.params.id)
          .then((event) => {
            routeTo.params.event = event;
            next();
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              next({
                name: "404",
                params: { resource: "event" },
              });
            } else {
              next({ name: "network-issue" });
            }
          });
      },
    },
    {
      path: "/create",
      name: "event-create",
      component: EventCreate,
    },
    {
      path: "/dashboard",
      name: "dash-board",
      component: Dashboard,
      props: true,
    },
    {
      path: "/network-issue",
      name: "network-issue",
      component: NetworkIssue,
    },
    {
      path: "/404",
      name: "404",
      component: NotFound,
      props: true,
    },
    {
      path: "*",
      redirect: { name: "404", params: { resource: "page" } },
    },
  ],
});

export default router;
