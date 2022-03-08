<template>
	<view class="padding-bottom">
		<view>
			<u-card v-for="note in noteList" :title="note.name" :sub-title="note.updatetime" thumb="../../static/note.png">
				<view @tap="viewNote(note.id)" slot="body">
					<view class="u-body-item u-flex u-col-between u-p-t-0"><u-parse :html="note.content"></u-parse></view>
				</view>
				<view class="flex align-center justify-end" slot="foot">
					<text @tap.stop="editNote(note.id)" class="cuIcon-write text-blue margin-right padding-left-sm">编辑</text>
					<text @tap.stop="delNote(note.id)" class="cuIcon-delete text-red padding-left-sm">删除</text>
				</view>
			</u-card>
		</view>
		<Drag v-if="userInfo && userInfo.roleId != 3" @dragClick="dragClick" creatTop="100" creatLeft="100" image="../../static/guanli.png" imageWidth="50%"></Drag>
	</view>
</template>

<script>
import Drag from '@/components/drag/drag.vue';
export default {
	data() {
		return {
			userInfo: '',
			noteList: ''
		};
	},
	components: {
		Drag
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
		if (!this.userInfo) {
			uni.showToast({
				title: '请先登录',
				icon: 'error'
			});
			uni.switchTab({
				url: '/pages/my/index'
			});
			return;
		}
		this.select();
	},
	methods: {
		viewNote(noteId) {
			uni.navigateTo({
				url: '/pages/note/viewnote?noteId=' + noteId
			});
		},
		editNote(noteId) {
			uni.navigateTo({
				url: '/pages/note/editnote?noteId=' + noteId
			});
		},
		delNote(id) {
			uni.showModal({
				content: '确定删除这条笔记吗？',
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
		dragClick() {
			uni.navigateTo({
				url: 'userlist'
			});
		},
		select() {
			uni.showLoading({
				mask: true,
				title: '加载中...'
			});
			this.$api.getUserText({
				data: {
					userId: this.userInfo.id
				},
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						this.noteList = res.data.data;
						this.noteList.forEach(item => {
							var msg = item.content.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
							msg = msg.replace(/[|]*\n/, ''); //去除行尾空格
							item.content = msg.replace(/&nbsp;/gi, ''); //去掉nbsp
						});
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
