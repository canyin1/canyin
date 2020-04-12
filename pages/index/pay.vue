<template>
	<view class="page">
		<navbar title="支付" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="top_view">
			<text>支付剩余时间</text>
			<text class="time">{{minutes}}:{{seconds}}</text>
		</view>
		
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
				minutes: 0,
				seconds: 10
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
			}
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
	
</style>
