<template>
	<svg class="w-100 p-absolute" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
		<defs>
			<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
		</defs>
		<g class="parallax">
			<use xlink:href="#gentle-wave" x="48" y="0"></use>
			<use xlink:href="#gentle-wave" x="48" y="3"></use>
			<use xlink:href="#gentle-wave" x="48" y="5"></use>
			<use xlink:href="#gentle-wave" x="48" y="7"></use>
		</g>
	</svg>
</template>

<script>
	export default {
		name: "Waves",
	};
</script>

<style scoped lang="scss">
	svg {
		height: 12vh;
		min-height: 3.125rem;
		max-height: 9.375rem;
		bottom: 0;
		left: 0;
		z-index: 1;
		use {
			animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
			&:nth-child(1) {
				animation-delay: -2s;
				animation-duration: 7s;
				fill: var(--waves4);
			}
			&:nth-child(2) {
				animation-delay: -3s;
				animation-duration: 10s;
				fill: var(--waves3);
			}
			&:nth-child(3) {
				animation-delay: -4s;
				animation-duration: 13s;
				fill: var(--waves2);
			}
			&:nth-child(4) {
				animation-delay: -5s;
				animation-duration: 20s;
				fill: var(--waves1);
			}
		}
		@keyframes move-forever {
			0% {
				transform: translate3d(-90px, 0, 0);
			}
			100% {
				transform: translate3d(85px, 0, 0);
			}
		}
	}
</style>
