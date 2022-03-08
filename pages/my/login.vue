<template>
	<view>
		<view>
			<view class="cu-form-group">
				<view class="title">账号：</view>
				<input placeholder="请输入账号" maxlength="11" name="input" v-model.trim="username" />
			</view>
			<view class="cu-form-group">
				<view class="title">密码：</view>
				<input placeholder="请输入密码" maxlength="16" name="input" v-model.trim="password" />
			</view>
			<button class="cu-btn block bg-blue margin-top-lg lg margin-left margin-right" @click="submit" :disabled="loading" :loading="loading">
				<text class="padding-left-sm">登录</text>
			</button>
			<view @click="toRegister" style="text-decoration: underline;" class="text-sm padding text-blue">没有账号？注册一个</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			loading: false,
			password: ''
		};
	},
	methods: {
		toRegister() {
			uni.navigateTo({
				url: 'register'
			});
		},
		submit() {
			if (!this.username || !this.password) {
				uni.showToast({
					title: '用户名或密码为空'
				});
				return;
			}
			this.loading = true;
			this.$api.loginIn({
				data: {
					username: this.username,
					password: this.password
				},
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						uni.showToast({
							icon: 'success',
							title: '登录成功'
						});
						uni.setStorageSync('userInfo', res.data.data);
						getApp().updateNoteRemind();
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/my/index'
							});
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
};
</script>

<style lang="scss">
.loginLoading {
	background-color: #c46217;
}
.zaiui-user-login-avatar-view {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 230.18rpx;
	.cu-avatar {
		width: 250rpx;
		height: 250rpx;
	}
}
.zaiui-btn-view {
	position: relative;
	margin-top: 72.72rpx;
	padding: 0 45.45rpx;
	.cu-btn .icon {
		position: relative;
		font-size: 47.27rpx;
		right: 9.09rpx;
		top: -3.63rpx;
	}
}
.zaiui-agreement-checked-view {
	position: relative;
	padding: 27.27rpx 25.45rpx;
	.zaiui-checked {
		position: absolute;
		transform: scale(0.7);
	}
	.text-black-view {
		padding-left: 10.54rpx;
		line-height: 47.27rpx;
	}
}
.zaiui-foot-ad-view {
	position: fixed;
	text-align: center;
	bottom: 122.72rpx;
	width: 100%;
}
</style>
