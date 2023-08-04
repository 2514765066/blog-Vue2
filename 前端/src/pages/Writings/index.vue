<template>
	<div id="writings">
		<!-- 头部 -->
		<Header title="文章" />

		<!-- 中部 -->
		<main class="d-flex j-center">
			<section class="title-color box-border box">
				<!-- 标题 -->
				<article class="d-flex p-l-4 a-center">
					<span class="f-w-bold as-end">文章总览-{{ writings.length }}</span>
				</article>

				<Para v-for="w of writings.slice(0, nowView)" :key="w.id" :w="w" />

				<!-- 查看更多 -->
				<div class="text-center m-5">
					<span class="text-color click" @click="nowView += 4" v-if="isMore">查看更多<i class="fa-solid fa-angles-down m-l-1"></i></span>
					<span class="text-color" v-else>没有更多了</span>
				</div>
			</section>
		</main>

		<!-- 底部 -->
		<Footer />
	</div>
</template>

<script>
	import Para from "./Para";
	import { mapState } from "vuex";

	export default {
		name: "Writings",
		components: { Para },
		computed: {
			...mapState({ writings: state => state.writing.writings }),
			isMore() {
				return this.nowView < this.writings.length;
			},
		},
		data() {
			return {
				nowView: 4,
			};
		},
	};
</script>

<style scoped lang="scss">
	main {
		min-height: 18.75rem;
		background-color: var(--bg);
		padding: 1.75rem 0;
		section {
			width: 60.5rem;
			padding: 1.75rem 2.25rem;
			article {
				font-size: 24px;
				height: 3.125rem;
				&::before {
					position: relative;
					content: "";
					width: 0.75rem;
					height: 0.75rem;
					border: 7.5px solid var(--blue);
					background-color: var(--bg);
					border-radius: 50%;
					left: -32px;
					top: 12px;
				}
			}
		}
	}
</style>
