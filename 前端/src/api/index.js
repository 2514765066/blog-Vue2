import axios from "axios";
import router from "@/router";

const api = axios.create({
	// baseURL: "http://zhangmingyang.love:80",
	baseURL: "http://localhost:8080",
	timeout: 5000,
});

//登录的api
export function Login(data) {
	return api({
		url: `/login`,
		method: "post",
		data,
	});
}
//存图片的api
export function putImages({ data, name }) {
	return api({
		url: `/images/${name}.png`,
		method: "post",
		data,
	});
}

//初始化请求的api
export function getData(url) {
	return api({
		url,
		method: "get",
	});
}
//添加数据的api
export function postData(data) {
	return api({
		url: router.currentRoute.path,
		method: "post",
		data,
	});
}
//替换数据的api
export function putData(path, data) {
	//默认id
	let id = router.currentRoute.query.id;
	//如果id不存在
	if (router.currentRoute.query.id == undefined) {
		id = path;
	}

	return api({
		url: `${path}/${id}`,
		method: "put",
		data,
	});
}
//删除数据的api
export function deleteData(id) {
	return api({
		url: `${router.currentRoute.path}/${id}`,
		method: "delete",
	});
}
