<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInLeft" appear>
		<div id="permissions" class="box">
			<!-- 导航 -->
			<div class="of-hidden d-flex click a-center" v-if="isMobile()" @click="infoShow">
				<i class="fa-solid fa-bars f-s-20 m-r-3" />
				<span>导航</span>
			</div>

			<!-- 主题 -->
			<div class="of-hidden d-flex click a-center" @click="CUTOVER_THEME">
				<i class="fa-solid fa-sun f-s-20 m-r-3" ref="theme" />
				<span>主题: {{ theme == "light" ? "浅色" : "深色" }}</span>
			</div>

			<!-- 编辑模式 -->
			<div class="of-hidden d-flex click a-center" @click="toEdit" v-if="editIsShow">
				<i class="fa-solid fa-pen-to-square f-s-20 m-r-3" />
				<span>进入编辑模式</span>
			</div>

			<!-- 退出编辑模式 -->
			<div class="of-hidden d-flex click a-center" @click="backEdit" v-if="backEditIsShow">
				<i class="fa-solid fa-circle-arrow-left f-s-20 m-r-3" />
				<span>退出编辑模式</span>
			</div>

			<!-- 添加文章 -->
			<div class="of-hidden d-flex click a-center" @click="addWriting" v-if="addIsShow">
				<i class="fa-solid fa-plus f-s-20 m-r-3" />
				<span>添加文章</span>
			</div>
		</div>
	</transition>
</template>

<script>
	import { mapState, mapMutations } from "vuex";

	export default {
		name: "Permissions",
		computed: {
			...mapState(["isEdit", "theme", "isAdministrator"]),
			addIsShow() {
				return this.$route.path != "/edit" && this.isAdministrator;
			},
			editIsShow() {
				return this.$route.path == "/writing" && this.isAdministrator;
			},
			backEditIsShow() {
				return this.$route.path == "/edit";
			},
		},
		watch: {
			theme(value) {
				if (value == "light") {
					this.$refs.theme.classList.remove("fa-moon");
					this.$refs.theme.classList.add("fa-sun");
				} else {
					this.$refs.theme.classList.remove("fa-sun");
					this.$refs.theme.classList.add("fa-moon");
				}
			},
		},
		methods: {
			...mapMutations(["CUTOVER_EDIT", "CUTOVER_THEME"]),
			//添加文章
			addWriting() {
				this.$router.push({
					path: "/edit",
				});
			},
			//进入编辑模式
			toEdit() {
				this.$router.push({
					path: "/edit",
					query: {
						id: this.$route.query.id,
					},
				});
			},
			//退出编辑模式
			backEdit() {
				if (this.$route.query.id) {
					this.$router.push({
						path: "/writing",
						query: {
							id: this.$route.query.id,
						},
					});
				} else {
					this.$router.back();
				}
			},
			//展示个人信息和导航
			infoShow() {
				this.$bus.$emit("infoShow");
			},
		},
	};
</script>

<style scoped lang="scss">
	#permissions {
		color: var(--permissions-color);
		position: fixed;
		left: 0;
		top: 3.75rem;
		width: 3.4375rem;
		padding: 0.9375rem 0;
		z-index: 997;
		background-color: var(--permissions-bg);
		border-top-right-radius: 1.25rem;
		border-bottom-right-radius: 1.25rem;
		transition: 0.5s;
		* {
			transition: 0.5s;
		}
		&:hover {
			width: 170px;
			> div > span {
				opacity: 1;
			}
		}
		> div {
			padding: 10px 0.9375rem;
			span {
				white-space: nowrap;
				opacity: 0;
			}
		}
	}
	@media screen and (max-width: 480px) {
		#permissions {
			top: 0;
			border-top-right-radius: 0;
		}
	}
</style>
