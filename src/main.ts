import vue from "vue";
import AppVue from "./App.vue";
import store from "./store";

vue.config.productionTip = false;

new vue({
  store,
  render: h => h(AppVue),
}).$mount("#app");
