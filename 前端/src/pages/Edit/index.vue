<template>
	<div>
		<Header title="文本编辑" :url="url" />

		<main class="d-flex j-center">
			<section class="box-border box">
				<!-- 工具栏 -->
				<nav class="d-flex a-center">
					<button @click="addDom('h2')">标题</button>
					<button @click="addDom('div')">文本</button>
					<button @click="fontType('insertUnorderedList')"><i class="fa-solid fa-list" /></button>
					<button @click="fontType('insertOrderedList')"><i class="fa-solid fa-list-ol" /></button>
					<button @click="fontType('bold')"><i class="fa-solid fa-bold" /></button>
					<button @click="fontType('italic')"><i class="fa-solid fa-italic" /></button>
					<button @click="fontType('underline')"><i class="fa-solid fa-underline" /></button>
					<button @click="fontType('strikethrough')"><i class="fa-solid fa-strikethrough" /></button>
					<button @click="$refs.file.click()">背景图片</button>
					<button @click="addDom('aside')">提示</button>
					<button @click="addPre"><i class="fa-solid fa-code" /></button>
					<div>
						<button @click="addLink"><i class="fa-solid fa-link" /></button>
						<input type="text" v-model="href" />
					</div>
					<input type="file" ref="file" accept="image/jpeg, image/png" @change="setBgImage" v-show="false" />
				</nav>

				<!-- 按钮 -->
				<article class="d-flex j-between">
					<div>
						<button class="click m-r-2" @click="saveContent">保存</button>
						<button class="click" @click="deleteContent" v-if="$route.query.id">删除</button>
					</div>
					<span class="text-color j-a-center m-r-1">{{ time }}</span>
				</article>

				<!-- 标题栏时间 -->
				<article class="d-flex j-between">
					<input type="text" placeholder="添加文章名称" v-model="title" maxlength="10" />
					<div class="d-flex a-center text-color">
						<i class="fa-solid fa-tags m-r-2"></i>
						<input type="text" v-model="tag" placeholder="请输入标签" maxlength="5" class="title-color" />
					</div>
				</article>

				<!-- 文本内容 -->
				<article class="title-color" ref="content" contenteditable="true" v-html="text" @keydown.tab.prevent="keyUpTab" @keyup.shift="KeyUpShift" @keydown="KeyUp"></article>
			</section>
		</main>

		<Footer v-if="!isMobile()" />
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import { nanoid } from "nanoid";

	export default {
		name: "Edit",
		computed: {
			...mapState({
				writing(state) {
					const item = state.writing.writings.find(item => item.id == this.$route.query.id);
					return item || {};
				},
			}),
			url() {
				if (this.newFile != "") return window.URL.createObjectURL(this.newFile);
				else if (this.writing.id) return `/images/${this.writing.id}.png`;
				else return "/images/defaultBg.png";
			},
		},
		watch: {
			writing: {
				immediate: true,
				handler(value) {
					if (Object.keys(value).length == 0) return;
					this.title = value.title;
					this.tag = value.tag;
					this.text = value.text;
					this.time = value.time;
					this.id = value.id;
				},
			},
		},
		data() {
			return {
				id: nanoid(),
				title: "",
				href: "#",
				time: this.getDate() + " " + this.getTime(),
				tag: "",
				text: "",
				newFile: "",
			};
		},
		methods: {
			//添加dom
			addDom(type) {
				const dom = document.createElement(type);
				dom.innerText = "请输入";
				this.$refs.content.appendChild(dom);
			},
			//代码片段
			addPre() {
				var pre = document.createElement("pre");
				pre.innerHTML = "代码";
				this.$refs.content.appendChild(pre);
			},
			//设置字体样式和列表
			fontType(type) {
				let selection = window.getSelection();
				if (selection.rangeCount > 0) {
					document.execCommand(type, false, null);
				}
			},
			//添加链接
			addLink() {
				let selection = window.getSelection();

				if (selection.rangeCount > 0) {
					let link = document.createElement("a");
					link.href = this.href;
					link.contentEditable = false;
					// 将选中的文本插入到a标签中
					link.appendChild(selection.getRangeAt(0).extractContents());
					// 将a标签插入到原来的位置
					selection.getRangeAt(0).insertNode(link);
				}
			},
			//保存文章
			saveContent() {
				if (this.title == "") {
					this.$bus.$emit("tipShow", {
						title: "保存失败,标题不能为空",
						type: "no",
					});
					return;
				}
				if (this.tag == "") {
					this.$bus.$emit("tipShow", {
						title: "保存失败,标签不能为空",
						type: "no",
					});
					return;
				}
				if (!this.$refs.content.innerHTML) {
					this.$bus.$emit("tipShow", {
						title: "保存失败,内容不能为空",
						type: "no",
					});
					return;
				}
				if (!this.$route.query.id && this.newFile == "") {
					this.$bus.$emit("tipShow", {
						title: "请上传背景图片",
						type: "no",
					});
					return;
				}

				//字数
				let fontCount = this.$refs.content.innerText.replace(/\n/g, " ").length;
				if (fontCount > 1000) {
					fontCount = fontCount / 1000 + "k";
				}

				//数据
				const data = {
					id: this.id,
					time: this.time,
					...this.writing,
					title: this.title,
					tag: this.tag,
					subtitle: this.$refs.content.innerText.replace(/\n/g, " ").slice(0, 70),
					text: this.$refs.content.innerHTML,
					updateTime: this.getDate() + " " + this.getTime(),
					fontCount,
				};

				//上传背景图
				const formData = new FormData();
				formData.append("file", this.newFile);
				this.$store.dispatch("uploadImage", {
					data: formData,
					name: this.id,
				});

				//新建
				if (!this.$route.query.id) {
					this.$store.dispatch("writing/postData", data).then(() => {
						this.$bus.$emit("tipShow", {
							title: "保存成功",
						});
						this.$router.push({
							path: "/edit",
							query: {
								id: this.id,
							},
						});
					});
				} //保存
				else {
					//发请求
					this.$store.dispatch("writing/putData", data).then(() => {
						this.$bus.$emit("tipShow", {
							title: "保存成功",
						});
					});
				}
			},
			//删除文章
			deleteContent() {
				this.$bus.$emit("dialogShow", {
					title: "确定要删除吗?",
					count: 0,
					func: () => {
						this.$store.dispatch("writing/deleteData", this.$route.query.id).then(() => {
							this.$bus.$emit("tipShow", {
								title: "删除成功",
							});
							this.$router.replace({
								path: "/writings",
							});
						});
					},
				});
			},
			//设置图片
			setBgImage(e) {
				const file = e.target.files[0];
				this.newFile = file;
			},
			//按下tab按键
			keyUpTab() {
				document.execCommand("insertText", false, "\t");
			},
			//按下shift
			KeyUpShift(e) {
				switch (e.key) {
					case "{":
						document.execCommand("insertText", false, "}");
						break;
					case "(":
						document.execCommand("insertText", false, ")");
						break;
					case "<":
						document.execCommand("insertText", false, ">");
						break;
					case '"':
						document.execCommand("insertText", false, '"');
						break;
				}
			},
			//按下按键
			KeyUp(e) {
				switch (e.key) {
					case "'":
						e.preventDefault();
						document.execCommand("insertText", false, "''");
						break;
					case "[":
						e.preventDefault();
						document.execCommand("insertText", false, "[]");
						break;
					case "Enter":
						const node = window.getSelection().anchorNode;						
						if (node.parentNode.nodeName == "PRE" || node.parentNode.parentNode.nodeName == "PRE") {
							e.preventDefault();
							document.execCommand("insertHtml", false, "\n");
						}
						break;
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	main {
		background-color: var(--bg);
		padding: 1.75rem 0;
		> section {
			width: 60.5rem;
			padding: 1.75rem 2.25rem;
			nav {
				height: 40px;
				border: 1px solid var(--border);
				border-radius: 5px;
				color: var(--title-color);
				padding: 5px;
				background-color: var(--bg-l);
				> * {
					margin: 0 2.5px;
				}
				select,
				input[type="text"] {
					padding: 0 5px;
					color: var(--title-color);
					height: 25px;
					width: 90px;
					outline: none;
					background-color: var(--bg);
					border: 1px solid var(--border);
				}
				input[type="file"] {
					width: 70px;
				}
				button {
					color: var(--title-color);
					padding: 0 8px;
					height: 30px;
					border-radius: 5px;
					border: 2px solid transparent;
					cursor: pointer;
					&:hover {
						border: 2px solid var(--border);
					}
				}
			}
			> article {
				padding: 1rem 0;
				border-bottom: 1px solid var(--border);
				button {
					font-weight: bold;
					color: #fff;
					border-radius: 5px;
					width: 5.3125rem;
					height: 2.1875rem;
					background-color: var(--blue);
				}
				button:nth-child(2) {
					background-color: var(--red);
				}
				> input[type="text"] {
					padding: 0 0.3125rem;
					font-size: 16px;
					color: var(--title-color);
					width: 100%;
				}
				> div > input {
					width: 4.375rem;
				}
			}
			> article:nth-child(4) {
				height: 70vh;
				overflow: auto;
				outline: none;
				border-bottom: none;
				&::v-deep strike {
					color: #999;
					outline: none;
				}
				&::v-deep u {
					color: var(--blue);
					outline: none;
				}
				&::v-deep a {
					cursor: pointer;
					color: var(--pink);
					outline: none;
					&:hover {
						text-decoration: underline;
						color: var(--blue);
					}
				}
				&::v-deep h2 {
					padding-bottom: 5px;
					border-bottom: 1px solid var(--border);
					margin: 20px 0;
					outline: none;
					font-size: 26px;
				}
				&::v-deep ol {
					flex-wrap: wrap;
					counter-reset: num;
					outline: none;
					li::before {
						content: counter(num);
						counter-increment: num;
						top: 2px;
						left: -2em;
						width: 17px;
						height: 17px;
						text-align: center;
						color: #fff;
						font-size: 12px;
					}
				}
				&::v-deep ul {
					flex-wrap: wrap;
					height: auto;
					outline: none;
					li::before {
						content: "";
						top: 7px;
						left: -1em;
						width: 6px;
						height: 6px;
					}
				}
				&::v-deep li {
					outline: none;
					width: 100%;
					list-style: none;
					position: relative;
					margin: 0.3125rem 0 0.3125rem 1.5625rem;
					&::before {
						position: absolute;
						border-radius: 50%;
						background-color: var(--pink);
					}
				}
				&::v-deep aside {
					background-color: var(--bg-l);
					padding: 0.625rem 1.25rem;
					position: relative;
					color: #4d0000;
					margin: 1rem 0;
					&::before {
						content: "";
						top: 0;
						left: 0;
						position: absolute;
						width: 10px;
						height: 100%;
						background: var(--green);
					}
				}
				&::v-deep pre {
					tab-size: 4;
					margin: 0.625rem 0;
					font-size: 0.9rem;
					padding: 2.5rem 1rem 1rem;
					font-weight: bold;
					white-space: pre;
					font-family: "Consolas", "Monaco", "Andale" "Mono", "Ubuntu";
					line-height: 1.4;
					overflow-y: auto;
					background-color: #282c34;
					border-radius: 0.5rem;
					color: #fff;
					position: relative;
					&::-webkit-scrollbar-thumb {
						background-color: #fff;
						border-radius: 2em;
					}
					&::before {
						content: "";
						top: 1rem;
						left: 1rem;
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background-color: var(--red);
						position: absolute;
						box-shadow: 1.25rem 0 0 var(--yellow), 2.5rem 0 0 var(--green);
					}
					.keywordPink {
						color: #c586c0;
					}
					.keywordYellow {
						color: #dcdcaa;
					}
					.keywordBlue {
						color: #569cd6;
					}
				}
			}
		}
	}
	@media screen and (max-width: 480px) {
		main {
			padding-bottom: 0 !important;
			section {
				height: calc(100vh - 9.375rem);
				width: 100% !important;
				padding: 0.625rem !important;
				button {
					white-space: nowrap;
				}
				nav {
					height: auto !important;
					flex-wrap: wrap;
				}
				> article:nth-child(2) {
					span {
						font-size: 14px;
					}
				}
				> article:nth-child(4) {
					height: calc(100vh - 3.75rem);
				}
			}
		}
	}
</style>
