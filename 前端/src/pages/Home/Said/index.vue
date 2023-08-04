<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__slideInLeft" appear>
		<div class="d-flex box-border of-hidden subtitle-color" id="say">
			<i class="fa-regular fa-bell f-s-20" />

			<!-- 内容 -->
			<section class="box" ref="move">
				<article class="j-a-center" v-for="(s, index) of says" :key="index">{{ s }}</article>
				<article class="j-a-center">{{ says[0] }}</article>
			</section>

			<i class="fa-solid fa-angles-right f-s-20" v-if="!isMobile()"/>
		</div>
	</transition>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "Said",
		computed: {
			...mapState({
				says: state => state.say.says,
			}),
		},
		data() {
			return {
				index: 0,
				timer: undefined, //计时器
			};
		},
		mounted() {
			this.timer = setInterval(() => {
				this.index++;
				if (this.index - 1 == this.says.length) {
					this.index = 0;
					this.$refs.move.style.transition = "none";
					this.$refs.move.style.transform = `translateY(0)`;
				} else {
					this.$refs.move.style.transition = "1s";
					this.$refs.move.style.transform = `translateY(-${this.index * 45}px)`;
				}
			}, 4000);
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
	};
</script>

<style scoped lang="scss">
	#say {
		width: 100%;
		height: 2.8125rem;
		padding: 0 1rem;
		align-items: center;
		justify-content: space-between;
		section {
			align-self: start;
			padding: 0 1rem;
			> article {
				color: var(--title-color);
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				height: 45px;
			}
		}
		i:nth-child(3) {
			animation: arrow 2s infinite;
		}

		@keyframes arrow {
			0% {
				opacity: 1;
			}
			50% {
				opacity: 0;
				transform: translateX(0.625rem);
			}
			100% {
				opacity: 1;
			}
		}
	}
	@media screen and (max-width: 480px) {
		section {
			> article {
				justify-content: start !important;
			}
		}
	}
</style>
