import Vue from "vue";
import App from "./App.vue";

import EasySelect from "ez-vue-select";
import "ez-vue-select/lib/ez-vue-select.css";

Vue.use(EasySelect);

Vue.prototype.title = process.env.VUE_APP_TITLE;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
