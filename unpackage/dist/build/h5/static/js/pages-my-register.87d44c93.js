(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-register"],{"239c":function(t,e,a){var i=a("ee17");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("0fc80253",i,!0,{sourceMap:!1,shadowMode:!1})},7769:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",[a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[t._v("账号：")]),a("v-uni-input",{attrs:{placeholder:"请输入账号",maxlength:"11",name:"input"},model:{value:t.username,callback:function(e){t.username="string"===typeof e?e.trim():e},expression:"username"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[t._v("密码：")]),a("v-uni-input",{attrs:{placeholder:"请输入密码",maxlength:"16",name:"input"},model:{value:t.password,callback:function(e){t.password="string"===typeof e?e.trim():e},expression:"password"}})],1),a("v-uni-view",{staticClass:"cu-form-group"},[a("v-uni-view",{staticClass:"title"},[t._v("确认密码：")]),a("v-uni-input",{attrs:{placeholder:"请再次输入密码",maxlength:"16",name:"input"},model:{value:t.repassword,callback:function(e){t.repassword="string"===typeof e?e.trim():e},expression:"repassword"}})],1),a("v-uni-button",{staticClass:"cu-btn block bg-blue margin-top-lg lg margin-left margin-right",attrs:{disabled:t.loading,loading:t.loading},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[a("v-uni-text",{staticClass:"padding-left-sm"},[t._v("注册")])],1),a("v-uni-view",{staticClass:"text-sm padding text-gray"},[t._v("注册账号后自动登录")])],1)],1)},s=[]},a5d5:function(t,e,a){"use strict";var i=a("239c"),n=a.n(i);n.a},b5e6:function(t,e,a){"use strict";a("c975"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{username:"",loading:!1,password:"",repassword:""}},methods:{submit:function(){var t=this;this.username&&this.password&&this.repassword?this.password==this.repassword?(this.loading=!0,this.$api.register({data:{username:this.username,password:this.password},success:function(e){e.data.message.indexOf("成功")>-1?(uni.showToast({icon:"success",title:"注册成功"}),uni.showLoading({mask:!0,title:"正在登录..."}),t.$api.loginIn({data:{username:t.username,password:t.password},success:function(t){t.data.message.indexOf("成功")>-1?(uni.showToast({icon:"success",title:"登录成功"}),uni.setStorageSync("userInfo",t.data.data),setTimeout((function(){uni.switchTab({url:"/pages/my/index"})}),500)):uni.showToast({title:t.data.message,icon:"error"})}})):uni.showToast({title:e.data.message,icon:"error"})}})):uni.showToast({title:"两次密码不一样"}):uni.showToast({title:"用户名或密码为空"})}}};e.default=i},e48b:function(t,e,a){"use strict";a.r(e);var i=a("b5e6"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);e["default"]=n.a},ee17:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.loginLoading[data-v-3df55420]{background-color:#c46217}.zaiui-user-login-avatar-view[data-v-3df55420]{position:relative;display:flex;align-items:center;justify-content:center;margin-top:%?230.18?%}.zaiui-user-login-avatar-view .cu-avatar[data-v-3df55420]{width:%?250?%;height:%?250?%}.zaiui-btn-view[data-v-3df55420]{position:relative;margin-top:%?72.72?%;padding:0 %?45.45?%}.zaiui-btn-view .cu-btn .icon[data-v-3df55420]{position:relative;font-size:%?47.27?%;right:%?9.09?%;top:%?-3.63?%}.zaiui-agreement-checked-view[data-v-3df55420]{position:relative;padding:%?27.27?% %?25.45?%}.zaiui-agreement-checked-view .zaiui-checked[data-v-3df55420]{position:absolute;-webkit-transform:scale(.7);transform:scale(.7)}.zaiui-agreement-checked-view .text-black-view[data-v-3df55420]{padding-left:%?10.54?%;line-height:%?47.27?%}.zaiui-foot-ad-view[data-v-3df55420]{position:fixed;text-align:center;bottom:%?122.72?%;width:100%}',""]),t.exports=e},fc60:function(t,e,a){"use strict";a.r(e);var i=a("7769"),n=a("e48b");for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);a("a5d5");var o,r=a("f0c5"),u=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"3df55420",null,!1,i["a"],o);e["default"]=u.exports}}]);