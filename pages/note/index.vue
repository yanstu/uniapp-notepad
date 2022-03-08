<template>
	<view>
		<view class="cu-form-group">
			<view class="title">标题</view>
			<input placeholder="请输入标题" v-model="noteDetail.name" name="input" />
		</view>
		<view @click.stop="timeShow = !timeShow" class="cu-form-group justify-start">
			<view class="title">提醒</view>
			<view class="tixing_content">{{ noteDetail.remindTime || '设置提醒（可选）' }}</view>
		</view>
		<view @click.stop="openPicker" class="cu-form-group align-center justify-start" style="padding-top: 20rpx;padding-bottom: 20rpx;">
			<view class="title">视频附件</view>
			<view class="video_box flex align-center justify-center" style="overflow: hidden;">
				<video style="width: 100%;height: 100%;" v-if="noteDetail.videoSrc" :src="noteDetail.videoSrc" controls></video>
				<image v-else src="@/static/addvideo.png" style="height:70rpx;width:70rpx"></image>
			</view>
		</view>
		<jinEdit v-if="refEditor" placeholder="请输入内容" :html="noteDetail.content" @editOk="submit" :uploadFileUrl="$api.uploadFileUrl"></jinEdit>
		<time-picker ref="timePic" :params="timeFormat" :defaultTime="noteDetail.remindTime" beginDate="2022-03" endDate="2023" v-model="timeShow" @confirm="timeConfirm" />
		<nk-select-file @confirm="selectVideo" :filterArr="['mp4']" v-model="videoPicker"></nk-select-file>
	</view>
</template>

<script>
import jinEdit from '@/components/jin-edit/jin-edit.vue';
import timePicker from '@/components/time-picker/time-picker.vue';
import nkSelectFile from '@/components/nk-select-file/nk-select-file.vue';
import { formatDate } from '@/xin/utils/filters.js';
export default {
	data() {
		return {
			userInfo: '',
			defaultTime: '',
			timeFormat: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: true
			},
			videoDetail: '',
			timeShow: false,
			videoPicker: false,
			noteDetail: {
				videoSrc: '',
				content: '',
				remindTime: '',
				name: '',
				userId: ''
			},
			refEditor: false
		};
	},
	components: {
		jinEdit,
		timePicker,
		nkSelectFile
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
		this.noteDetail.userId = this.userInfo.id;
		this.refEditor = true;
	},
	methods: {
		openPicker() {
			this.videoPicker = true;
		},
		selectVideo(e) {
			if (e) {
				this.videoDetail = e[0];
				this.noteDetail.videoSrc = e[0].url;
			}
		},
		submit(res) {
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
			if (!this.noteDetail.name) {
				uni.showToast({
					title: '请输入标题',
					icon: 'error'
				});
				return;
			}
			this.noteDetail.content = res.html;
			uni.showLoading({
				mask: true,
				title: '加载中...'
			});
			var imgUrl = '';
			res?.delta?.ops?.forEach(item => {
				if (item.insert.image) imgUrl = item.insert.image;
			});
			var data = {
				userId: this.userInfo.id,
				remindTime: this.noteDetail.remindTime,
				name: this.noteDetail.name,
				content: this.noteDetail.content,
				videoSrc: this.noteDetail.videoSrc,
				imgUrl
			};
			this.$api.addNote({
				data,
				header: {
					json: true
				},
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						uni.showToast({
							icon: 'success',
							title: '添加成功'
						});
						this.refEditor = false;
						this.noteDetail = {
							videoSrc: '',
							content: '',
							remindTime: '',
							name: ''
						};
						setTimeout(() => {
							this.refEditor = true;
						}, 100);
						this.noteDetail.userId = this.userInfo.id;
						getApp().updateNoteRemind();
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'error'
						});
					}
				}
			});
		},
		timeConfirm(e) {
			this.noteDetail.remindTime = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}:${e.second}`;
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
	width: 480rpx;
	height: 200rpx;
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
