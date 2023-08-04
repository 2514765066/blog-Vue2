<template>
	<div id="talk">
		<Header title="说说" />

		<main class="d-flex j-center">
			<section class="box-border box">
				<!-- 说说 -->
				<article class="d-flex">
					<img src="/images/header.png" class="img" />

					<div class="box m-l-2">
						<span class="f-s-14 f-w-bold name-color m-b-1">张铭洋<i class="fa-solid fa-clipboard-check m-l-2"></i></span>
						<span class="f-s-13 text-color m-b-3">{{ talk.time }}</span>
						<p class="title-color m-b-3">{{ talk.text }}</p>
						<div class="d-flex">
							<span class="f-s-13 m-r-4 text-color"><i class="fa-solid fa-thumbs-up m-r-1"></i>{{ talk.like }}</span>
							<span class="f-s-13 m-r-4 text-color"><i class="fa-solid fa-comment-dots m-r-1"></i>{{ talk.msg.length }}</span>
						</div>
					</div>
				</article>

				<!-- 评论发布 -->
				<article>
					<div class="f-s-20 m-b-5">
						<i class="fa-solid fa-comment-dots m-r-1 text-color"></i>
						<span class="title-color f-w-bold">评论</span>
					</div>

					<div class="d-flex">
						<i class="fa-solid fa-circle-user text-color"></i>
						<input type="text" placeholder="发布一条友善的评论" class="m-lr-2" v-model="value" @keyup.enter="addMsg" />
						<button class="click" @click="addMsg">评论</button>
					</div>
				</article>

				<!-- 评论 -->
				<article>
					<TalkModule v-for="m of talk.msg.slice(0, nowView)" :key="m.time" :m="m" />
					<!-- 查看更多 -->
					<div class="text-center m-5">
						<span class="text-color click" @click="nowView += 4" v-if="isMore">查看更多<i class="fa-solid fa-angles-down m-l-1"></i></span>
						<span class="text-color" v-else>没有更多了</span>
					</div>
				</article>
			</section>
		</main>

		<Footer />
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import TalkModule from "./TalkModule";

	export default {
		name: "Talk",
		components: { TalkModule },
		computed: {
			...mapState({
				talks: state => state.talk.talks,
			}),
			talk() {
				if (this.talks.length == 0) {
					return {
						text: "",
						time: "",
						like: 0,
						msg: [],
					};
				}

				//当前文章
				return this.talks.find(item => {
					if (item.id == this.$route.query.id) {
						return item;
					}
				});
			},
			isMore() {
				return this.nowView < this.talk.msg.length;
			},
		},
		data() {
			return {
				value: "",
				nowView: 4,
			};
		},
		methods: {
			addMsg() {
				if (this.value.trim() == "") return;

				this.talk.msg.unshift({
					text: this.value.trim(),
					time: `${this.getDate()}  ${this.getTime()}`,
				});

				this.$store.dispatch("talk/putData", this.talk).then(() => {
					this.$bus.$emit("tipShow", {
						title: "发布成功",
					});
					this.value = "";
				});
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
			article:nth-child(1) {
				padding: 0 0.625rem;
				img {
					width: 3rem;
					height: 3rem;
					border-radius: 50%;
				}
				p {
					font-size: 15px;
					word-break: break-all;
				}
			}
			article:nth-child(2) {
				margin: 1.375rem 0;
				padding: 0 0.625rem;
				> div:nth-child(2) {
					i {
						font-size: 48px;
					}
					input {
						background-color: var(--bg-l);
						border: 1px solid var(--border);
						border-radius: 10px;
						padding: 20px 10px;
						width: 100%;
						color: var(--title-color);
					}
					button {
						width: 5rem;
						background-color: var(--cyan);
						border-radius: 10px;
						padding: 10px 20px;
						color: var(--tip-color);
						font-weight: bold;
					}
				}
			}
		}
	}
	@media screen and (max-width: 480px) {
		section {
			padding: 1.75rem 0 !important;
			> article:nth-child(2) {
				.fa-circle-user {
					font-size: 35px !important;
				}
				input {
					height: 35px;
					padding: 0 0.625rem !important;
				}
				button {
					padding: 0 !important;
					height: 2.1875rem;
				}
			}
		}
	}
</style>
