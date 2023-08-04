<template>
	<nav class="j-a-center j-end a-center">
		<router-link to="/home">
			<span class="click j-a-center" ref="home"><i class="fa fa-home m-r-1" />主页</span>
			<div></div>
		</router-link>

		<router-link to="/writings">
			<span class="click j-a-center" ref="writings"><i class="fa-solid fa-book-open m-r-1" />文章</span>
			<div></div>
		</router-link>

		<router-link to="/talks">
			<span class="click j-a-center" ref="talks"><i class="fa-solid fa-comment m-r-1" />说说</span>
			<div></div>
		</router-link>

		<router-link to="/messages">
			<span class="click j-a-center" ref="messages"><i class="fa-solid fa-message m-r-1" />留言</span>
			<div></div>
		</router-link>

		<router-link to="/abouts">
			<span class="click j-a-center" ref="abouts"><i class="fa-solid fa-paper-plane m-r-1" />关于</span>
			<div></div>
		</router-link>

		<a @click="Login">
			<span class="click j-a-center"><i class="fa-solid fa-user m-r-1" />登录</span>
			<div></div>
		</a>
	</nav>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "PcNav",
		computed: {
			...mapState({
				abouts: state => state.about.abouts,
				isAdministrator: state => state.isAdministrator,
			}),
		},
		data() {
			return {
				nowSelect: "",
			};
		},
		watch: {
			nowSelect: {
				handler(newValue, oldValue) {
					if (oldValue) oldValue.classList.remove("select");
					try {
						newValue.classList.add("select");
					} catch {}
				},
			},
			"$route.path": {
				handler() {
					this.nowSelect = this.$refs[this.$route.path.slice(1)];
				},
			},
		},
		methods: {
			Login() {
				this.$bus.$emit("dialogShow", {
					title: "请输入密码",
					count: 1,
					type: "password",
					func: data => {
						this.$store.dispatch("Login", data).then(res => {
							if (res) {
								this.$bus.$emit("tipShow", {
									title: "登录成功,欢迎管理员!",
								});
							} else {
								this.$bus.$emit("tipShow", {
									title: "密码错误",
									type: "no",
								});
							}
						});
					},
				});
			},
		},
		mounted() {
			this.nowSelect = this.$refs[this.$route.path.slice(1)];
		},
	};
</script>

<style scoped lang="scss">
	nav {
		position: fixed;
		top: 0;
		right: 0;
		height: 3.75rem;
		padding: 0.5rem 1rem;
		z-index: 997;
		> a {
			span {
				padding: 0.5rem;
				color: #fff;
				text-shadow: 1px 1px 2px #666;
				&:hover + div {
					width: 100%;
				}
			}
			div {
				width: 0;
				height: 3px;
				border-radius: 3px;
				background-color: #fff;
				transition: 0.2s width;
				position: relative;
				top: 5px;
			}
		}
	}
	@media screen and (max-width: 480px) {
		nav {
			height: auto;
			position: static;
			flex-direction: column;
			padding: 0;

			a {
				width: 10rem;
				height: 3rem;
				margin: 0.625rem 0;
				span {
					height: 100%;
					color: var(--text-color);
					text-shadow: none;
					border-radius: 1rem;
					&:hover {
						+ div {
							width: 0;
						}
					}
				}
			}
			.select {
				transition: 0.5s;
				background-image: linear-gradient(to right, #ed6ea0 0, #ec8c69 100%);
				color: #fff;
				box-shadow: 0 0 0.75rem #ed6ea0;
			}
		}
	}
</style>
