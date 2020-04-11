
import toolUtil from './toolUtil'
import Vue from 'vue'
//获取应用实例    

exports.get = function(funName, obj, callback) {
	let  token = uni.getStorageSync("token");
	uni.request({
		url: 'http://food-edu.net' + funName,
		data: obj,
		header: {
			'content-type': 'application/json' ,// 默认值
			'Authorization' : "Bearer" + ' ' + token
		},
		success: function(res) {
			console.log(res.data);
			callback(res.data);
		}
	})
}

exports.get1 = function(funName, obj, callback) {
	let  token = uni.getStorageSync("token");
	uni.request({
		url: 'http://food-edu.net' + funName + obj,
		header: {
			'content-type': 'application/json' ,// 默认值
			'Authorization' : "Bearer" + ' ' + token
		},
		success: function(res) {
			console.log(res.data);
			callback(res.data);
		}
	})
}
exports.post2 = function(funName, _data, callback, failCallBack = null, type = 0, _complete = null, log = true) {
	console.log("请求http：" +'http://food-edu.net' + funName, _data);
	let  token = uni.getStorageSync("token");
	if (token) {
		_data.token = token;
	}
	uni.request({
		url: 'http://food-edu.net' + funName,
		data: _data,
		method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
		header: {
			'content-type': 'application/x-www-form-urlencoded'
			
		}, // 设置请求的 header
		success: function(res) {
			if (log)
				console.log("返回http：" + 'http://food-edu.net/' + funName, res.data);
			if (res.data.code == 200) {
				callback(res.data);
			}else {
				if (res.data.msg) {
					toolUtil.showToast(res.data.msg, 1500);
				}
				if (failCallBack != null) {
					failCallBack(res.data);
				}
			}
		},
		fail: function(err) {
			console.log(err);
		},
		complete: function() {
			if (_complete != null)
				_complete();
		}
	})
}


exports.post4 = function(url, data, successCallback = null, failCallBack = null, type = 0) {
	console.log("请求http：" + url, data);
	let  token = uni.getStorageSync("token");
	if (token) {
		data.token = token;
	}
	uni.request({
		url: (type == 0 ? (localconfig.httpurl + url) : url),
		data: data,
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		success: function(rs) {
			if(rs.data.code == 1){
				successCallback(rs.data)
			}
			if(rs.data.code == 0){
				if (failCallBack != null) {
					failCallBack(rs.data)
				} else {
					toolUtil.showToast(rs.data.msg);
				}
			}
		},
		fail: function(err) {
			console.log('fail:' + err);
		},
		complete: function() {
			
		}
	})
}