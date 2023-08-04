<template>
	<div id="dialog" class="p-fixed w-100v h-100v j-a-center f-c-title" v-if="isShow">
		<div>
			<div class="header d-flex j-between a-center">
				<span>{{ data.title }}</span>
				<i class="fa-solid fa-xmark" @click="dialogClose"></i>
			</div>
			<div class="body">
				<input :type="data.type" class="w-100" placeholder="不能为空" v-for="c of data.count" :key="c" v-model="inputData[c - 1]" @keyup.enter="sendData" />
			</div>
			<div class="footer d-flex j-end">
				<button class="yes" @click="sendData">确定</button>
				<button class="no m-l-2" @click="dialogClose">取消</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Dialog",
		data() {
			return {
				isShow: false,
				inputData: [],
				data: {
					count: 0,
					title: "",
					type: "text",
				},
			};
		},
		methods: {
			dialogClose() {
				//清空数组
				this.inputData = [];
				//隐藏整个组件
				this.isShow = false;
			},
			sendData() {
				//只能确定或者关闭
				if (this.data.count == 0) {
					this.data.func();
					this.dialogClose(); //关闭
					return;
				}

				//有输入的时候，不合法
				if (this.inputData.length == 0 || this.inputData[0].trim() == "") {
					this.$bus.$emit("tipShow", {
						title: "内容不能为空或空格",
						type: "no",
					});
					return;
				}

				//有输入的时候，合法
				if ((this.inputData.length = 1)) {
					this.data.func(this.inputData[0]);
				} else {
					this.data.func(this.inputData);
				}
				this.dialogClose(); //关闭
			},
		},
		mounted() {
			this.$bus.$on("dialogShow", data => {
				this.data = { ...this.data, ...data };
				this.isShow = true;
			});
		},
		beforeDestroy() {
			this.$bus.$off("dialogShow");
		},
	};
</script>

<style lang="scss" scoped>
	#dialog {
		top: 0;
		left: 0;
		z-index: 998;
		background-color: rgba(#000, 0.3);
		> div {
			width: 18.75rem;
			background-color: #fff;
			border-radius: 0.1875rem;
			.header {
				height: 3.125rem;
				padding: 1rem;
				border-bottom: 1px solid #f0f0f0;
			}
			.body {
				padding: 0 1rem 1rem;
				input {
					height: 2.25rem;
					border: 1px solid #e6e6e6;
					padding: 0 0.625rem;
					margin-top: 1rem;
				}
			}
			.footer {
				padding: 0 1rem 1rem;
				button {
					width: 3.75rem;
					height: 1.875rem;
				}
				.yes {
					background-color: #1e9fff;
					color: white;
				}
				.no {
					border: 1px solid #dedede;
				}
			}
		}
	}
</style>
