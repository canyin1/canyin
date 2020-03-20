<template>
	<view class="page">
		<navbar title="账号余额" :backcolorType='0' :whiteback='2'></navbar>
		<view class="top_view" :style="{paddingTop:heights + 'px',height:324 / 2 - heights +'px'}">
			<view class="cash">￥1000.00</view>
		</view>
		<view class="hengview">
			<view class="hengview1">
				<view class="hengLeft">
					<span class="iconfont icon-mingxi icon-s"></span>
					<view class="hengname">交易明细</view>
				</view>
				<span class="iconfont icon-jiantou"></span>
			</view>
		</view>
		<view class="hengview">
			<view class="hengview1">
				<view class="hengLeft">
					<span class="iconfont icon-qianbao icon-s"></span>
					<view class="hengname">余额充值</view>
				</view>
				<span class="iconfont icon-jiantou"></span>
			</view>
		</view>
		<view class="hengview">
			<view class="hengview1">
				<view class="hengLeft">
					<span class="iconfont icon-tubiaolunkuo- icon-s"></span>
					<view class="hengname">余额提现</view>
				</view>
				<span class="iconfont icon-jiantou"></span>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default{
		onReady() {
			this.heights = this.$store.state.kongHeight
		},
		components: {
			navbar
		},
		data(){
			return{
				heights:''
			}
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style>
	page{
		background: #F5F5F5;
	}
	.top_view{
		width: 100%;
		height: 324upx;
		background: linear-gradient(270deg,rgba(249,128,80,1) 1%,rgba(255,186,89,1) 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.cash{
		font-size: 80upx;
		line-height: 1;
		padding-top: 44upx;
		color: #FFFFFF;
	}
	.hengview {
		width: 710upx;
		background: #FFFFFF;
		border-radius: 24upx;
		margin: 40upx auto 0;
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
	}
	
	.hengLeft {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.icon-s {
		font-size: 40upx;
		padding-right: 20upx;
	}
	.icon-mingxi{
		font-size: 42upx;
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
</style>
