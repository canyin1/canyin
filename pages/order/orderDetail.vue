<template>
	<view class="page">
		<navbar title="订单详情" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="order_status" v-if="order.orderState=='NOT_PAY'">订单未支付</view>
		<view class="order_status" v-if="order.orderState=='PAID'">未就餐</view>
		<view class="order_status" v-if="order.orderState=='NOT_COMMENT'">未评论</view>
		<view class="order_status" v-if="order.orderState=='FINISH'">订单已完成</view>
		<view class="order_status" v-if="order.orderState=='CANCELED'">订单已取消</view>
		<view class="order_status" v-if="order.orderState=='DELIVERING'">订单配送中</view>
		<view class="order_status" v-if="order.orderState=='REFUNDING'">正在退款</view>
		<view class="order_status" v-if="order.orderState=='CANCEL_PENDING'">退款中，等待商家确认</view>

		<view class="foods_view">
			<view class="title">订单菜品</view>
			<view class="foods" v-for="(item,index) in order.detailList" :key="index">
				<view class="name">{{item.itemName}}</view>
				<view class="name">{{item.itemPrice}}</view>
			</view>
		</view>
		<view class="order_info_view">
			<view class="title">订单信息</view>
			<view class="order_time">时间段：{{order.mealTimeText}}</view>
			<view class="order_time">用餐人：{{order.student.name}}</view>
			<view class="order_time">订单号：{{order.id}}</view>
			<view class="order_time">下单时间：{{order.createTime}}</view>
		</view>
		<view class="bottom_view">
			<view class="order_btn order_btn1" v-if="order.orderState=='NOT_PAY'||order.orderState=='PAID'" @click="cancelClick">取消订单</view>
			<view class="order_btn" v-if="order.orderState=='NOT_PAY'" @click="payClick">立即支付</view>
			<view class="order_btn" v-if="order.orderState=='NOT_COMMENT'" @click="addCommon">立即评论</view>
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
				id: 1,
				order: {
					"createTime": "2020-04-21 11:43:55",
					"id": "202004211143549768770",
					"outTradeNo": "202004211143548102b28",
					"studentId": 1,
					"student": {
						"id": 1,
						"name": "Student"
					},
					"parentId": "4456370c693e4948b110bd0d8c672973",
					"totalPrice": 69.0,
					"orderState": "NOT_PAY",
					"paymentType": "WECHAT",
					"orderType": "BOOKING",
					"mealDate": "2020-04-25 00:00:00",
					"mealTime": "DINNER",
					mealTimeText: '早餐',
					"detailList": [{
							"id": 4,
							"orderId": "202004211143549768770",
							"itemName": "苦瓜酿肉",
							"itemPrice": 34.5,
							"totalPrice": 34.5,
							"createAt": "2020-04-21 11:43:54"
						},
						{
							"id": 5,
							"orderId": "202004211143549768770",
							"itemName": "苦瓜酿肉",
							"itemPrice": 34.5,
							"totalPrice": 34.5,
							"createAt": "2020-04-21 11:43:55"
						}
					]
				}
			}
		},
		onLoad() {

		},
		methods: {
			getDetail() {
				let params = this.id
				this.httpUtil.get1('/api/school/order/', params, (obj) => {
					console.log(obj)
					obj.data.date = obj.data.mealDate.split(' ')[0]
					this.order = obj.data
				})
			},
			cancelClick() {
				let that = this
				uni.showModal({
					content: '是否取消订单',
					cancelColor: '#FFBA59',
					confirmColor: '#999',
					confirmText: '取消订单',
					cancelText: '否',
					success(res) {
						if (res.confirm == true) {
							let params = {
								id: that.id
							}
							that.httpUtil.post2('/api/school/order/cancel', params, (obj) => {
								that.order.orderState = 'CANCELED'
								that.$forceUpdate()
								uni.showToast({
									title: '取消成功',
									icon: 'none',
									duration: 1500
								})
							})
						}
					},

				})
			},
			addCommon(id) {
				uni.navigateTo({
					url: "../index/comment/addComment?id=" + this.id
				})
			},
			payClick(id) {
				let params = {
					id: this.id
				}
				this.httpUtil.post2('/api/school/order/pay', params, (obj) => {
					if (obj.code == 200) {
						WeixinJSBridge.invoke('getBrandWCPayRequest', {
							'appId': obj.data.appId,
							'timeStamp': obj.data.timeStamp,
							'nonceStr': obj.data.nonceStr,
							'package': obj.data.package,
							'signType': obj.data.signType,
							'paySign': obj.data.paySign
						}, function(res) {

							let param = {
								outTradeNo: obj.data.outTradeNo,

							}
							if (res.err_msg === 'get_brand_wcpay_request:ok') {
								param.result = 'PAID'
								uni.showToast({
									title: "支付成功",
									icon: "none",
									duration: 1500
								})
								this.httpUtil.post2('/api/school/order/pay-result', param, (obj) => {
									uni.navigateBack({

									})
								})
							} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
								param.result = 'CANCELED'
								uni.showToast({
									title: "取消支付",
									icon: "none",
									duration: 1500
								})
								this.httpUtil.post2('/api/school/order/pay-result', param, (obj) => {
									uni.navigateBack({

									})
								})
							}

						});

					} else {
						uni.showToast({
							title: obj.msg,
							icon: 'none',
							duration: 1500
						})
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
		font-size: 28upx;
	}

	.order_status {
		font-size: 36upx;
		color: #333333;
		padding-top: 20upx;
		padding-left: 24upx;
	}

	.foods_view {
		width: 710upx;

		background: #FFFFFF;
		padding: 0 24upx;
		box-sizing: border-box;
		margin: 20upx auto;
		border-radius: 14upx;
	}

	.foods {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0;
	}

	.title {
		padding: 20upx 0;
		border-bottom: 2upx solid #F5F5F5;
		font-weight: bold;
	}

	.order_info_view {
		width: 710upx;
		border-radius: 14upx;
		margin: 0 auto;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		padding: 0 24upx 24upx;
		box-sizing: border-box;
	}

	.order_time {
		padding: 10upx 0;
	}

	.bottom_view {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 108upx;
		box-shadow: -10upx -10upx 20upx 4upx rgba(0, 0, 0, .1);
	}

	.order_btn {
		width: 148upx;
		height: 68upx;
		line-height: 68upx;
		background: #FFBA59;
		text-align: center;
		font-size: 24upx;
		color: #FFFFFF;
		border-radius: 24upx;
		margin-left: 10upx;
	}

	.order_btn1 {
		background: #FFFFFF !important;
		color: #999 !important;
		width: 144upx !important;
		height: 64upx !important;
		line-height: 64upx !important;
		border: 2upx solid #999 !important;
	}
</style>
