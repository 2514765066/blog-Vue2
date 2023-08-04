<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__zoomIn" appear>
		<!-- 正向 -->
		<div class="normal d-flex box-border" v-if="!isReverse" @click="toRelease">
			<!-- 图片 -->
			<img :src="src" class="img" />

			<section class="box">
				<article class="d-flex j-end a-center">
					<span class="m-r-3"><i class="fa-solid fa-calendar-days m-r-1" />{{ w.time }} </span>
					<span><i class="fa-solid fa-tags m-r-1"></i>{{ w.tag }}</span>
				</article>
				<h3 class="m-tb-2 title-color">{{ w.title }}</h3>
				<div class="h-100 of-hidden title-color f-s-14">## {{ w.subtitle }} ......</div>
				<a href="#" class="bg-color as-end">more...</a>
			</section>
		</div>
		<!-- 反向 -->
		<div class="reverse d-flex box-border" v-else @click="toRelease">
			<section class="box">
				<article class="d-flex a-center">
					<span class="m-r-3"><i class="fa-solid fa-calendar-days m-r-1" />{{ w.time }} </span>
					<span><i class="fa-solid fa-tags m-r-1"></i>{{ w.tag }}</span>
				</article>
				<h3 class="m-tb-2 title-color">{{ w.title }}</h3>
				<div class="h-100 of-hidden title-color f-s-14">## {{ w.subtitle }} ......</div>
				<a href="#" class="bg-color">more...</a>
			</section>

			<!-- 图片 -->
			<img :src="src" class="img" />
		</div>
	</transition>
</template>

<script>
	export default {
		name: "Item",
		props: ["isReverse", "w"],
		computed: {
			src() {
				return `/images/${this.w.id}.png`;
			},
		},
		methods: {
			toRelease() {
				this.$router.push({
					path: "/writing",
					query: {
						id: this.w.id,
					},
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.normal {
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		height: 14rem;
		max-width: 52.5rem;
		overflow: hidden;
		img {
			height: 100%;
			clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);
			margin-right: 1.5rem;
			transition: 0.2s transform;
		}
		section {
			padding-top: 1rem;
			> article:nth-child(1) {
				padding-right: 1.5rem;
				color: var(--text-color);
				font-size: 13px;
			}
			> h3 {
				color: var(--pink);
			}
			> div {
				line-height: 30px;
				padding-right: 1.5rem;
			}
			> a {
				width: 5rem;
				padding: 0.7rem 1rem;
				border-top-left-radius: 1rem;
				border-bottom-right-radius: 1rem;
				background-image: linear-gradient(to right, #ed6ea0 0, #ec8c69);
				transform-origin: bottom right;
				transition: 0.2s transform;
				&:hover {
					transform: scale(1.1);
				}
			}
		}
		&:hover img {
			transform: scale(1.1) rotate(2deg);
		}
	}
	.reverse {
		overflow: hidden;
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		height: 14rem;
		max-width: 52.5rem;
		img {
			height: 100%;
			clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
			margin-left: 1.5rem;
			transition: 0.2s transform;
		}
		section {
			padding-top: 1rem;
			> article:nth-child(1) {
				padding-left: 1.5rem;
				color: var(--text-color);
				font-size: 13px;
			}
			> h3 {
				color: var(--pink);
				padding-left: 1.5rem;
			}
			> div {
				line-height: 30px;
				padding-left: 1.5rem;
			}
			> a {
				width: 5rem;
				padding: 0.7rem 1rem;
				border-top-right-radius: 1rem;
				border-bottom-left-radius: 1rem;
				background-image: linear-gradient(to right, #ed6ea0 0, #ec8c69);
				transform-origin: bottom left;
				transition: 0.5s transform;
				&:hover {
					transform: scale(1.1);
				}
			}
		}
		&:hover img {
			transform: scale(1.1) rotate(2deg);
		}
	}
	@media screen and (max-width: 480px) {
		.normal {
			width: calc(100vw - 20px);
			flex-direction: column;
			height: auto;
			img {
				clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
				margin: 0;
			}
			section{
				padding-left: 1.5rem;
			}
		}
		.reverse {
			width: calc(100vw - 20px);
			flex-direction: column-reverse;
			height: auto;
			img {
				clip-path: polygon(0 0, 100% 0, 100% 100%, 0 92%);
				margin: 0;
			}
			section{
				padding-right: 1.5rem;
			}
		}
	}
</style>
