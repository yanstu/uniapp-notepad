// #ifdef APP-PLUS
import show_modal from './index.js'
// #endif
const showModal = {
	install: function(Vue) {
		Vue.prototype.$showModal = function(op = {}) {
			// #ifdef MP-WEIXIN || H5 || MP-ALIPAY
			uni.showModal(op);
			// #endif
			// #ifdef APP-PLUS
			let ssm = new show_modal({
				...op,
				$event: function(e) {
					op.success && op.success({
						confirm: e.types == 'confirm',
						cancel: e.types == 'cancel',
					});
				}
			})
			ssm.show();
			Vue.prototype.$hide = function() {
				ssm.hide();
			}
			// #endif
		}
	}
};

export default showModal
