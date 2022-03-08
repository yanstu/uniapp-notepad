<template>
	<view><u-card @click="view(user.id)" thumb="../../static/user.png" v-for="user in userList" :title="user.username" sub-title="管理笔记"></u-card></view>
</template>

<script>
export default {
	data() {
		return {
			userList: ''
		};
	},
	onShow() {
		this.select();
	},
	methods: {
		view(userId) {
			uni.navigateTo({
				url: '/pages/manage/notelist?userId=' + userId
			});
		},
		select() {
			uni.showLoading({
				mask: true,
				title: '加载中'
			});
			this.$api.getUserList({
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						this.userList = res.data.data;
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

<style>
/deep/ .u-card__body {
	padding: 0 !important;
}
</style>
