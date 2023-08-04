<template>
	<div id="app" class="theme-light" ref="app">
		<router-view></router-view>
		<PcNav v-if="!isMobile()" />
		<Info />
		<Permissions />
		<Dialog />
		<Tip />
	</div>
</template>

<script>
	import PcNav from "@/components/PcNav";
	import Info from "@/components/Info";
	import Dialog from "@/components/Dialog";
	import Tip from "@/components/Tip";
	import Permissions from "@/components/Permissions";
	import { mapState } from "vuex";

	export default {
		name: "App",
		components: { PcNav, Permissions, Dialog, Tip, Info },
		computed: {
			...mapState(["theme"]),
		},
		watch: {
			theme(value) {
				if (value == "light") {
					this.$refs.app.className = "theme-light";
				} else {
					this.$refs.app.className = "theme-dark";
				}
			},
		},
		created() {
			this.$store.dispatch("writing/getData");
			this.$store.dispatch("say/getData");
			this.$store.dispatch("talk/getData");
			this.$store.dispatch("message/getData");
			this.$store.dispatch("about/getData");
		},
	};
</script>

<style lang="scss">
	:root {
		--orange: #cd9a3c;
		--pink: #e9546b;
		--blue: #7575d9;
		--warn: #ff5722;
		--yellow: #bcbc2d;
		--border: #ccc;
		--green: #31cb31;
		--cyan: #9cd0ed;
		--red: #ff0000;
		--mask: rgba(0, 0, 0, 0.3);
	}
	.theme-light {
		--bg: #fff;
		--bg-l: #eee;
		--border: #ccc;
		--title-color: #333;
		--subtitle-color: #666;
		--text-color: #999;
		--shadow: rgba(0, 0, 0, 0.1);
		--hovershadow: rgba(0, 0, 0, 0.2);
		--tip-bg: rgba(0, 0, 0, 0.6);
		--tip-color: #fff;
		--tip-i: #fff;
		--waves1: rgba(253, 253, 253);
		--waves2: rgba(253, 253, 253, 0.3);
		--waves3: rgba(253, 253, 253, 0.5);
		--waves4: rgba(253, 253, 253, 0.7);
		--permissions-bg: rgb(117, 117, 217, 0.9);
		--permissions-color: #fff;
	}
	.theme-dark {
		--bg: #222;
		--bg-l: #21252b;
		--border: #444;
		--title-color: #aaa;
		--subtitle-color: #aaa;
		--text-color: #aaa;
		--shadow: rgba(0, 0, 0, 0.6);
		--hovershadow: #000;
		--tip-bg: #fff;
		--tip-color: #333;
		--tip-i: rgb(49, 203, 49);
		--waves1: #222;
		--waves2: rgba(34, 34, 34, 0.3);
		--waves3: rgba(34, 34, 34, 0.5);
		--waves4: rgba(34, 34, 34, 0.7);
		--permissions-bg: rgba(0, 0, 0, 0.9);
		--permissions-color: rgba(255, 255, 255, 0.6);
	}
	* {
		&::-webkit-scrollbar {
			width: 0px;
		}
	}
	.box-border {
		border-radius: 0.5rem;
		box-shadow: 0 0 10px var(--shadow);
		transition: 0.5s box-shadow;
		&:hover {
			box-shadow: 0 0 20px var(--hovershadow);
		}
	}
	.box-border-down {
		border-radius: 0.5rem;
		box-shadow: 0 0.625rem 1.875rem -0.9375rem var(--shadow);
		transition: 0.5s box-shadow;
		&:hover {
			box-shadow: 0 0 20px var(--hovershadow);
		}
	}
	.title-color {
		color: var(--title-color);
	}
	.text-color {
		color: var(--text-color);
	}
	.subtitle-color {
		color: var(--subtitle-color);
	}
	.bg-color {
		color: var(--bg);
	}
	.name-color {
		color: var(--orange);
	}
</style>
