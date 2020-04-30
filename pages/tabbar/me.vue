<template>
	<view class="page">
		<button type="default" @click="testClick">清缓存</button>
		<view class="top_view">
			<image class="me_BG" src="/static/index_bg.png" mode=""></image>
			<view class="player_view">
				<view class="player_img_view">
					<image class="player_img" :src="user.headImage" mode="aspectFill"></image>
				</view>
				<view class="name_view">
					<view class="name">{{user.nickname}}</view>
					<view class="phone">{{user.phoneNumber}}</view>
				</view>
			</view>
			<span class="iconfont icon-ziyuan"></span>
		</view>
		<view class="hengview">
			<!-- <view class="hengview1" @click="goClick(0)">
				<view class="hengLeft">
					<span class="iconfont icon-tubiaolunkuo- icon-s"></span>
					<view class="hengname">我的钱包</view>
				</view>
				<span class="iconfont icon-jiantou"></span>
			</view> -->
			<view class="hengview1" @click="goClick(0)">
				<view class="hengLeft">
					<span class="iconfont icon-fuwu icon-s"></span>
					<view class="hengname">绑定学生</view>
				</view>
				<span class="iconfont icon-jiantou"></span>
			</view>
			<view class="hengview1" @click="goClick(1)">
				<view class="hengLeft">
					<span class="iconfont icon-cedaohang-hezuohuoba icon-s"></span>
					<view class="hengname">就餐人员</view>
				</view>
				<span class="iconfont icon-jiantou"></span>
			</view>
			<!-- <view class="hengview1">
				<view class="hengLeft">
					<span class="iconfont icon-fuwu icon-s"></span>
					<view class="hengname">服务中心</view>
				</view>
				<span class="iconfont icon-jiantou"></span>
			</view>
			<view class="hengview1">
				<view class="hengLeft">
					<span class="iconfont icon-cedaohang-hezuohuoba icon-s"></span>
					<view class="hengname">商务合作</view>
				</view>
				<span class="iconfont icon-jiantou"></span>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user:[]
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			testClick(){
				uni.clearStorage()
			},
			getUserInfo(){
				let params = {}
				this.httpUtil.get('/api/getInfo',params,(obj)=>{
					console.log(obj)
					this.user = obj.user
				})
			},
			goClick(type){
				let url = ['../login','../me/dininStaff']
				uni.navigateTo({
					url:url[type]
				})
			},
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
	}

	.top_view {
		position: relative;
	}

	.me_BG {
		width: 100%;
		height: 233upx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.player_view {
		height: 233upx;
		width: 100%;
		padding: 0 50upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		position: relative;
		z-index: 999;
	}

	.player_img_view {
		font-size: 0;
	}

	.player_img {
		width: 128upx;
		height: 128upx;
		border-radius: 50%;
	}

	.name_view {
		padding-left: 20upx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-around;
		height: 128upx;
	}

	.name {
		font-size: 32upx;
		line-height: 1;
		color: #FFFFFF;
	}

	.phone {
		font-size: 26upx;
		line-height: 1;
		color: #FFFFFF;
	}

	.icon-ziyuan {
		position: absolute;
		right: 60upx;
		top: 60upx;
		z-index: 9999;
		font-size: 40upx;
		color: #FFFFFF;
	}

	.hengview {
		width: 710upx;
		background: #FFFFFF;
		border-radius: 34upx;
		margin: 40upx auto 0;
		box-shadow: 10upx 10upx 40upx rgba(0,0,0,.1);
	}

	.hengview1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 98upx;
		padding: 0 32upx;
		box-sizing: border-box;
		position: relative;
		border-radius: 34upx;
	}
	.hengview1:last-of-type{
		position: initial;
	}
	.hengview1:after {
		content: '';
		height: 1upx;
		width: 586upx;
		position: absolute;
		bottom: 0;
		left: 94upx;
		background: #F5F5F5;
	}

	.hengLeft {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.icon-s {
		font-size: 40upx;
	}

	.hengname {
		font-size: 32upx;
		line-height: 1;
		color: #333333;
		padding-left: 20upx;
	}

	.icon-jiantou {
		font-size: 36upx;
		color: #999;
	}

	.icon-tubiaolunkuo- {
		color: #0FC299;
	}

	.icon-ic_tomap {
		color: #FFAF25;
	}

	.icon-aixin {
		color: #FF4D4C;
	}

	.icon-fuwu {
		color: #167BBA;
	}

	.icon-cedaohang-hezuohuoba {
		color: #6DD2C0;
	}
	button{
		position: fixed;
		top: 40upx;
		right: 140upx;
		z-index: 99999999;
		font-size: 26upx;
	}
</style>
