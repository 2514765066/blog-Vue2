const express = require("express");
const { nanoid } = require("nanoid");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//静态资源
app.use(express.static(path.join(__dirname, "public")));

let Administrator = [];

//上传图片
app.post("/images/:name", (req, res) => {
	const form = formidable({
		multiples: true,
	});

	form.on("fileBegin", function (name, file) {
		//保存路径
		file.filepath = __dirname + "/public/images/" + req.params.name;
	});

	form.parse(req, (err, fields, files) => {
		if (err) {
			//处理错误
			res.status(500).send("Something went wrong");
		} else {
			//处理成功
			res.status(200).send("ok");
		}
	});
});

//登录
app.post("/login", (req, res) => {
	if (req.body.password === "yxingyuszmy2") {
		Administrator.push(req.ip);
		res.send(true);
	} else {
		res.send(false);
	}
});

//请求
app.get("/:db", (req, res) => {
	//路径
	const filePath = path.join(__dirname, `/database/${req.params.db}.json`);
	//
	fs.readFile(filePath, (e, data) => {
		res.send(data);
	});
});

//添加
app.post("/:db", (req, res) => {
	let filePath = path.join(__dirname, `/database/${req.params.db}.json`);
	if (req.params.db == "edit") {
		filePath = path.join(__dirname, `/database/writings.json`);
	}
	fs.readFile(filePath, (e, data) => {
		var obj = JSON.parse(data);

		const id = nanoid();

		const newDate = {
			id,
			...req.body,
		};

		obj.push(newDate);
		var json = JSON.stringify(obj);

		fs.writeFile(filePath, json, () => {
			// 如果成功，打印成功信息
			res.send(json);
		});
	});
});

//删除
app.delete("/:db/:id", (req, res) => {
	let filePath = path.join(__dirname, `/database/${req.params.db}.json`);
	if (req.params.db == "edit") {
		filePath = path.join(__dirname, `/database/writings.json`);
	}

	fs.unlink(__dirname + `/public/images/${req.params.id}.png`, () => {});

	fs.readFile(filePath, (e, data) => {
		var obj = JSON.parse(data);

		const index = obj.findIndex(item => {
			return item.id == req.params.id;
		});

		obj.splice(index, 1);

		var json = JSON.stringify(obj);

		fs.writeFile(filePath, json, () => {
			// 如果成功，打印成功信息
			res.send(json);
		});
	});
});

//替换
app.put("/:db/:id", (req, res) => {
	//路径
	const filePath = path.join(__dirname, `/database/${req.params.db}.json`);

	//如果id和db一样
	if (req.params.db == req.params.id) {
		const json = JSON.stringify(req.body);

		fs.writeFile(filePath, json, () => {
			res.send(json);
		});
	} else {
		fs.readFile(filePath, (e, data) => {
			var obj = JSON.parse(data);

			const index = obj.findIndex(item => {
				return item.id == req.params.id;
			});

			obj.splice(index, 1, req.body);

			var json = JSON.stringify(obj);

			fs.writeFile(filePath, json, () => {
				// 如果成功，打印成功信息
				res.send(json);
			});
		});
	}
});

app.listen(80, () => {
	console.log("服务端启动成功");
});
