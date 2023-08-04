<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__fadeIn" appear>
		<div class="d-flex writings">
			<article @click="toWriting">
				<img :src="src" class="img click" />
			</article>
			<div class="box j-center f-1 m-l-3 f-s-14 title-color" @click="toWriting">
				<span><i class="fa-solid fa-calendar-days m-r-1" />{{ w.time }}</span>
				<span class="click f-s-15">{{ w.title }}</span>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "Para",
		props: ["w"],
		computed: {
			src() {
				return `/images/${this.w.id}.png`;
			},
		},
		methods: {
			toWriting() {
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
	.writings {
		padding: 20px 20px 0;
		border-left: 2px solid var(--cyan);
		&::before {
			position: relative;
			content: "";
			width: 0.3125rem;
			height: 0.3125rem;
			border: 3px solid var(--blue);
			background-color: var(--bg);
			border-radius: 50%;
			top: 50px;
			left: -26px;
		}
		article {
			border-radius: 10px;
			overflow: hidden;
			width: 7.5rem;
			height: 7.5rem;
			img {
				width: 7.5rem;
				height: 7.5rem;
				transition: 0.5s transform;
				&:hover {
					transform: scale(1.1);
				}
			}
			+ div {
				span {
					transition: 0.5s;
					line-height: 40px;
				}
				span:nth-child(2):hover {
					color: var(--orange);
					transform: translateX(10px);
				}
			}
		}
	}
</style>
