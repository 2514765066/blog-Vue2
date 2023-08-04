<template>
	<div>
		<Header title="关于" />

		<main class="d-flex j-center">
			<section class="box-border box a-center">
				<!-- 头像 -->
				<div class="d-flex j-between a-center w-100">
					<span>头像</span>
					<img :src="src" class="click img" @click="openDialog" />
					<input type="file" ref="file" accept="image/jpeg, image/png" @change="uploadImage" v-if="isAdministrator" />
				</div>
				<!-- 名字 -->
				<div class="d-flex j-between a-center w-100">
					<span>名字</span>
					<input type="text" v-model="name" maxlength="10" :disabled="!isAdministrator" />
				</div>
				<!-- 个性签名 -->
				<div class="d-flex j-between a-center w-100">
					<span>个性签名</span>
					<input type="text" v-model="say" maxlength="50" :disabled="!isAdministrator" />
				</div>
				<!-- 公告 -->
				<div class="d-flex j-between a-center w-100">
					<span>公告</span>
					<input type="text" v-model="bulletin" maxlength="50" :disabled="!isAdministrator" />
				</div>
				<button class="m-t-5 click f-w-bold" v-if="isAdministrator" @click="saveData">保存修改</button>
			</section>
		</main>

		<Footer />
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "About",
		computed: {
			...mapState({
				abouts: state => state.about.abouts,
				isAdministrator: state => state.isAdministrator,
			}),
			src() {
				if (this.path != "") return this.path;
				else return "/images/header.png";
			},
		},
		watch: {
			abouts: {
				immediate: true,
				handler(value) {
					this.name = value.name;
					this.say = value.say;
					this.bulletin = value.bulletin;
				},
			},
		},
		data() {
			return {
				name: "",
				say: "",
				bulletin: "",
				path: "",
			};
		},
		methods: {
			openDialog() {
				if (this.isAdministrator) {
					this.$refs.file.click();
				}
			},
			uploadImage(e) {
				const file = e.target.files[0];
				this.path = window.URL.createObjectURL(file);
				// 创建一个FormData对象
				const formData = new FormData();
				// 将文件添加到FormData对象中
				formData.append("file", file);
				this.$store
					.dispatch("uploadImage", {
						data: formData,
						name: "header",
					})
					.then(() => {
						this.$bus.$emit("tipShow", {
							title: "修改成功",
						});
					});
			},
			saveData() {
				const data = {
					name: this.name,
					say: this.say,
					bulletin: this.bulletin,
				};
				this.$store.dispatch("about/putData", data).then(() => {
					this.$bus.$emit("tipShow", {
						title: "保存成功",
					});
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	main {
		background-color: var(--bg);
		padding: 1.75rem 0;
		section {
			width: 60.5rem;
			padding: 1.75rem 2.25rem;
			div {
				color: var(--title-color);
				border-bottom: 1px solid #eee;
				padding: 15px 0;
				font-size: 1.125rem;
				> img {
					width: 3.75rem;
					height: 3.75rem;
					border-radius: 20px;
				}
				input[type="file"] {
					display: none;
				}
				input[type="text"] {
					width: 25rem;
					height: 100%;
					text-align: end;
					font-size: 16px;
					color: var(--text-color);
				}
			}
			button {
				background-color: var(--blue);
				color: var(--bg);
				padding: 10px 20px;
				border-radius: 30px;
			}
		}
	}
	@media screen and (max-width: 480px) {
		section {
			width: 100% !important;
			padding: 0.625rem 0.625rem 1.25rem !important;
			> div {
				padding: 1.875rem 0 !important;
				span {
					white-space: nowrap;
					font-size: 16px !important;
				}
			}
		}
	}
</style>
