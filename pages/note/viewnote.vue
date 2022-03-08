<template>
	<view>
		<view class="cu-form-group">
			<view class="title">标题</view>
			<input disabled v-model="noteDetail && noteDetail.name" name="input" />
		</view>
		<view class="cu-form-group justify-start">
			<view class="title">提醒时间</view>
			<view class="tixing_content">{{ (noteDetail && noteDetail.remindTime) || '未设置提醒' }}</view>
		</view>
		<view v-if="noteDetail && noteDetail.videoSrc" class="cu-form-group align-center justify-start" style="padding-top: 20rpx;padding-bottom: 20rpx;">
			<view class="title">视频附件</view>
			<view class="video_box flex align-center justify-center" style="overflow: hidden;">
				<video style="width: 100%;height: 100%;" :src="noteDetail && noteDetail.videoSrc" controls></video>
			</view>
		</view>
		<view class="padding"><u-parse :html="noteDetail && noteDetail.content"></u-parse></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			noteDetail: '',
			noteId: ''
		};
	},
	onLoad(option) {
		this.noteId = option.noteId;
		this.select();
	},
	methods: {
		select() {
			uni.showLoading({
				mask: true,
				title: '加载中...'
			});
			this.$api.getById({
				data: {
					id: this.noteId
				},
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						this.noteDetail = res.data.data;
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'error'
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.line {
	height: 1rpx;
	background-color: rgba(0, 0, 0, 0.3);
	width: 95%;
	margin: 0 auto;
}
.video_box {
	border: 2px solid #e5e5e5;
	width: 180rpx;
	height: 180rpx;
}
.tixing_content {
	height: 50%;
	max-width: 90%;
	background: #35a6e0;
	border-radius: 10rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 7rpx 40rpx;
	color: white;
}
.zu {
	height: 100rpx;
	display: flex;
	line-height: 100rpx;
	padding: 0 20rpx;
	align-items: center;
}
</style>
