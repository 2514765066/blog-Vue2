<template>
	<div id="message" class="w-100v h-100v of-hidden j-a-center">
		<!-- 背景 -->
		<img src="/images/message.png" class="p-absolute img w-100v h-100v" />

		<!-- 留言区 -->
		<main class="j-a-center f-d-column w-100 p-relative">
			<!-- 初始化留言 -->
			<Barrage :title="m.msg" v-for="m of messages" :key="m.id" />

			<!-- 新发送的留言 -->
			<Barrage :title="nw" v-for="(nw, index) of newMessages" :key="-index" isNew="true" />

			<!-- 标题 -->
			<h1 class="m-b-4">留言板</h1>

			<!-- 输入和发送 -->
			<div class="d-flex">
				<transition-group name="animate__animated animate__bounce" enter-active-class="animate__bounceInRight" leave-active-class="animate__bounceOutRight" appear>
					<input type="text" placeholder="说点什么吧" maxlength="20" v-model="inputMessage" key="1" @keyup.enter="addMessage" />
					<button v-show="btnIsShow" class="m-l-2" key="2" @click="addMessage">发送</button>
				</transition-group>
			</div>
		</main>
	</div>
</template>

<script>
	import Barrage from "./Barrage";
	import { mapState } from "vuex";

	export default {
		name: "Message",
		components: { Barrage },
		computed: {
			...mapState({
				messages: state => state.message.messages,
			}),
		},
		data() {
			return {
				btnIsShow: false, //发送留言按钮
				inputMessage: "", //留言内容
				newMessages: [], //新发送的留言
			};
		},
		watch: {
			inputMessage(value) {
				if (value != "" && value.trim() != "") {
					this.btnIsShow = true;
				} else {
					this.btnIsShow = false;
				}
			},
		},
		methods: {
			btnState(boolen) {
				this.btnIsShow = boolen;
			},
			//添加留言
			addMessage() {
				if (this.btnIsShow == false) return;

				const data = this.inputMessage.trim();
				//调用添加函数
				this.$store.dispatch("message/postData", data).then(() => {
					//提示
					this.$bus.$emit("tipShow", {
						title: "留言成功",
					});
					//添入数组
					this.newMessages.push(this.inputMessage);
					//清空内容
					this.inputMessage = "";
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	#message {
		color: #fff;
		img {
			filter: brightness(90%) contrast(80%);
		}
		> main {
			height: calc(100vh - 6.25rem);
			z-index: 998;
			input {
				width: 15.625rem;
				height: 2.5rem;
				border: 2px solid #fff;
				border-radius: 1.25rem;
				color: #fff;
				padding: 0 1.25rem;
				font-size: 17px;
				&::placeholder {
					color: #eee;
				}
			}
			button {
				height: 2.5rem;
				border: 2px solid #fff;
				border-radius: 1.25rem;
				color: #fff;
				padding: 0 1.25rem;
				font-size: 17px;
			}
		}
	}
</style>
