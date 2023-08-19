import Vue from "vue";
import App from "./App.vue";
import routes from "./router/routes";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes,
});

const app = new Vue({
  render: (h) => h(App),
  router,
});
app.$mount("#app");
