<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" appear>
		<div id="talksmodule" class="box-border-down box m-tb-2 click" @click="toTalk">
			<!-- 信息 -->
			<div class="header d-flex a-center">
				<!-- 头像 -->
				<img src="/images/header.png" class="img" />
				<!-- 信息 -->
				<div class="box m-l-2 j-between h-100 w-50 f-1">
					<span class="f-s-14 f-w-bold name-color">张铭洋<i class="fa-solid fa-clipboard-check m-l-2"></i></span>
					<span class="f-s-13 text-color">{{ t.time }}</span>
				</div>
			</div>
			<!-- 内容 -->
			<div class="text title-color">{{ t.text }}</div>
			<!-- 点赞 -->
			<div class="d-flex">
				<span class="f-s-13 m-r-4 text-color"><i class="fa-solid fa-thumbs-up m-r-1"></i>{{ t.like }}</span>
				<span class="f-s-13 m-r-4 text-color"><i class="fa-solid fa-comment-dots m-r-1"></i>{{ t.msg.length }}</span>
			</div>

			<!-- 操作 -->
			<aside class="j-a-center" ref="operate" v-if="isAdministrator">
				<button class="click text-color"><i class="fa-solid fa-chevron-left" /></button>
				<button class="click" @click.stop="deleteTalk"><i class="fa-solid fa-trash-can" /></button>
			</aside>
		</div>
	</transition>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "Talk",
		props: ["t"],
		computed: {
			...mapState(["isAdministrator"]),
		},
		methods: {
			toTalk() {
				this.$router.push({
					path: "/talk",
					query: {
						id: this.t.id,
					},
				});
			},
			deleteTalk() {
				this.$bus.$emit("dialogShow", {
					title: "确定要删除吗？",
					func: () => {
						this.$store.dispatch("talk/deleteData", this.t.id).then(() => {
							this.$bus.$emit("tipShow", {
								title: "删除成功",
								count: 0,
							});
						});
					},
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	#talksmodule {
		padding: 1rem 1.25rem;
		position: relative;
		overflow: hidden;
		.header {
			height: 3.375rem;
			img {
				width: 2.8rem;
				height: 2.8rem;
				border-radius: 10px;
			}
			> div {
				line-height: 26px;
			}
		}
		.text {
			margin: 8px 0 1rem;
			font-size: 15px;
			word-break: break-all;
		}
		> aside {
			border-radius: 0.5rem;
			overflow: hidden;
			height: 100%;
			position: absolute;
			right: 0;
			top: 0;
			transform: translateX(30px);
			transition: 0.5s transform;
			&:hover {
				transform: translateX(0);
				& > button:nth-child(1) > i {
					transform: rotate(180deg);
				}
			}
			> button {
				width: 30px;
				height: 100%;
			}
			> button:nth-child(1) > i {
				transition: 0.5s transform;
			}
			> button:nth-child(2) {
				background-color: var(--red);
				color: #fff;
			}
		}
	}
</style>
