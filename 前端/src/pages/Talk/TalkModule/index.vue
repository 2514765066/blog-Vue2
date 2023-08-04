<template>
	<transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInUp" appear>
		<div class="d-flex" id="talkmodule">
			<i class="fa-solid fa-circle-user text-color"></i>

			<div class="box m-l-2">
				<span class="f-s-14 f-w-bold title-color">游客</span>
				<p class="title-color m-tb-2">{{ m.text }}</p>
				<span class="f-s-13 text-color">{{ m.time }}</span>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name: "TalkModule",
		props: ["m"],
	};
</script>

<style scoped lang="scss">
	#talkmodule {
		padding: 10px;
		border-bottom: 1px solid #eee;
		> i {
			font-size: 3rem;
		}
	}
	@media screen and (max-width: 480px) {
		#talkmodule {
			margin: 0 .625rem;
			.fa-circle-user {
				font-size: 35px !important;
			}
			p {
				margin: 0.3125rem 0 !important;
			}
		}
	}
</style>
