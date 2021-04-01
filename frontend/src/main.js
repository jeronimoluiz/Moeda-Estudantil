// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//===============================================================
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import CardPlugin from 'bootstrap-vue'
//import Button from 'ant-design-vue/lib/button';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'



// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

//Vue.component(Button.name, Button);


Vue.config.productionTip = false;
Vue.use(CardPlugin);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");