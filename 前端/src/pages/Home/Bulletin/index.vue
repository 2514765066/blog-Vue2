<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" appear>
		<div id="bulletin" class="box-border">
			<div class="f-s-20 m-b-2 title-color">
				<i class="fa-solid fa-bullhorn fa-shake m-r-2" />
				<span>公告</span>
			</div>
			<div class=" title-color">{{ abouts.bulletin }}</div>
		</div>
	</transition>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "Bulletin",
		computed: {
			...mapState({
				abouts: state => state.about.abouts,
			}),
		},
	};
</script>

<style lang="scss" scoped>
	#bulletin {
		padding: 1rem;
		div {
			overflow-wrap: break-word;
			line-height: 25px;
			i {
				color: var(--yellow);
			}
		}
	}
</style>
