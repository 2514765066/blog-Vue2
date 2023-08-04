<template>
	<div id="talks" class="bg-img">
		<!-- 头部 -->
		<Header title="说说" />

		<main class="d-flex j-center">
			<section class="box box-border">
				<TalkModule v-for="t of talks.slice(0, nowView)" :key="t.id" :t="t" />

				<!-- 查看更多 -->
				<div class="text-center m-5">
					<span class="text-color click" @click="nowView += 4" v-if="isMore">查看更多<i class="fa-solid fa-angles-down m-l-1"></i></span>
					<span class="text-color" v-else>没有更多了</span>
				</div>

				<!-- 发布说说 -->
				<transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" appear>
					<div class="box send" v-if="isAdministrator">
						<textarea placeholder="输入内容" class="w-100 title-color f-s-18 m-b-4" v-model="inputTalk"></textarea>
						<button class="f-c-white click as-end" @click="addTalk">发布</button>
					</div>
				</transition>
			</section>
		</main>

		<!-- 底部 -->
		<Footer />
	</div>
</template>

<script>
	import TalkModule from "./TalksModule";
	import { mapState } from "vuex";

	export default {
		name: "Talks",
		components: { TalkModule },
		computed: {
			...mapState({
				talks: state => state.talk.talks,
				isAdministrator: state => state.isAdministrator,
			}),
			isMore() {
				return this.nowView < this.talks.length;
			},
		},
		data() {
			return {
				inputTalk: "",
				nowView: 4,
			};
		},
		methods: {
			addTalk() {
				//验证是否合法
				if (this.inputTalk.trim() == "") return;
				//发送请求
				this.$store.dispatch("talk/postData", this.inputTalk.trim()).then(() => {
					//显示提示框
					this.$bus.$emit("tipShow", {
						title: "发布成功",
					});
					//清空内容
					this.inputTalk = "";
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
			> div {
				textarea {
					background-color: transparent;
					min-height: 100px;
					height: auto;
					line-height: 20px;
					padding: 6px 10px;
					border: 2px solid #aaa;
					border-radius: 3px;
					outline: none;
					transition: 0.5s;
					height: auto;
					&:focus {
						border: 2px solid #b6c1ce;
					}
				}
				button {
					background-color: var(--blue);
					padding: 0 20px;
					height: 1.875rem;
					border-radius: 3px;
				}
			}
		}
	}
	@media screen and (max-width: 480px) {
		section {
			padding: 0 !important;
			>div:nth-child(1){
				margin-top: 0;				
			}
			.send {
				padding: 10px;				
			}
		}
	}
</style>
