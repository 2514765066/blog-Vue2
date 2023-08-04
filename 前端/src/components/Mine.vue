<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" appear>
		<div id="mine" class="w-100 box-border box a-center">
			<!-- 头像 -->
			<img src="/images/header.png" class="br-50 img" />

			<!-- 名字 -->
			<p class="m-t-3 title-color">{{ abouts.name }}</p>

			<!-- 名言 -->
			<div class="m-tb-2 text-color text-center">{{ abouts.say }}</div>

			<!-- 博客信息 -->
			<div class="blog-msg d-flex m-tb-2 subtitle-color">
				<div class="box a-center">
					<div class="f-s-20 f-w-bold">{{ writings.length }}</div>
					<div class="f-s-14">文章</div>
				</div>
				<div class="box a-center">
					<div class="f-s-20 f-w-bold">{{ talks.length }}</div>
					<div class="f-s-14">说说</div>
				</div>
				<div class="box a-center">
					<div class="f-s-20 f-w-bold">4</div>
					<div class="f-s-14">标签</div>
				</div>
			</div>
			<!-- 社交 -->
			<div class="gam m-t-2">
				<i class="fa-brands fa-github f-s-20"></i>
				<i class="fa-brands fa-qq f-s-20 qq"></i>
				<i class="fa-brands fa-weixin f-s-20"></i>
				<i class="fa-brands fa-bilibili f-s-20"></i>
			</div>
		</div>
	</transition>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "Mine",
		computed: {
			...mapState({
				writings: state => state.writing.writings,
				talks: state => state.talk.talks,
				abouts: state => state.about.abouts,
			}),
		},
	};
</script>

<style scoped lang="scss">
	#mine {
		padding: 1rem calc(50% - 4.8438rem);
		&:hover {
			img {
				transform: rotate(360deg);
			}
		}
		img {
			width: 9.6875rem;
			height: 9.6875rem;
			transition: 1s transform;
		}
		.blog-msg > div {
			width: auto;
			padding: 0 0.6875rem;
			&:nth-child(2) {
				border-left: 1px solid var(--border);
				border-right: 1px solid var(--border);
			}
		}
		i {
			margin: 0 0.5rem;
		}
		.fa-qq {
			color: var(--blue);
		}
		.fa-weixin {
			color: var(--green);
		}
		.fa-bilibili {
			color: var(--pink);
		}
	}
	@media screen and (max-width: 480px) {
		#mine{
			box-shadow: none;
		}
	}
</style>
