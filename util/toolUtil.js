import httpUtil from './httpUtil'
import localconfig from './localconfig'
import store from '../store/index.js'
// #ifdef APP-PLUS
import shanyan from "../common/shanyan"
const chuanshanjia = uni.requireNativePlugin('chuanshanjia');
// #endif

exports.wxShare2 = function(obj) {
	if (!obj)
		obj = {};

	if (!obj.invitor)
		obj.invitor = this.getTuanzhangid();
	if (!obj.version)
		obj.version = '1.0.0';

	if (!obj.imgUrl)
		obj.imgUrl = 'https://static.ktx0753.com/client/static/zhuye.png'
	if (!obj.desc)
		obj.desc = "岛音提供海量优惠券，买东西省钱又赚钱";
	if (!obj.title)
		obj.title = "岛音，省钱是一种生活方式";
	var that = this;
	wx.ready(function() {
		let link = localconfig.share + 'wxlogin.php?invitor=' + obj.invitor + '&version=' + obj.version + '&timestamp=' +
			Date.parse(new Date());
		if (obj.url)
			link += ('&page=' + encodeURIComponent(obj.url.split('#')[1]));
		//that.showToast("ready成功22222")
		wx.onMenuShareTimeline({
			title: obj.title,
			link: link,
			imgUrl: obj.imgUrl,
			success: function() {

			}
		})
		wx.onMenuShareAppMessage({
			title: obj.title,
			desc: obj.desc,
			link: link,
			imgUrl: obj.imgUrl,
			type: 'link',
			dataUrl: '',
			success: function() {

			}
		})
	})

	wx.error(function(res) {
		uni.showToast({
			title: '微信配置失败',
			icon: 'none',
			duration: 1000,
			mask: false
		})
	})

}

exports.showToast = function(title, duration = 1000) {
	uni.showToast({
		title: title,
		icon: 'none',
		duration: duration,
		mask: false
	})
}
exports.showToastyes = function(title, duration = 1500) {
	uni.showToast({
		title: title,
		icon: 'success',
		duration: duration,
		mask: false
	})
}

exports.showToastno = function(title, duration = 1500) {
	uni.showToast({
		title: title,
		image: "../img/gantanhao.png",
		duration: duration,
		mask: false
	})
}
exports.getWanNum = function(num) {
	// num = 20100;
	if (num >= 100000000) {
		var wannum = Math.round(num / 100000000);
		return wannum + "Y";
	}
	if (num >= 10000) {
		var wannum = Math.round(num / 10000);
		var dian = num - wannum * 10000;
		if (dian > 1000) {
			return wannum + "." + Math.round(dian / 1000) + "W";
		}
		return wannum + "W";
	}
	if (num >= 1000) {
		var wannum = Math.round(num / 1000);
		var dian = num - wannum * 1000;
		if (dian > 100) {
			return wannum + "." + Math.round(dian / 100) + "K";
		}
		return wannum + "K";
	}
	return num + "";
}
exports.getTimeStrOnlyDateAuthen = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();
	let lastwords = hours + ":" + minutes;
	if (hours == 0 && minutes == 0) {
		lastwords = "";
	}
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
exports.getYiNum = function(num) {
	if (num >= 100000000) {
		var wannum = Math.round(num / 100000000);
		return wannum + "Y";
	}
	return num + "";
}
exports.showModal = function(title, content, sucFun, _showCancel = true) {
	uni.showModal({
		title: title,
		content: content,
		showCancel: _showCancel,
		success: function(res) {
			if (res.confirm) {
				console.log('用户点击确定')
				if (sucFun)
					sucFun();
			} else if (res.cancel) {
				console.log('用户点击取消')
			}
		}
	})
}
exports.showPopLoading = function(str = '加载中……') {
	uni.showLoading({
		title: str,
	})
	setTimeout(function() {
		uni.hideLoading()
	}, 2000)
}

exports.showLoading = function() {
	wx.showNavigationBarLoading() //在标题栏中显示加载

	//模拟加载
	setTimeout(function() {
		// complete
		wx.hideNavigationBarLoading() //完成停止加载
		wx.stopPullDownRefresh() //停止下拉刷新
	}, 1000);
}
exports.sixwordsNod = function(str, num) {
	let temp = '';
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		temp += str[i]
		if (str[i] == '\n') {
			console.log('这里是换行');
			count += 20;
		} else {
			count += 1;
		}
		if (count >= num) {
			return temp;
		}
	}
	return temp;
}
exports.sixwords = function(str, num) {
	let temp = '';
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		temp += str[i]
		if (str[i] == '\n') {
			console.log('这里是换行');
			count += 20;
		} else {
			count += 1;
		}
		if (count > num) {
			return temp + "…";
		}
	}
	return temp;
}
exports.onlyOneLine = function(str, num) {
	let temp = '';
	for (let i = 0; i < str.length; i++) {
		temp += str[i]
		if (str[i] == '\n') {
			console.log('这里是换行');
			return temp + "…";
		}
	}
	return temp;
}
exports.clearEnterKongge = function(str, num) {
	let exp = /[/\n/\t]/g
	str = str.replace(exp, ' ')
	return str;
}
exports.sixwordsNoHuanhang = function(str, num) {
	let temp = '';
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		temp += str[i]
		if (str[i] == '\n') {
			console.log('这里是换行');
			count += 20;
		} else {
			count += 1;
		}
		if (count >= num) {
			return temp;
		}
	}
	return temp;
}

exports.numWords = function(str, num) {
	if (str.length > num) {
		this.showToast("只能输入" + num + "个字");
		return str.slice(0, num) + "…";
	}
	return str;
}

exports.countTime = function(fabutime) {
	//var date1 = '2018/06/14 00:00:00'; //开始时间  
	var date2 = new Date(); //结束时间  
	var date3 = date2.getTime() - fabutime; //时间差的毫秒数        

	//------------------------------  

	//计算出相差天数  
	var days = Math.floor(date3 / (24 * 3600 * 1000))

	//计算出小时数  

	var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数  
	var hours = Math.floor(leave1 / (3600 * 1000))
	//计算相差分钟数  
	var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数  
	var minutes = Math.floor(leave2 / (60 * 1000))
	//计算相差秒数  
	var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数  
	var seconds = Math.round(leave3 / 1000)
	if (days >= 1) {
		return days + "天 ";
	} else {
		if (hours > 1) {
			return hours + "小时 ";
		} else {
			if (minutes > 1) {
				return minutes + "分钟 ";
			} else {
				if (seconds > 1) {
					return seconds + "秒 ";
				}
			}
		}

	}
	//return  days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
}

exports.timeFilter = function(secdons) {
	var min = "00"
	var sec = "00"
	if (secdons > 60) {
		min = Math.floor(secdons / 60)
		min = (min > 10) ? min : '0' + min
		secdons = secdons % 60;
	}
	if (secdons < 60) {
		sec = (secdons > 10) ? secdons : '0' + secdons
	}
	return min + ":" + sec;
}

exports.getTimeStr = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();

	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + hours + ":" + minutes + ":" +
		seconds
}
exports.getTimeStr1 = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();

	return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
}
exports.getTimeStrNoYear = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();

	return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "号 " + hours + ":" + minutes;
}
exports.getTimeStrToDay = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();
	let lastwords = hours + ":" + minutes;
	if (hours == 0 && minutes == 0) {
		lastwords = "";
	}
	if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()) {
		if (date.getDate() - now.getDate() == 0)
			return "今天" + lastwords;
		else if (date.getDate() - now.getDate() == 1)
			return "明天" + lastwords;
		else if (date.getDate() - now.getDate() == 2)
			return "后天" + lastwords;
	}
	return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "  " + lastwords;
}

exports.getTimeStrToDayAndXingqi = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();
	let lastwords = hours + ":" + minutes;
	if (hours == 0 && minutes == 0) {
		lastwords = "";
	}
	if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()) {
		if (date.getDate() - now.getDate() == 0)
			return "今天" + lastwords;
		else if (date.getDate() - now.getDate() == 1)
			return "明天" + lastwords;
		else if (date.getDate() - now.getDate() == 2)
			return "后天" + lastwords;
	}
	let arr = ["日", "一", "二", "三", "四", "五", "六"];
	let d = arr[date.getDay()]
	return (date.getMonth() + 1) + "月" + date.getDate() + "日  星期" + d + "  " + lastwords;
}

exports.getTimeStrToDayNotXingqi = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(game_over_timestamp);
	var now = new Date();
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();
	let lastwords = hours + ":" + minutes;
	if (hours == 0 && minutes == 0) {
		lastwords = "";
	}
	if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()) {
		if (date.getDate() - now.getDate() == 0)
			return "今天" + lastwords;
		else if (date.getDate() - now.getDate() == 1)
			return "明天" + lastwords;
		else if (date.getDate() - now.getDate() == 2)
			return "后天" + lastwords;
	}
	return (date.getMonth() + 1) + "月" + date.getDate() + "日  " + lastwords;
}

exports.getTimeStrToDayonluyear = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();
	let lastwords = hours + ":" + minutes;
	if (hours == 0 && minutes == 0) {
		lastwords = "";
	}

	return date.getFullYear()
}

exports.getTimeArr = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	return [date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()]
}

exports.getTimeStrToDayNoyear = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();
	let lastwords = hours + ":" + minutes;
	if (hours == 0 && minutes == 0) {
		lastwords = "";
	}
	if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()) {
		if (date.getDate() - now.getDate() == 0)
			return "今天" + lastwords;
		else if (date.getDate() - now.getDate() == 1)
			return "明天" + lastwords;
		else if (date.getDate() - now.getDate() == 2)
			return "后天" + lastwords;
	}
	return (date.getMonth() + 1) + "月" + date.getDate() + "号 " + lastwords;
}

exports.getTimeStrToDayNoyearAndHour = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();
	var hours = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours();
	var minutes = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes();
	var seconds = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds();
	let lastwords = hours + ":" + minutes;
	if (hours == 0 && minutes == 0) {
		lastwords = "";
	}
	if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()) {
		if (date.getDate() - now.getDate() == 0)
			return "今天" + lastwords;
		else if (date.getDate() - now.getDate() == 1)
			return "明天" + lastwords;
		else if (date.getDate() - now.getDate() == 2)
			return "后天" + lastwords;
	}
	return (date.getMonth() + 1) + "月" + date.getDate() + "号 ";
}

exports.newDate = function(str) {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
	var d = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();

	return y + str + m + str + d;
}

exports.getTimeStrToDayNoyearNominute = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();

	if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth()) {
		if (date.getDate() - now.getDate() == 0)
			return "今天";
		else if (date.getDate() - now.getDate() == 1)
			return "明天";
		else if (date.getDate() - now.getDate() == 2)
			return "后天";
	}
	return (date.getMonth() + 1) + "月" + date.getDate() + "号 "
}

exports.getTimeStrToDayNoyearNominute1 = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();

	return (date.getMonth() + 1) + "/" + date.getDate()
}

exports.getTimeStrOnlyDate = function(game_over_timestamp) {
	if (game_over_timestamp == 0)
		return "";
	var date = new Date(parseInt(game_over_timestamp));
	var now = new Date();
	var month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1);
	var day = date.getDate() >= 10 ? date.getDate().toString() : "0" + '' + date.getDate();
	
	
	return date.getFullYear() + "-"  + month + "-" + day;
}

exports.getTimeStrDate = function(game_over_timestamp) {
	if (game_over_timestamp == 0) return "";
	var date = new Date(parseInt(game_over_timestamp));

	var old = game_over_timestamp
	var now = new Date().getTime()

	var nowHours = new Date(now).getHours()
	var nowMinutes = new Date(now).getMinutes()
	var nowSeconds = new Date(now).getSeconds()
	var oldMonth = date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth()
	var oldDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	var oldHours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
	var oldMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
	var oldSeconds = date.getSeconds()

	var newTime = (nowHours * 60 * 60 + nowMinutes * 60 + nowSeconds) * 1000
	if (now - old <= newTime) {
		// 当天
		return oldHours + ':' + oldMinutes
	} else if (now - (old + 24 * 60 * 60 * 1000) <= newTime) {
		// 昨天
		return '昨天 ' + oldHours + ':' + oldMinutes
	} else {
		// 昨天之前
		// return oldMonth + '/' + oldDate
		return (date.getMonth() + 1) + "/" + date.getDate()
	}
}
exports.searchTxt = function(str, re) {
	//定义正则表示式对象
	//利用RegExp可以动态生成正则表示式
	var pattern = new RegExp(re);
	if (pattern.test(str)) {
		return false;
	} else {
		return true;
	}
}

exports.popWxLoginModel = function() {
	console.log("微信未登录，弹出登陆窗口");
	uni.reLaunch({
		url: '/pages/login/login'
	})
	return;
	uni.showModal({
		title: '提示',
		content: '您未登陆，请先去个人中心登陆！',
		success: function(res) {
			if (res.confirm) {
				console.log('用户点击确定')

				uni.switchTab({
					url: '../geren/Wode'
				})
			} else if (res.cancel) {

				console.log('用户点击取消')
			}
		}
	})
}

exports.saveOffenUserSite = function(site, type) {
	let offenUseSite = uni.getStorageSync('offenUseSite' + type);
	if (offenUseSite == null || offenUseSite == "") {
		uni.setStorageSync("offenUseSite" + type, site);
	} else {
		let arr = offenUseSite.split('|');
		if (arr.indexOf(site) < 0) {
			if (arr.length > 10) {
				arr.pop();
				console.log('arr', arr);
				offenUseSite = arr.join("|");
			}
			uni.setStorageSync("offenUseSite" + type, site + "|" + offenUseSite);
		} else {
			let ind = arr.indexOf(site);
			arr[ind] = arr[0];
			arr[0] = site;
			let finalstr = arr.join("|");
			uni.setStorageSync("offenUseSite" + type, finalstr);
		}
	}
}
exports.saveOffenUserArr = function(type, arr) {
	uni.setStorageSync("offenUseSite" + type, arr);
}
exports.getOffenUserSiteArr = function(type) {
	let offenUseSite = uni.getStorageSync('offenUseSite' + type);
	if (offenUseSite != null && offenUseSite != "") {
		let arr = offenUseSite.split('|');
		return arr;
	}
	return [];
}

exports.getNameAdress = function(str) {
	let tempindex = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] == '(') {
			tempindex = i;
		}
	}
	let str1 = str.slice(0, tempindex);
	let str2 = str.slice(tempindex);
	str2 = str2.replace(/[()]/g, '');

	return [str1, str2];
}

exports.refreshBack = function(url, caller, data, str) {
	let that = this;
	var pages1 = getCurrentPages();
	let delta = 1;
	if (pages1.length > 1) {
		for (let i = pages1.length - 1; i >= 0; i--) {
			let prePage = pages1[i];
			if (prePage.route == url) {
				delta = pages1.length - i;
				break;
			}
		}
		//上一个页面实例对象
		var prePage = pages1[pages1.length - delta];
		console.log("页面名称：" + prePage.route + "    url=" + url);
		if (prePage.route == url) {
			wx.navigateBack({
				delta: delta - 1,
				success: function() {
					var pages = getCurrentPages();
					for (let i = 0; i < pages.length; i++) {
						let curpage = pages[i];
						if (curpage.route == url) {
							console.log("curpage.route名称：" + curpage.route)
							//curpage[cb].apply(caller, [data]);
							curpage.setData(data);

							if (str)
								that.showToastyes(str);
							break;
						}
					}
				}
			})
		}
	}
}


exports.pxToUpx = function(px) {
	let upx = (px * (750 / store.state.screenWidth)); //将高度乘以换算后的该设备的upx与px的比例
	return upx; //最后获得转化后得upx单位的窗口高度
}
exports.upxToPx = function(upx) {

	let px = (upx * store.state.screenWidth / 750); //将高度乘以换算后的该设备的upx与px的比例
	return px; //最后获得转化后得upx单位的窗口高度
}

exports.getComponetProperty = function(id, second, func) {

	//创建节点选择器
	var query = wx.createSelectorQuery();
	query.select('#' + id).boundingClientRect()
	// clearTimeout(app.store.state.timeid)
	//选择id
	setTimeout(function() {
		query.exec(function(res) {
			//res就是 该元素的信息 数组
			return func(res)
		})
	}, second)
}


// 函数节流
exports.throttle = function(fn, interval) {
	var enterTime = 0; //触发的时间
	var gapTime = interval || 300; //间隔时间，如果interval不传，则默认300ms
	return function() {
		var context = this;
		var backTime = new Date(); //第一次函数return即触发的时间
		if (backTime - enterTime > gapTime) {
			fn.call(context, arguments);
			enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
		}
	};
}

// 动画
exports.animation = function(that, time) {
	// 实例化一个动画
	that.animation = wx.createAnimation({
		// 动画持续时间
		duration: time,

		//  linear 动画一直较为均匀， ease 从匀速到加速在到匀速，ease-in 缓慢到匀速， ease-in-out 从缓慢到匀速再到缓慢
		// step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过，step-end   保持 0% 的样式直到动画持续时间结束 一闪而过
		timingFunction: "ease",

		// 延时
		// delay: 100,

		// left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
		// top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
		// transformOrigin: 'left top 0',

		success: function(res) {
			console.log(res)
		}
	})
}
exports.clearSpeachialCode = function(str) {
	let re = /[@#$%^&*()]/g
	//let s = "@#%abc&";
	str = str.replace(/[\ud800-\udfff]/g, "特殊符号"); //过滤emoji表情
	let a = str.replace(re, "");
	console.log(a);

	return a;
}
// exports.startUpload = function (urlArr, token){
//   //启动上传等待中...  
//   wx.showToast({
//     title: '正在上传...',
//     icon: 'loading',
//     mask: true,
//     duration: 10000
//   })
//   let teamparr = [].concat(urlArr);
//   let that = this
//   console.log(teamparr)
//   function uploadimg() {
//     while (teamparr.length > 0) {
//       let item = teamparr.shift();
//       wx.uploadFile({
//         url: localconfig.uploadImg,
//         filePath: item.url,
//         name: 'file',
//         formData: {
//           'imgIndex': urlArr.length - teamparr.length,
//           'token': token
//         },
//         header: {
//           "Content-Type": "multipart/form-data"
//         },
//         success: function (res) {
//           let resobj = JSON.parse(res.data);
//           let willUploadUrlArr = []
//           willUploadUrlArr.push(resobj.data.url);
//           console.log("上传成功", resobj.data.url)
//           //如果是最后一张,则隐藏等待中  
//           if (teamparr == 0) {
//             wx.hideToast();
//             // toolUtil.showToastyes("上传图片成功");
//             return JSON.stringify(willUploadUrlArr)
//           } else {
//             uploadimg();
//           }
//         },
//         fail: function (res) {
//           wx.hideToast();
//           wx.showModal({
//             title: '错误提示',
//             content: '上传图片失败',
//             showCancel: false,
//             success: function (res) { }
//           })
//         }
//       });
//       break;
//     }
//   }
//   uploadimg();
// }

// 特殊字符 如有特殊字符和emoji表情则返回true
exports.isEmojiCharacter = function(substring) {
	console.log(substring)
	if (substring) {
		var reg = new RegExp("[#^$@%&?%*]", 'g');
		if (substring.match(reg)) {
			return true;
		}
		for (var i = 0; i < substring.length; i++) {
			var hs = substring.charCodeAt(i);
			if (0xd800 <= hs && hs <= 0xdbff) {
				if (substring.length > 1) {
					var ls = substring.charCodeAt(i + 1);
					var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
					if (0x1d000 <= uc && uc <= 0x1f77f) {
						return true;
					}
				}
			} else if (substring.length > 1) {
				var ls = substring.charCodeAt(i + 1);
				if (ls == 0x20e3) {
					return true;
				}
			} else {
				if (0x2100 <= hs && hs <= 0x27ff) {
					return true;
				} else if (0x2B05 <= hs && hs <= 0x2b07) {
					return true;
				} else if (0x2934 <= hs && hs <= 0x2935) {
					return true;
				} else if (0x3297 <= hs && hs <= 0x3299) {
					return true;
				} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
					hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
					hs == 0x2b50) {
					return true;
				}
			}
		}
	}
}

// 判断字符串长度，中文长度为2，英文长度为1
exports.gblen = function(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		//单字节加1 
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			len++;
		} else {
			len += 2;
		}
	}
	return len;
}

exports.objToJson = function(obj) {
	let count = 0;
	let re = '';
	for (let key in obj) {
		if (count == 0)
			re += ("?" + key + "=" + obj[key]);
		else
			re += "&" + (key + "=" + obj[key]);
		count++;
	}
	console.log('obj转json=', re)
	return re;
}

//保存至相册
exports.saveImageToPhotosAlbum = function(handle, value) {
	var that = handle

	wx.getImageInfo({
		src: value,
		success: function(sres) {
			console.log(sres.path);
			wx.saveImageToPhotosAlbum({
				filePath: sres.path,
				success: (res) => {
					// that.hideModal();
					// that.hideMoments();
					wx.showToast({
						title: "已保存到相册",
						icon: 'none',
						duration: 2000,
						mask: true
					})
				},
				fail: function(res) {
					console.error(res)
					//首次保存会询问你是否授权，选是就好了
					// if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
					console.error("打开设置窗口");
					wx.openSetting({
						success(settingdata) {
							console.error(settingdata)
							if (settingdata.authSetting["scope.writePhotosAlbum"]) {
								console.error("获取权限成功，再次点击图片保存到相册")
							} else {
								console.error("获取权限失败")
							}
						}
					})
					// }
				}
			})
		}
	})
}
exports.countWordsWidth = function(str) {
	var CnExp = /^[\u4e00-\u9fa5]$/;
	let wid = 0;
	for (let i = 0; i < str.length; i++) {
		if (CnExp.test(str[i]))
			wid += 32;
		else if (str[i] == "　")
			wid += 0;
		else
			wid += 17;
	}
	return wid;
}

exports.countWordsWidth2 = function(str) {
	var CnExp = /^[\u4e00-\u9fa5]$/;
	let wid = 0;
	for (let i = 0; i < str.length; i++) {
		if (CnExp.test(str[i]))
			wid += 30;
		else if (str[i] == "　")
			wid += 0;
		else
			wid += 15;
	}
	return wid;
}

exports.getSmallImg = function(url, replacestr = '64') {
	let exp = /(132|46|64|96|0)$/
	if (exp.test(url)) { //说明是微信图片，把大图转小图
		url = url.replace(exp, replacestr);
	} else {
		let expjpg = /(.jpg)$/
		let exppng = /(.png)$/

		if (expjpg.test(url))
			url = url.replace(expjpg, '.jpg/' + replacestr);
		if (exppng.test(url))
			url = url.replace(exppng, '.png/' + replacestr);
	}
	return url;
}

/**
 * 正则清除字符串左右的“空”字符 
 * str=string,Required,需匹配的字符串
 */
exports.trim = function(str) {
	if (!str) return false
	str = str.replace(/(^\s*)|(\s*$)/g, "");
	return str.replace(/[\r\n]/g, "");
}
exports.pay = function(caller, obj, sucFun, failFun, activityid) {
	var that = this;
	uni.requestPayment({
		timeStamp: obj.data.resp.timeStamp.toString(),
		nonceStr: obj.data.resp.nonceStr,
		package: obj.data.resp.package,
		signType: 'MD5',
		paySign: obj.data.resp.sign,
		success(res) {
			console.log(res);
			// wx.hideLoading();
			that.showToastyes("支付成功！");
			if (sucFun) {
				sucFun();
			}
			//  that.setData({
			// payStu: false,
			// paySuccess: true,
			// isPay: true,
			//  })
			//  that.getEnterpriseInfo();
		},
		fail(res) {
			console.log(res);
			that.showToast("支付失败，请重新支付！");
			if (failFun) {
				failFun();
			}
			if (activityid) {

				that.payFail(activityid, store.state.serverUserInfo.token)
				// that.setData({
				// payStu: true,
				// paySuccess: false,
				// })
			}
		}
	})
}

exports.payFail = function(activityid, token) {
	let params = {
		activityid: activityid,
		token: token
	};
	httpUtil.post("/api/wxapp.activity_user/cancel_pay", params, obj => {

	});
}
exports.uploadImg = function(urlArr, callback, uploadurl, token) {
	//启动上传等待中...  
	wx.showToast({
		title: '正在上传...',
		icon: 'loading',
		mask: true,
		duration: 10000
	})
	let teamparr = urlArr
	let drr = [];
	var that = this;

	function uploadimg1() {
		while (teamparr.length > 0) {
			let item = teamparr.shift();
			wx.uploadFile({
				url: uploadurl,
				filePath: item,
				name: 'file',
				formData: {
					'imgIndex': teamparr.length,
					'token': token
				},
				header: {
					"Content-Type": "multipart/form-data"
				},
				success: function(res) {
					let resobj = JSON.parse(res.data);
					drr.push(resobj.data.url);
					// drr.push(resobj.data.url)

					//如果是最后一张,则隐藏等待中  
					if (teamparr == 0) {
						wx.hideToast();
						that.showToastyes("上传图片成功");
						callback(drr);
					} else {
						uploadimg1();
					}
				},
			});
			break;
		}
	}
	uploadimg1();
}

exports.checkIsAuthorityr = function(callback) {

	if (store.state.serverUserInfo.is_authority && store.state.serverUserInfo.is_authority != 1) {
		uni.navigateTo({
			url: '/pages/Login/Login',
		})
		return false
	}
	return true;
}

exports.getShowMember = function() {
	let n = uni.getStorageSync('showMember');
	if (!n) {
		uni.setStorage({
			key: 'showMember',
			data: '1',
		})
		return 1;
	}
	return parseInt(n);
}

exports.checkHasMobile = function() {
	if (!store.state.hasMobile) {
		// #ifdef APP-PLUS || H5
		if (store.state.serverUserInfo) {
			uni.navigateTo({
				url: '/pages/me/bind-mobile/bind-mobile'
			})
		} else {
			uni.navigateTo({
				url: '/pages/login/login',
			});
		}
		// #endif
		// #ifdef MP-WEIXIN
		uni.navigateTo({
			url: '/pages/login/login_wx',
		});
		// #endif
		return false;
	}
	return true;
}
exports.checkHasUserinfo = function() {
	if (!store.state.serverUserInfo) {
		// #ifdef APP-PLUS || H5
		uni.navigateTo({
			url: '/pages/login/login',
		});
		// #endif
		// #ifdef MP-WEIXIN
		uni.navigateTo({
			url: '/pages/login/login_wx',
		});
		// #endif
		return false;
	}
	return true;
}
exports.showNotification = function(cb) {
	wx.requestSubscribeMessage({
		tmplIds: ['PV8Qe0T3jv0_VLeJ_j2p0QWi3DsLTNZ6Py1ALysm9qo'],
		success(res) {
			console.log("notification success:" + res);
		},
		fail(res) {
			uni.showModal({
				title: '提示',
				content: '你关闭了订阅消息开关，需要您重新开启',
				showCancel: false,
				success: res => {
					// if (res.confirm) {
					// 	wx.openSetting()
					// }
				}
			})
		},
		complete(res) {
			console.log("notification complete:" + res);
			cb();
		}
	})
}
exports.showAd = function(cb) {
	chuanshanjia.showAd(() => {
		console.log("播放完成返回");
		this.loadAd();
		if (cb)
			cb();
	});
}
exports.loadAd = function() {
	if (chuanshanjia) {
		let obj = {
			rewardname: "活动奖励",
			rewardcount: 1,
			userid: store.state.serverUserInfo.user_id,
			screenWidth: store.state.screenWidth,
			screenHeight: store.state.screenHeight
		};
		console.log("准备传输:", obj)
		chuanshanjia.loadAd(941627000, obj);
	}
}

exports.getOptions = function(options) {
	if (options) {
		let urldata = {};
		let url = null;
		if (options && options.query && options.query.scene) {
			url = decodeURIComponent(options.query.scene);
		}
		if (options && options.scene) {
			url = decodeURIComponent(options.scene);
		}
		if (url) {
			//"groupid=114585&invitor=100001"
			let arr = url.split('&');
			for (let i = 0; i < arr.length; i++) {
				let arr2 = arr[i].split('=');
				if (arr2[0] == "invitor") {
					store.state.invitor = urldata.invitor = arr2[1];
					break;
				}
				if (arr2[0] == "c") {
					store.state.invitor = urldata.invitor = arr2[1];
					break;
				}
			}
		}
		if (options.invitor) {
			store.state.invitor = urldata.invitor = options.invitor;
		}
		if (options.query && options.query.invitor) {
			store.state.invitor = urldata.invitor = options.query.invitor;
		}
		if (options.query && options.query.c) {
			store.state.invitor = urldata.invitor = options.query.c;
		}
		return urldata;
	}
	return null;
}

exports.checkLogin = function(callback, options = null, stillCallBack = false) {
	
	if (uni.getStorageSync('token')) {
		callback(options);
	} else {
		if(options.code){
			let param = {
				code: options.code,
				schoolId:1
			};
			httpUtil.post2('/api/parentLogin', param, (res) => {
				
				callback(options);
			})
		}else{
			window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx24d9b21c348d1ed9&redirect_uri=http%3A%2F%2Fh5.food-edu.net&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
		}
		
	}
	
}
