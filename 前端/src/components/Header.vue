<template>
	<header class="p-relative j-a-center h-70v">
		<img :src="url || src" class="img" />
		<div class="box j-a-center">
			<h1 class="m-b-3">{{ title }}</h1>
			<div>
				<slot></slot>
			</div>
		</div>
		<Waves />
	</header>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "Header",
		props: ["title", "url"],
		computed: {
			...mapState(["theme"]),
			src() {
				if (this.theme == "light") return "/images/bg1-l.png";
				else return "/images/bg1-d.png";
			},
		},
	};
</script>

<style lang="scss" scoped>
	header {
		z-index: -1;
		> img {
			position: fixed;
			width: 100%;
			height: 70vh;
			user-select: none;
		}
		> div {
			width: 100%;
			text-align: center;
			color: #fff;
			position: fixed;
			h1 {
				font-size: 45px;
				letter-spacing: 8px;
			}
			span {
				font-size: 14px;
				margin: 0 5px;
			}
		}
	}
</style>
