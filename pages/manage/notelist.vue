<template>
	<view class="padding-bottom">
		<view>
			<u-card v-for="note in noteList" :title="note.name" :sub-title="note.updatetime" thumb="../../static/note.png">
				<view @click="viewNote(note.id)" class="" slot="body">
					<view class="u-body-item u-flex u-col-between u-p-t-0"><u-parse :html="note.content"></u-parse></view>
				</view>
				<view class="flex align-center justify-end" slot="foot"><text @click="delNote(note.id)" class="cuIcon-delete text-red padding-left-sm">删除</text></view>
			</u-card>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userId: '',
			noteList: ''
		};
	},
	onLoad(option) {
		this.userId = option.userId;
		this.select();
	},
	methods: {
		viewNote(noteId) {
			uni.navigateTo({
				url: '/pages/note/viewnote?noteId=' + noteId
			});
		},
		delNote(id) {
			uni.showModal({
				content: '确定删除用户的这条笔记吗？',
				success: res => {
					if (res.confirm) {
						uni.showLoading({
							mask: true,
							title: '加载中...'
						});
						this.$api.delNote({
							data: {
								id
							},
							success: res => {
								if (res.data.message.indexOf('成功') > -1) {
									uni.showToast({
										icon: 'success',
										title: '删除成功'
									});
									getApp().updateNoteRemind();
									setTimeout(() => {
										this.select();
									}, 500);
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
			});
		},
		select() {
			uni.showLoading({
				mask: true,
				title: '加载中...'
			});
			this.$api.getUserText({
				data: {
					userId: this.userId
				},
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						this.noteList = res.data.data;
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

<style scoped lang="scss">
.u-card-wrap {
	background-color: $u-bg-color;
	padding: 1px;
}

.u-body-item {
	font-size: 32rpx;
	color: #333;
	padding: 20rpx 10rpx;
}

.u-body-item image {
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
	border-radius: 8rpx;
	margin-left: 12rpx;
}
</style>
