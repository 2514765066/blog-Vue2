import store from "@/store";

export default {
	install(Vue) {
		Vue.prototype.getTime = function () {
			const date = new Date();
			let hour = date.getHours();
			let minute = date.getMinutes();
			let second = date.getSeconds();

			hour = hour.toString().padStart(2, "0");
			minute = minute.toString().padStart(2, "0");
			second = second.toString().padStart(2, "0");

			return hour + ":" + minute + ":" + second;
		};
		Vue.prototype.getDate = function () {
			return new Date()
				.toLocaleDateString("zh-CN", {
					year: "numeric",
					month: "numeric",
					day: "numeric",
				})
				.replace(/\//g, "-");
		};
		Vue.prototype.deepCopy = function (obj) {
			if (obj) {
				const json = JSON.stringify(obj);
				return JSON.parse(json);
			}
		};
		Vue.prototype.isMobile = function () {
			return screen.width <= 480 ? true : false;
		};
		Vue.prototype.codeColor = function (text) {
			let keywordBlue = "let|const|var|true|false|this|new|function|console|style|script";
			let keywordPink = "if|else|import|default|return|export|from";

			keywordBlue = new RegExp(`(${keywordBlue})`, "g");
			keywordPink = new RegExp(`(${keywordPink})`, "g");

			return text
				.replace(keywordBlue, "<span class='keywordBlue'>$1</span>")
				.replace(keywordPink, "<span class='keywordPink'>$1</span>")
				.replace(/(\{|\}|\(|\)|\[|\])/g, "<span class='keywordYellow'>$1</span>");
		};
	},
};
