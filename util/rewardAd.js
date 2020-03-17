function RewardAd(){
	var videoAd;
	var cb;
	var loadStatus = 0;
	RewardAd.prototype.destroy = function() {
		if (this.videoAd){
			this.videoAd.destroy()
			loadStatus = 0;
		}
	}
	
	RewardAd.prototype.initAd = function(changeAdLoadStatus,failcb) {
		// 在页面onLoad回调事件中创建激励视频广告实例
		if (wx.createRewardedVideoAd) {
			this.videoAd = wx.createRewardedVideoAd({
				adUnitId: 'adunit-f2e696ac92168b07'
			})
			this.videoAd.onLoad(() => {
				console.log('onLoad event emit');
				loadStatus = 1;
				if(changeAdLoadStatus){
					changeAdLoadStatus(loadStatus);
				}
			})
			this.videoAd.onError((err) => {
				wx.showToast({
					title: this.videoAdErrHandle(err),
					icon: 'none'
				})
			})
			// 监听关闭
			this.videoAd.onClose((status) => {
				loadStatus = 0;
				if(changeAdLoadStatus){
					changeAdLoadStatus(0);
				}
				//console.log('status===',status);
				if (status && status.isEnded || status === undefined) {
					console.log('视频正常关闭 下发奖励');
					this.cb();
				} else {
					// 播放中途退出，进行提示
					// wx.showToast({
					// 	title: '未完整观看视频不能获取奖励哦',
					// 	icon: 'none'
					// })
					if(failcb){
						failcb();
					}
				}
			})
		}
	}
	RewardAd.prototype.showAd = function(cb) {
		if(loadStatus == 0){
			wx.showToast({
				title: '视频广告还没加载完,请稍等一会儿',
				icon: 'none'
			})
			return;
		}
		this.cb = cb;
		// 用户触发广告后，显示激励视频广告
		if (this.videoAd) {
			this.videoAd.show().catch(() => {
				// wx.showToast({
				// 	title: '视频广告还没加载完,请稍等一会儿',
				// 	icon: 'none'
				// })
				// 失败重试
				this.videoAd.load()
					.then(() => this.videoAd.show())
					.catch(err => {
						console.log('激励视频 广告显示失败')
					})
			})
		}
	}
	RewardAd.prototype.videoAdErrHandle = function(err) {
		console.log('视频加载失败')
		console.log(err)
		// {errMsg: "no advertisement", errCode: 1004}
		const errHandle = {
			1000: '后端接口调用失败',
			1001: '参数错误',
			1002: '广告单元无效',
			1003: '内部错误',
			1004: '无合适的广告',
			1005: '广告组件审核中',
			1006: '广告组件被驳回',
			1007: '广告组件被封禁',
			1008: '广告单元已关闭',
		}
		return errHandle[err.errCode] || '视频加载错误,重新加载页面试试吧'
	}
}

module.exports.RewardAd=RewardAd;