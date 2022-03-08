exports.baseUrl = 'http://yanxin.vaiwan.com/api/'

exports.request = (obj = {}, api, method) => {
	if (!beforeRequest()) return
	let accessToken = uni.getStorageSync('userInfo').accessToken
	let url = this.baseUrl + api;
	let data = obj.data || {};
	let success = obj.success;
	let fail = obj.fail;
	let complete = obj.complete;
	let header = obj.header || {}
	header.accessToken = accessToken
	header['Content-Type'] = header.json ?
		'application/json' :
		'application/x-www-form-urlencoded; charset=UTF-8';
	if (obj.header)
		if (obj.header.json) delete obj.header.json
	uni.request({
		url,
		data,
		method: method.toUpperCase(),
		header,
		// 请求成功会执行
		success: (res) => {
			if (success) success(res)
		},
		// 请求失败会执行
		fail: err => {
			console.log(err);
			fail && fail(err)
		},
		//无论如何都会执行
		complete: (data) => {
			afterRequest()
			complete && complete(data)
		}
	})
}

// Promise
exports.synchro = (obj = {}, api, method) => {
	return new Promise((resolve, reject) => {
		this.request({
			url: obj.url,
			data: obj.data,
			method: obj.method,
			header: obj.header,
			success: (res) => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		}, api, method);
	});
}

// 请求前
function beforeRequest() {
	return true
}

// 请求后
function afterRequest() {
	uni.hideLoading()
}
