<script>
import Vue from 'vue';
import { formatDate } from '@/xin/utils/filters.js';
export default {
	data() {
		return {
			noteList: [],
			userInfo: '',
			remindTimer: null,
			uniNotification: null
		};
	},
	onLaunch() {
		// #ifdef APP-PLUS
		this.uniNotification = uni.requireNativePlugin('Ys-UniNotification');
		// #endif
		this.updateNoteRemind();
	},
	methods: {
		stopNoteRemind() {
			this.remindTimer && clearInterval(this.remindTimer);
		},
		updateNoteRemind() {
			this.userInfo = uni.getStorageSync('userInfo');
			if (!this.userInfo) {
				return;
			}
			this.$api.getUserText({
				data: {
					userId: this.userInfo.id
				},
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						this.noteList = res.data.data;
						this.remindTimer && clearInterval(this.remindTimer);
						this.remindTimer = setInterval(() => {
							var nowTime = formatDate(new Date());
							var tixing = this.noteList?.find(item => item.remindTime == nowTime);
							if (tixing) {
								// #ifdef APP-PLUS
								if (!this.uniNotification) return;
								let res = this.uniNotification.postNotification({
									title: '您设置的笔记提醒时间到了',
									text: tixing.name
								});
								if (res == 'success') {
									console.log('notification发送成功');
								} else {
									console.warn('notification发送失败，原因: ' + res);
								}
								// #endif
								uni.showModal({
									title: '您设置的笔记提醒时间到了',
									content: tixing.name,
									confirmText: '点击查看',
									success: res => {
										if (res.confirm) {
											uni.navigateTo({
												url: '/pages/note/viewnote?noteId=' + tixing.id
											});
										}
									}
								});
							}
						}, 1000);
					}
				}
			});
		}
	}
};
</script>

<style>
@import './xin/components/colorui/main.css';
@import './xin/components/colorui/icon.css';
@import './xin/components/colorui/animation.css';
</style>
<style lang="scss">
// @import './xin/common/common.scss';
@import 'uview-ui/index.scss';
</style>
