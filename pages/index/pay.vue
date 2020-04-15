<template>
	<view class="page">
		<navbar title="支付" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="top_view">
			<text>支付剩余时间</text>
			<text class="time">{{minutes}}:{{seconds}}</text>
		</view>
		<view class="price_view">
			<text>本次待支付</text>
			<text>￥120元</text>
		</view>
		<view class="text">请选择支付方式</view>
		<view class="checkbox_view">
			<view class="checkbox" @click="indexClick(0)">
				<view class="name_view">
					<span class="iconfont icon-weixin"></span>
					<text>微信支付</text>
				</view>
				<span class="iconfont icon-circle" v-if='index==1'></span>
				<span class="iconfont icon-ok" v-if='index==0'></span>
			</view>
		</view>
		<view class="btn" >确认支付</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default {
		components: {
			navbar
		},
		data() {
			return {
				minutes: 10,
				seconds: 0,
				index:0
			}
		},
		onLoad() {

		},
		methods: {
			// 倒计时
			num(n) {
				return n < 10 ? '0' + n : ' ' + n
			},
			timer() {
				var _this = this
				var time = window.setInterval(function() {
					if (_this.seconds === 0 && _this.minutes !== 0) {
						_this.seconds = 59
						_this.minutes -= 1
					} else if (_this.minutes === 0 && _this.seconds === 0) {
						_this.seconds = 0
						window.clearInterval(time)
					} else {
						_this.seconds -= 1
					}
				}, 1000)
			},
			indexClick(index){
				if (this.index ==index){
					return
				}
				this.index = index
			},
		},
		mounted() {
			this.timer()
		},
		watch: {
			second: {
				handler(newVal) {
					this.num(newVal)

				}
			},
			minute: {
				handler(newVal) {
					this.num(newVal)
				}
			},
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
		color: #333333;
	}

	.top_view {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60upx 0;
		font-size: 28upx;
		background: #FFFFFF;
		border-bottom: 2upx solid #F5F5F5;
	}

	.time {
		font-size: 40upx;
		padding-top: 30upx;
	}
	.price_view{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding: 14upx 32upx;
		box-sizing: border-box;
		background: #FFFFFF;
		font-size: 32upx;
		justify-content: space-between;
	}
	.checkbox_view{
		width: 100%;
		background: #FFFFFF;
	}
	.checkbox{
		width: 100%;
		border-bottom: 2upx solid #F5F5F5;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 16upx 32upx;
		box-sizing: border-box;
		font-size: 32upx;
	}
	.icon-circle{
		font-size: 32upx;
		color: #333333;
		margin-right: 4upx;
	}
	.icon-ok{
		font-size: 40upx;
		color: #FFBA59;
	}
	.icon-weixin{
		color: #00e200;
		margin-right: 20upx;
	}
	.icon-qian1{
		color: #f1ea07;
		margin-right: 20upx;
	}
	.text{
		font-size: 32upx;
		padding: 14upx 32upx;
	}
	.btn{
		width: 100%;
		height: 88upx;
		font-size: 32upx;
		line-height: 88upx;
		background: linear-gradient(270deg,rgba(249,128,80,1) 1%,rgba(255,186,89,1) 100%);
		color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
	}
</style>
