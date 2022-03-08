import {
	request,
	synchro,
	baseUrl
} from './request.js';

export default {
	uploadFileUrl: baseUrl + 'common/upload',
	/**
	 * 登录
	 "data": {
        "createtime": "2022-03-07 20:57:58",
        "updatetime": null,
        "id": 2,
        "username": "test1",
        "password": null,
        "realname": "用户",
        "roleId": 3,
        "gender": "0",
        "phone": null,
        "aboutName": "test1",
        "parkChannel": null,
        "status": "1",
        "type": 3,
        "aboutId": 0,
        "parkId": null,
        "parkCode": null,
        "roleName": null,
        "role": {
            "createtime": "2021-07-19 15:21:13",
            "updatetime": "2021-07-19 15:21:13",
            "id": 3,
            "name": "user",
            "status": 1,
            "type": 3,
            "power": 2
        },
        "communityName": null
    }
	 */
	loginIn: obj => request(obj, 'login/loginIn', 'POST'),
	// 注销登录
	loginOut: obj => request(obj, 'login/loginOut', 'GET'),
	// 用户注册
	register: obj => request(obj, 'login/register', 'POST'),
	// 修改密码
	updatePwd: obj => request(obj, 'login/updatePwd', 'POST'),
	// 添加笔记
	addNote: obj => request(obj, 'notText/add', 'POST'),
	// 编辑笔记
	editNote: obj => request(obj, 'notText/edit', 'POST'),
	// 获取笔记列表
	getTextList: obj => request(obj, 'notText/getTextList', 'GET'),
	// 根据用户ID获取列表
	getUserText: obj => request(obj, 'notText/getUserText', 'GET'),
	// 根据笔记ID删除笔记
	delNote: obj => request(obj, 'notText/delete', 'GET'),
	// 获取用户列表
	getUserList: obj => request(obj, 'notText/userList', 'GET'),
	// 根据笔记ID查询笔记
	getById: obj => request(obj, 'notText/getById', 'GET'),
}

/*
	this.$api.login({
		data: {
			jsCode: '123456789'
		},
		success: res => {
			console.log(res);
		},
		complete: data => {
			无论如何都会执行
		}
	});
*/
