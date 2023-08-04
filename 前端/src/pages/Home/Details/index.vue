<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" appear>
		<div id="comment" class="box-border title-color)">
			<div class="f-s-20 m-b-2">
				<i class="fa-solid fa-chart-simple m-r-2 f-c-subtitle" />
				<span class="title-color">博客详情</span>
			</div>
			<div class="title-color">
				<div class="d-flex j-between m-tb-2">
					<span>运行时长</span>
					<span>{{ runTime }}</span>
				</div>
				<div class="d-flex j-between m-tb-2">
					<span>文章数目</span>
					<span>{{ writings.length }}</span>
				</div>
				<div class="d-flex j-between m-tb-2">
					<span>留言数量</span>
					<span>{{ messages.length }}</span>
				</div>
				<div class="d-flex j-between m-tb-2">
					<span>说说数量</span>
					<span>{{ talks.length }}</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "Details",
		computed: {
			...mapState({
				writings: state => state.writing.writings,
				messages: state => state.message.messages,
				talks: state => state.talk.talks,
			}),
		},
		data() {
			return {
				runTime: "",
			};
		},
		mounted() {
			setInterval(() => {
				var date1 = new Date(2023, 6, 15, 8, 0, 0);
				var diff = new Date().getTime() - date1.getTime();
				var days = Math.floor(diff / (1000 * 60 * 60 * 24));
				var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((diff % (1000 * 60)) / 1000);
				this.runTime = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
			}, 1000);
		},
	};
</script>

<style scoped lang="scss">
	#comment {
		padding: 1rem;
	}
</style>
