import Vue from "vue";
import App from "@/App.vue";
import Waves from "@/components/Waves";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import router from "@/router";
import store from "@/store";
import  "animate.css";
import plugins from "@/plugins";

Vue.config.productionTip = false;

Vue.use(plugins);

Vue.component("Waves", Waves);
Vue.component("Footer", Footer);
Vue.component("Header", Header);

const vm = new Vue({
	render: h => h(App),
	router,
	store,
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
}).$mount("#app");
