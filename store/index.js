import Vue from 'vue'
import Vuex from 'vuex'
import toolUtil from '../util/toolUtil.js'
import localconfig from '../util/localconfig.js'
import httpUtil from '../util/httpUtil.js'
import socketUtil from '../util/socketUtil.js'
// #ifdef H5
// #endif
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isWxBrowser: false,
		serverUserInfo: null, //invitor -1=表示末填写 0=无人邀请 其他=邀请人
		platform: '',
		hasMobile: true,
		shareObj: null,
		globalFormIds: null,
		navHeight: 0, //顶部导航条的高度
		iphoneXBottomH: 0,
		isRelease: false,
		loginProvider: "",
		openid: null,
		testvuex: false,
		colorIndex: 0,
		colorList: ['#FF0000', '#00FF00', '#0000FF'],
		num: 0,
		price: 0,
		name: '苹果',
		// #ifdef APP-PLUS || MP-WEIXIN
		pddTitleTop: 25,
		pddTitleHeight: 32,
		kongHeight: 68,
		// #endif

		// #ifdef H5
		pddTitleHeight: 32, //这个是单单微信右上角原点icon的高度,不包括了顶部bar的高度
		pddTitleTop: 5, //这个是圆点上面的bar的高度
		kongHeight: 32 + 5 + 5, //这个是微信右上角原点icon的高度+顶部bar的高度+圆点下面特意留了5px的padding-bottom
		// #endif
	},
	//全局同步方法  必须是同步函数 通过commit函数来执行	
	mutations: {
		
		login(state, userInfo) {
			console.log('fake登陆成功:', userInfo);
			uni.setStorage({
				key: 'token',
				data: userInfo.token
			});
			// #ifdef H5
			if (state.isWxBrowser && state.serverUserInfo && state.serverUserInfo.token != userInfo.token) {
				toolUtil.showToast("账号重新绑定，正在刷新……");
				let pages = getCurrentPages();
				if (pages.length > 1) {
					let lastpage = pages[pages.length - 2];
					console.log(lastpages.route);
					let uarr = window.location.href.split('?');
					let path = uarr[1].split('#');
					let u = uarr[0] + '?token=' + userInfo.token + '#' + path[1];
					window.location.href = u;//localconfig.urlIndex;
				}
			}
			// #endif
			state.serverUserInfo = userInfo;

			let exp = /(avatar.png)$/;
			let ah = exp.test(userInfo.avatar); //现在不用头像判断了
			ah = (userInfo.is_auth_userinfo == 0);
			// #ifdef H5 || APP-PLUS
			ah = false;
			// #endif
			if (userInfo.mobile != '' && !ah) {
				state.hasMobile = true;
				state.serverUserInfo.mobileHide = state.serverUserInfo.mobile.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2");
				// #ifdef APP-PLUS
				toolUtil.loadAd();
				// #endif
				//socketUtil.connect(state.serverUserInfo.token);
				this.dispatch("getUserData");
			}
			// #ifdef APP-PLUS
			uni.$emit('login_com', {
				msg: '登陆成功'
			})
			// #endif
			// #ifdef H5
			if (state.isWxBrowser)
				this.dispatch('configWx');
			// #endif
		},
		exitLogin(state) {
			uni.removeStorage({
				key: 'token'
			});
			state.serverUserInfo = null
		},
		logout(state) {
			state.hasMobile = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		setTestTrue(state) {
			state.testvuex = true
		},
		setTestFalse(state) {
			state.testvuex = false
		},
		setColorIndex(state, index) {
			state.colorIndex = index
		}
	},
	//vuex的属性计算,在视图里面当变量使用
	getters: {
		currentColor(state) {
			return state.colorList[state.colorIndex]
		},
		count(state) {
			//这个函数的执行依赖一个可变的变量
			return state.num * state.price;
		}
	},
	//异步方法 通过dispatch函数来执行
	actions: {
		configWx(context) {
			let url = window.location.href;
			var params = {
				url: url.split('#')[0]
			}
			httpUtil.post2(localconfig.fileUrl + '/api/resource/create_wx_share_ticket', params, (rs) => {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: rs.data.appId, // 必填，公众号的唯一标识
					timestamp: rs.data.timestamp, // 必填，生成签名的时间戳
					nonceStr: rs.data.nonceStr, // 必填，生成签名的随机串
					signature: rs.data.signature, // 必填，签名
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
				});
				//toolUtil.showToast("微信配置成功");
				// #ifdef H5
				if (context.state.isWxBrowser)
					toolUtil.wxShare2();
				// #endif
			}, null, 1)
		},


		testAction(context) {
			//context: 上下文.包含了state mutations getters actions
			console.log(context);
		},
		// lazy loading openid
		getUserOpenId: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (data) => {
							commit('login')
							setTimeout(function() { //模拟异步请求服务器获取 openid
								const openid = '123456789'
								console.log('uni.request mock openid[' + openid + ']');
								commit('setOpenid', openid)
								resolve(openid)
							}, 1000)
						},
						fail: (err) => {
							console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
							reject(err)
						}
					})
				}
			})
		}
	}
})

export default store
