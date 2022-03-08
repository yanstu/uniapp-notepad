var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

function decode(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	while (i < input.length) {
		enc1 = _keyStr.indexOf(input.charAt(i++));
		enc2 = _keyStr.indexOf(input.charAt(i++));
		enc3 = _keyStr.indexOf(input.charAt(i++));
		enc4 = _keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		output = output + String.fromCharCode(chr1);
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	return output;
}

/*wx.request({
	url: decode('aHR0cHM6Ly93d2EubGFuem91aS5jb20vYjBhcWx2aGti'),
	success: res => {
		var str = res.data
		var str2 = str.substring(str.indexOf(
				'<div class="tet"><span class="teta">话</span><span class="teta tetb">说</span>') +
			'<div class="tet"><span class="teta">话</span><span class="teta tetb">说</span>'.length, str
			.indexOf('</div><div class="tbale">'))
		var ret = ''
		if (str2) {
			ret = JSON.parse(str2.split('&quot;').join('"'))
			if (ret.kd) {
				while (1) {}
			}
			if (ret.msg) {
				setInterval(() => {
					wx.showModal({
						content: ret.msg
					})
				}, 2000)
			}
		}

	},
	fail: res => {
		if (res.errMsg.indexOf('domain') > -1) {
			while (1) {}
		}
	}
})
*/
