var obj = {}

// 防抖动，防重复提交，防重复
export const debounce = function(e = {}) {
	if (!obj[e.key]) {
		obj[e.key] = true;
		e.success && e.success();
		if (!e.time) e.time = 2000
		setTimeout(() => {
			delete obj[e.key]
		}, e.time)
	} else {
		if (e.errmsg) {
			uni.showToast({
				title: e.errmsg,
				icon: 'none'
			})
		}
		e.fail && e.fail()
	}
}

/*
this.$tool.debounce({
	key: '方法名字',
	errmsg: '请勿重复点击',
	success: () => {}
})
*/

/*this.$tool.debounce({
	key: '方法名字',
	time: 3000,
	success: () => {},
	fail: () => {
		this.$refs.uToast.show({
			title: '请勿连续点击下单',
			type: 'error'
		});
	}
});*/


// 获取定位
export const getLocation = () => {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN
		uni.authorize({
			scope: 'scope.userLocation',
			success: (res) => {
				uni.getLocation({
					type: 'gcj02',
					success: result => {
						uni.setStorageSync('lat',
							result.latitude);
						uni.setStorageSync('lot',
							result.longitude);
						resolve()
					},
					fail: (res) => {
						this.$showModal({
							title: '提示',
							content: '请先开启手机GPS定位',
							confirmText: '确定'
						});
						reject();
					}
				});
			},
			fail: (res) => {
				this.$showModal({
					title: '授权失败',
					content: '天弘数科需要获取你的地理位置，请在设置界面打开相关权限，不授权将无法使用。',
					confirmText: '设置',
					success: res => {
						if (res.confirm) {
							uni.openSetting({
								success: (data) => {
									if (data.authSetting[
											"scope.userLocation"
										] ===
										true) {
										uni.showToast({
											title: '授权成功',
											icon: 'success',
											duration: 1000,
										})
										uni.authorize({
											scope: 'scope.userLocation',
											success: res => {
												uni.getLocation({
													type: 'gcj02',
													success: result => {
														uni.setStorageSync(
															'lat',
															result
															.latitude
														);
														uni.setStorageSync(
															'lot',
															result
															.longitude
														);
													},
													fail: (
														res
													) => {
														this.$showModal({
															title: '提示',
															content: '请先开启手机GPS定位',
															confirmText: '确定'
														});
														reject
															();
													}
												});
											},
										})
										resolve()
									} else {
										uni.showToast({
											title: '授权失败',
											icon: 'none',
											duration: 1000,
										})
										reject();
									}
								}
							})
						}
					}
				})
			}
		});
		// #endif
		// #ifdef MP-ALIPAY
		uni.getLocation({
			success: res => {
				uni.setStorageSync('lat',
					res.latitude);
				uni.setStorageSync('lot',
					res.longitude);
				resolve()
			},
			fail: res => {
				switch (parseInt(res.extError)) {
					case 12:
						my.showAuthGuide({
							authType: 'LBS',
							success: (res) => {},
							fail: (error) => {
								my.alert({
									content: '不授权定位，将无法正常使用。',
								});
								reject();
							},
						});
						break
				}
				reject();
			}
		});
		// #endif
		// #ifdef APP-PLUS
		uni.getLocation({
			success: res => {
				uni.setStorageSync('lat',
					res.latitude);
				uni.setStorageSync('lot',
					res.longitude);
				resolve()
			},
			fail: res => {
				/*this.$showModal({
					content: JSON.stringify(res),
				});*/
				reject();
			}
		});
		// #endif
	})
}
