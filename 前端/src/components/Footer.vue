<template>
	<footer class="d-flex a-end">
		<div id="jsi-flying-fish-container" class="w-100 of-hidden"></div>
	</footer>
</template>

<script>
	export default {
		name: "Footer",
		mounted() {
			if (!this.isMobile()) {
				const myfish = { ...fish };
				myfish.init();
			}
		},
	};
</script>

<style scoped>
	footer {
		height: 18.75rem;
		background-color: var(--bg);
	}
	#jsi-flying-fish-container {
		height: 100%;
	}
	@media screen and (max-width: 480px) {
		footer {
			animation: gradient 10s ease infinite;
			background: linear-gradient(-45deg, #ec8c69, #e9546b, #38a1db, #23d5ab);
			background-size: 300% 300%;
			height: 8rem;
		}
		@keyframes gradient {
			0% {
				background-position: 0 50%;
			}
			50% {
				background-position: 100% 50%;
			}
			100% {
				background-position: 0 50%;
			}
		}
	}
</style>
