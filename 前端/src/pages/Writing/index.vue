<template>
	<div class="bg-img" id="release">
		<!-- 头部 -->
		<Header :title="writing.title" :url="url">
			<span><i class="fa-solid fa-calendar-days m-r-1" />发布于{{ writing.time }}</span>
			<span><i class="fa-solid fa-rotate-right m-r-1" />更新于{{ writing.updateTime }}</span>
			<span><i class="fa-solid fa-pencil m-r-1" />字数{{ writing.fontCount }}</span>
			<span><i class="fa-solid fa-tags m-r-1" />标签{{ writing.tag }}</span>
		</Header>

		<!-- 中部 -->
		<main class="d-flex j-center">
			<!-- 格式页面元素 -->
			<section class="left box-border box title-color" v-html="writing.text" ref="content"></section>

			<!-- 目录和操作 -->
			<section class="right" v-if="!isMobile()">
				<!-- 黏性定位 -->

				<!-- 目录 -->
				<article class="box-border box title-color mulu">
					<!-- 标题 -->
					<div class="m-b-2"><i class="fa-solid fa-list-ul m-r-1"></i>目录</div>
					<!-- 列表 -->
					<aside v-for="(l, index) of list" :key="index" @click="toView($event, l)">{{ l }}</aside>
				</article>
			</section>
		</main>

		<!-- 底部 -->
		<Footer />
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "Writing",
		computed: {
			...mapState({
				writing(state) {
					const item = state.writing.writings.find(item => item.id == this.$route.query.id);
					return item || {};
				},
				isEdit: state => state.isEdit,
			}),
			list() {
				if (this.writing.text) {
					try {
						const matchs = this.writing.text.match(/<h2>(.*?)<\/h2>/g, "$1");
						return matchs.map(value => value.replace(/<\/?h2>/g, ""));
					} catch {}
				}
			},
			url() {
				return `/images/${this.writing.id}.png`;
			},
		},
		data() {
			return {
				nowList: "",
			};
		},
		watch: {
			nowList(newValue, oldValue) {
				if (oldValue) {
					oldValue.className = "";
				}
				newValue.className = "selected";
			},
		},
		methods: {
			toView(e, item) {
				const nodes = this.$refs.content.childNodes;
				this.nowList = e.target;

				for (let i = 0; i < nodes.length; i++) {
					if (nodes[i].tagName === "H2" && nodes[i].textContent === item) {
						const elementPosition = nodes[i].getBoundingClientRect().top;
						const offsetPosition = elementPosition + window.pageYOffset - 100;
						window.scrollTo({
							top: offsetPosition,
							behavior: "smooth",
						});
						break;
					}
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	main {
		min-height: 60rem;
		background-color: var(--bg);
		padding: 1.75rem 0;
		section {
			min-height: 31.25rem;
			margin: 0 0.625rem;
		}
		.left {
			width: calc(72.5rem - 18.75rem);
			padding: 2rem 2.5rem;
			&::v-deep * {
				user-select: text !important;
				-webkit-user-select: text !important; 
			}	
			&::v-deep strike {
				color: #999;
				outline: none;
			}
			&::v-deep u {
				color: var(--blue);
				outline: none;
			}
			&::v-deep a {
				transition: 0.5s;
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
				margin: 0.3125rem 0;
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
		.right {
			width: 18rem;
			article {
				position: sticky;
				top: 3.75rem;
				max-height: 70vh;
				overflow: auto;
				padding: 1rem;
				aside {
					height: 2rem;
					font-size: 14px;
					display: flex;
					align-items: center;
					transition: 0.5s;
					border-radius: 3px;
					cursor: pointer;
					padding: 0.625rem;
					&:hover {
						background-color: var(--blue);
						color: #fff;
					}
				}
			}
		}
	}
	.selected {
		transition: 0.5s;
		background-color: var(--pink);
		color: #fff;
	}
	@media screen and (max-width: 480px) {
		section {
			width: 100% !important;
			margin: 0 !important;
			padding: 0.625rem !important;
		}
	}
</style>
