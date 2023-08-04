import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

import Home from "@/pages/Home";
import Writings from "@/pages/Writings";
import Writing from "@/pages/Writing";
import Messages from "@/pages/Messages";
import Talks from "@/pages/Talks";
import Talk from "@/pages/Talk";
import Abouts from "@/pages/Abouts";
import Edit from "@/pages/Edit";

// 创建一个路由实例
const router = new VueRouter({
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 };
	},
	routes: [
		{
			path: "*",
			redirect: "/home",
		},
		{
			name: "home",
			path: "/home",
			component: Home,
		},
		{
			name: "writings",
			path: "/writings",
			component: Writings,
		},
		{
			name: "writing",
			path: "/writing",
			component: Writing,
		},
		{
			name: "messages",
			path: "/messages",
			component: Messages,
		},
		{
			name: "talks",
			path: "/talks",
			component: Talks,
		},
		{
			name: "talk",
			path: "/talk",
			component: Talk,
		},
		{
			name: "abouts",
			path: "/abouts",
			component: Abouts,
		},
		{
			name: "edit",
			path: "/edit",
			component: Edit,
			beforeEnter(to,from ,next){
				
			}
		},
	],
});

router.beforeEach((to, from, next) => {
	if (store.state.isEdit == true) {
		store.commit("CUTOVER_EDIT");
	}
	next();
});

export default router;
