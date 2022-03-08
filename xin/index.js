// 常用的字符串操作
import * as filters from './utils/filters.js'
// 统一app和小程序弹窗
import show_modal from './components/show_modal/show_modal.js'
// api统一管理
import api from './api/index.js';
// colorui封装的顶部导航栏
import cuCustom from './components/colorui/components/cu-custom.vue'
// 工具集合
import * as tool from './utils/tool.js'


const install = Vue => {
	Vue.prototype.$api = api
	Vue.prototype.$tool = Object.assign(filters, tool)
	Vue.use(show_modal)
	Vue.component('cu-custom', cuCustom)
	Object.keys(filters).forEach(key => {
		Vue.filter(key, filters[key])
	})
}

export default install
