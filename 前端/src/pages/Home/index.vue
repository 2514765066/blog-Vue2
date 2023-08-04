<template>
	<div id="home" ref="home">
		<!-- 顶部 -->
		<header class="j-a-center h-100v">
			<!-- 背景图 -->
			<img :src="src" class="img" />
			<!-- 打字机 -->
			<section class="box a-center">
				<h1 v-if="isMobile()">ZMY's Blog</h1>
				<span class="f-c-white">{{ say }}</span>
			</section>

			<!-- 箭头 -->
			<div class="w-100 f-c-white p-absolute text-center">
				<i class="fa fa-angle-down"></i>
			</div>
			<Waves />
		</header>

		<main class="d-flex j-center p-relative">
			<div class="left h-100">
				<Said />
				<Item :w="w" v-for="(w, index) of writings.slice(-4).reverse()" :key="w.id" :isReverse="index % 2" />
			</div>

			<div class="right h-100" v-if="!isMobile()">
				<Mine />
				<Bulletin />
				<Details />
			</div>
		</main>

		<Footer />
	</div>
</template>

<script>
	import Said from "./Said";
	import Item from "./Item";
	import Mine from "@/components/Mine";
	import Bulletin from "./Bulletin";
	import Details from "./Details";
	import { mapState } from "vuex";

	export default {
		name: "Home",
		components: { Said, Item, Mine, Bulletin, Details },
		computed: {
			...mapState({
				writings: state => state.writing.writings,
				says: state => state.say.says,
				theme: state => state.theme,
			}),
			src() {
				if (this.theme == "light") return "/images/bg-l.png";
				else return "/images/bg-d.png";
			},
		},
		data() {
			return {
				say: "", //打字机展示
				index: 0, //目前索引
				nowSayLength: 1, //目前文字个数
				timer: undefined, //计时器
			};
		},
		methods: {
			//打字机打字效果
			enterTimer() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.say = this.says[this.index].substring(0, this.nowSayLength++);
					if (this.nowSayLength - 1 == this.says[this.index].length) {
						this.deleteTimer();
					}
				}, 600);
			},
			//打字机删除效果
			deleteTimer() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.say = this.says[this.index].substring(0, this.nowSayLength--);
					if (this.nowSayLength == 0) {
						this.index = (this.index + 1) % this.says.length;
						this.enterTimer();
					}
				}, 100);
			},
		},
		mounted() {
			this.enterTimer();
		},
	};
</script>

<style scoped lang="scss">
	header {
		position: relative;
		> img {
			position: fixed;
			width: 100%;
			height: 100vh;
			z-index: -1;
			user-select: none;
		}
		section {
			position: fixed;
			h1 {
				font-size: 40px;
				color: #fff;
			}
			span {
				font-size: 40px;
				font-family: "楷体";
				text-shadow: 1px 1px 5px #333;
				&::after {
					content: "";
					display: inline;
					height: 35px;
					border-right: 0.125rem solid #fff;
					animation: blink 1s infinite;
					@keyframes blink {
						0% {
							border-right-color: #fff;
						}
						100% {
							border-right-color: transparent;
						}
					}
				}
			}
		}
		> div {
			bottom: 3.125rem;
			font-size: 40px;
			animation: fade-in-out-shake 1.5s infinite alternate;
			@keyframes fade-in-out-shake {
				from {
					opacity: 0;
					transform: translateY(0.625rem);
				}

				to {
					opacity: 1;
					transform: translateY(-0.625rem);
				}
			}
		}
	}
	main {
		top: 0;
		background-color: var(--bg);
		padding: 1rem 0;
		z-index: 2;
		.left {
			width: calc(72.5rem - 18.75rem);
			padding: 0 0.625rem;
			* {
				margin-top: 1.25rem;
			}
		}
		.right {
			width: 18rem;
			padding: 0 0.625rem;
			* {
				margin-top: 1.25rem;
			}
		}
	}

	@media screen and (max-width: 480px) {
		header {
			section {
				> span {
					white-space: nowrap;
					font-size: 20px;
				}
			}
		}
		main {
			.left {
				width: 100vw;
			}
		}
	}
</style>
