import Vue from "vue";
import Vuex from "vuex";
import * as api from "@/api";

Vue.use(Vuex);

const writing = {
	namespaced: true,
	actions: {
		//更新所有文章
		async getData({ commit }) {
			let result = await api.getData("/writings");
			commit("UPDATE_DATA", result.data);
		},

		//添加新文章
		async postData({ commit }, data) {
			let result = await api.postData(data);
			commit("UPDATE_DATA", result.data);
		},

		//保存文章
		async putData({ commit }, data) {
			let result = await api.putData("/writings", data);
			commit("UPDATE_DATA", result.data);
		},

		//删除文章
		async deleteData({ commit }, id) {
			let result = await api.deleteData(id);
			commit("UPDATE_DATA", result.data);
		},
	},
	mutations: {
		//更新writings
		UPDATE_DATA(state, value) {
			state.writings = Object.freeze(value);
		},
	},
	state: {
		writings: [],
	},
};

const talk = {
	namespaced: true,
	actions: {
		//更新说说
		async getData({ commit }) {
			let result = await api.getData("/talks");
			commit("UPDATE_DATA", result.data);
		},

		//添加说说
		async postData({ commit }, text) {
			const time = Vue.prototype.getDate() + "  " + Vue.prototype.getTime();

			//数据格式
			const data = {
				text,
				time,
				like: 0,
				msg: [],
			};

			//发送请求
			let result = await api.postData(data);
			commit("UPDATE_DATA", result.data);
		},

		//保存说说
		async putData({ commit }, data) {
			let result = await api.putData("/talks", data);
			commit("UPDATE_DATA", result.data);
		},

		//删除说说
		async deleteData({ commit }, id) {
			let result = await api.deleteData(id);
			commit("UPDATE_DATA", result.data);
		},
	},
	mutations: {
		//更新说说
		UPDATE_DATA(state, value) {
			state.talks = Object.freeze(value.reverse());
		},
	},
	state: {
		talks: [],
	},
};

const message = {
	namespaced: true,
	actions: {
		//更新留言
		async getData({ commit }) {
			let result = await api.getData("/messages");
			commit("UPDATE_DATA", result.data);
		},

		//添加留言
		async postData({ commit }, msg) {
			//格式
			const data = {
				msg,
			};
			//发送请求
			await api.postData(data);
		},
	},
	mutations: {
		//更新留言
		UPDATE_DATA(state, value) {
			state.messages = Object.freeze(value);
		},
	},
	state: {
		messages: [],
	},
};

const say = {
	namespaced: true,
	actions: {
		//更新名言
		async getData({ commit }) {
			let result = await api.getData("/says");
			commit("UPDATE_DATA", result.data);
		},
	},
	mutations: {
		UPDATE_DATA(state, value) {
			state.says = Object.freeze(value.reverse());
		},
	},
	state: {
		says: [],
	},
};

const about = {
	namespaced: true,
	state: {
		abouts: {
			name: "",
			say: "",
			bulletin: "",
		},
	},
	actions: {
		//初始化
		async getData({ commit }) {
			let result = await api.getData("/abouts");
			commit("UPDATE_ABOUTS", result.data);
		},

		//替换数据
		async putData({ commit }, data) {
			let result = await api.putData("/abouts", data);
			commit("UPDATE_ABOUTS", result.data);
		},
	},
	mutations: {
		//更新abouts
		UPDATE_ABOUTS(state, data) {
			state.abouts = Object.freeze(data);
		},
	},
};

export default new Vuex.Store({
	modules: {
		writing,
		talk,
		message,
		say,
		about,
	},
	actions: {
		//登录
		async Login({ commit }, data) {
			data = {
				password: data,
			};
			let result = await api.Login(data);
			if (result.data == true) {
				commit("ADMINISTRATOR");
				return true;
			}
			return false;
		},
		//上传图片
		uploadImage({ commit }, config) {
			api.putImages(config);
		},
	},
	mutations: {
		//切换编辑模式
		CUTOVER_EDIT(state) {
			state.isEdit = !state.isEdit;
		},
		//开启管理员
		ADMINISTRATOR(state) {
			state.isAdministrator = true;
		},
		//切换主题
		CUTOVER_THEME(state) {
			state.theme == "light" ? (state.theme = "dark") : (state.theme = "light");
		},
	},
	state: {
		isAdministrator: false,
		isEdit: false,
		theme: "light",
	},
});
