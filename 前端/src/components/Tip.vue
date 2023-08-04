<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__bounceIn" leave-active-class="animate__bounceOut">
		<div class="j-a-center w-100" id="tip" v-if="isShow">
			<span>
				<i class="fa-regular fa-circle-xmark m-r-1" v-if="type == 'no'" />
				<i class="fa-regular fa-circle-check m-r-1" v-else />
				{{ title }}
			</span>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "Tip",
		data() {
			return {
				isShow: false,

				title: "",
				type: "yes",
			};
		},
		mounted() {
			//组件显示事件
			this.$bus.$on("tipShow", data => {
				this.title = data.title,
				this.type = data.type,

				this.isShow = true;
				setTimeout(() => {
					this.isShow = false;
				}, 2000);
			});
		},
		beforeDestroy() {
			this.$bus.$off("tipShow");
		},
	};
</script>

<style scoped lang="scss">
	#tip {
		z-index: 999;
		position: fixed;
		font-size: 0.875rem;
		top: 15%;
		> span {
			border-radius: 0.3125rem;
			padding: 0.6875rem 1.5rem;
			background-color: var(--tip-bg);
			color: var(--tip-color);
			i {
				color: var(--tip-i);
			}
		}
	}
</style>
