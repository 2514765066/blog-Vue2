<template>
	<div class="d-flex a-center" id="barrage" ref="barrage" @animationend="isShow = false" v-if="isShow">
		<i class="fa-regular fa-face-smile m-r-1"></i>
		<span class="m-r-1">游客：{{ title }}</span>
	</div>
</template>

<script>
	export default {
		name: "Barrage",
		props: ["title", "isNew"],
		data() {
			return {
				isShow: true,
			};
		},
		mounted() {
			//随机高度
			const rows = Math.floor((window.innerHeight - 105) / 45); //总共多少行
			this.$refs.barrage.style.top = Math.floor(Math.random() * rows) * 45 + "px";

			if (this.isNew) {
				this.$refs.barrage.style.animationDuration = 5 + "s";
				this.$refs.barrage.style.animationDelay = 0 + "s";
			} else {
				this.$refs.barrage.style.animationDuration = Math.random() * 12 + 4 + "s";
				this.$refs.barrage.style.animationDelay = Math.random() * 17 + 2 + "s";
			}

			if (this.isMobile()) {
				this.$refs.barrage.style.animationDuration = Math.random() * 3 + 2 + "s";
			}
		},
	};
</script>

<style scoped lang="scss">
	#barrage {
		right: -510px;
		min-width: 100px;
		height: 2.5rem;
		border-radius: 1.25rem;
		padding: 0.3125rem;
		position: absolute;
		z-index: 1000;
		font-size: 1.25rem;
		background-color: rgba(#000, 0.4);
		i {
			font-size: 1.875rem;
		}
		&:hover {
			animation-play-state: paused;
		}
		animation-name: moveToLeft;
		animation-timing-function: linear;
	}
	@keyframes moveToLeft {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100vw - 510px));
		}
	}
</style>
