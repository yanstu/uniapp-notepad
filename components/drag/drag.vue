<template>
	<view
		class="content"
		@click="dragClick"
		:style="{ right: right + 'upx', bottom: bottom + 'upx', backgroundColor: background }"
	>
		<image :src="image" mode="widthFix" :style="{ width: imageWidth }" v-if="image"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			right: '280',
			bottom: '500',
			isdrag: false,
			NowLeft: '',
			disX: '',
			NowTop: '',
			disY: ''
		};
	},
	mounted() {
		this.bottom = this.creatTop;
		this.right = this.creatLeft;
	},
	props: ['creatTop', 'creatLeft', 'image', 'background', 'imageWidth'],
	methods: {
		dragClick() {
			this.$emit('dragClick');
		}
	}
};
</script>

<style scoped>
.content {
	width: 120rpx;
	height: 120rpx;
	border-radius: 50%;
	background-color: rgb(56, 128, 255);
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
	z-index: 5;
	overflow: hidden;
}
.content image {
	width: 40%;
}
</style>
