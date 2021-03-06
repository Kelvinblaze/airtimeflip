import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "./components";

// Using Vue Fragment Plugin
import Fragment from "vue-fragment";
Vue.use(Fragment.Plugin);

// Using Vue Resource Plugin
import VueResource from "vue-resource";
Vue.use(VueResource);

Vue.http.options.root = "https://test.airtimeflip.com/api/v1/";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
