<template>
	<view>
		<view class="head">
			<view class="head-right"></view>
			<view class="head-info flex">
				<view class="info-avatar"><u-avatar size="130" src="https://tvyy.cn/pics/icon_default_head.png"></u-avatar></view>
				<view @click="toLogin" class="info-nickname">
					<view class="nickname">{{ userInfo ? userInfo.realname : '游客 去登录' }}</view>
				</view>
			</view>
		</view>
		<view class="body">
			<u-card @click="openUpdate" title="修改密码"></u-card>
			<u-card @click="logout" title="退出登录"></u-card>
		</view>
		<view class="cu-modal" :class="updatePwdModal ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改密码</view>
					<view class="action" @tap="updatePwdModal = false"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view>
					<view class="cu-form-group">
						<view class="title">旧密码：</view>
						<input placeholder="请输入密码" type="number" maxlength="16" name="input" v-model.trim="oldpassword" />
					</view>
					<view class="cu-form-group">
						<view class="title">新密码：</view>
						<input placeholder="请再次输入密码" type="number" maxlength="16" name="input" v-model.trim="newpassword" />
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="updatePwdModal = false">取消</button>
						<button class="cu-btn margin-left text-white" style="background: #308960 !important;border-radius: 5rpx;" @tap="updatePwd">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: '',
			updatePwdModal: false,
			oldpassword: '',
			newpassword: ''
		};
	},
	onShow() {
		this.userInfo = uni.getStorageSync('userInfo');
	},
	methods: {
		openUpdate() {
			if (!this.userInfo) {
				uni.showToast({
					title: '请先登录',
					icon: 'error'
				});
				return;
			}
			this.updatePwdModal = true;
		},
		toLogin() {
			if (this.userInfo) return;
			uni.navigateTo({
				url: 'login'
			});
		},
		logout() {
			if (!this.userInfo) {
				uni.showToast({
					title: '请先登录',
					icon: 'error'
				});
				return;
			}
			this.$api.loginOut({
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						uni.showToast({
							icon: 'success',
							title: '退出成功'
						});
						uni.removeStorageSync('userInfo');
						getApp().stopNoteRemind();
						this.userInfo = null;
						uni.reLaunch({
							url: '/pages/my/index'
						});
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'error'
						});
					}
				}
			});
		},
		updatePwd() {
			if (!this.userInfo) {
				uni.showToast({
					title: '请先登录'
				});
				uni.navigateTo({
					url: 'login'
				});
				return;
			}
			if (!this.oldpassword || !this.newpassword) {
				uni.showToast({
					title: '不能为空'
				});
				return;
			}
			this.$api.updatePwd({
				data: {
					id: this.userInfo.id,
					oldPwd: this.oldpassword,
					newPwd: this.newpassword,
					type: this.userInfo.roleId == 3 ? 2 : 1
				},
				success: res => {
					if (res.data.message.indexOf('成功') > -1) {
						uni.showToast({
							icon: 'success',
							title: '修改成功'
						});
					} else {
						console.log(res);
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
/deep/ .u-card__body {
	padding: 0 !important;
}
.head {
	width: 100%;
	height: 450rpx;
	background: url('https://img0.baidu.com/it/u=863435994,376429699&fm=253&fmt=auto&app=138&f=JPEG?w=1200&h=500') no-repeat center/cover;
	position: relative;
	.head-info {
		height: 150rpx;
		width: 100%;
		padding-top: 170rpx;
		padding-left: 50rpx;
		.info-avatar {
			height: 150rpx;
			padding: 10rpx;
			border-radius: 50%;
			border: 1px solid rgba($color: #f1f1f1, $alpha: 0.5);
		}
		.info-nickname {
			height: 130rpx;
			width: 60%;
			display: flex;
			flex-direction: column;
			color: #fff !important;
			justify-content: center;
			margin-left: 30rpx;
			.nickname {
				font-size: 40rpx;
				text-align: left;
			}
			.phone {
				font-size: 25rpx;
				margin-top: 5rpx;
			}
		}
	}
	.assets {
		position: absolute;
		bottom: -50rpx;
		height: 150rpx;
		background-color: #3259ce;
		border-radius: 15rpx;
		width: 92%;
		margin-left: 4%;
		box-shadow: 0px 0px 3px 1px rgba(81, 81, 81, 0.1);
		.assets-item {
			width: 33.3%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			color: #4f2b04;
			view {
				margin-top: 5rpx;
				font-size: 25rpx;
			}
		}
	}
}
.container {
	margin-top: 80rpx;
}
button {
	border-radius: 0;
	background: #fff !important;
}
</style>
