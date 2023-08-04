<template>
	<transition name="animate__animated animate__bounce animate__faster 50ms" enter-active-class="animate__slideInRight" leave-active-class="animate__slideOutRight" @after-enter="maskShow" @before-leave="maskClose" appear>
		<div v-if="isShow" id="info" class="d-flex j-end" @click.self="infoClose" ref="mask">
			<section>
				<Mine />
				<PcNav />
			</section>
		</div>
	</transition>
</template>

<script>
	import Mine from "@/components/Mine";
	import PcNav from "@/components/PcNav";

	export default {
		name: "Info",
		components: { Mine, PcNav },
		data() {
			return {
				isShow: false,
			};
		},
		methods: {
			infoClose() {
				this.isShow = false;
			},
			maskShow() {
				this.$refs.mask.style.backgroundColor = "var(--mask)";
			},
			maskClose() {
				this.$refs.mask.style.backgroundColor = "transparent";
			},
		},
		mounted() {
			this.$bus.$on("infoShow", () => {
				this.isShow = true;
			});
		},
	};
</script>

<style scoped lang="scss">
	#info {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 998;
		background-color: transparent;
		> section {
			width: 15rem;
			height: 100%;
			background-color: var(--bg);
			overflow: auto;
		}
	}
</style>
