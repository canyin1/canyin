<template>
	<view class="page">
		<navbar title="订单详情" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="order_status" v-if="order.orderState=='NOT_PAY'">订单未支付</view>
		<view class="order_status" v-if="order.orderState=='PAID'">未就餐</view>
		<view class="order_status" v-if="order.orderState=='NOT_COMMENT'">未评论</view>
		<view class="order_status" v-if="order.orderState=='FINISH'">订单已完成</view>
		<view class="order_status" v-if="order.orderState=='CANCELED'">订单已取消</view>
		<view class="order_time" v-if="order.mealTime=='BREAKFAST'">早餐</view>
		<view class="order_time" v-if="order.mealTime=='LUNCH'">午餐</view>
		<view class="order_time" v-if="order.mealTime=='DINNER'">晚餐</view>
		<view class="order_time" v-if="order.mealTime=='SUPPER'">夜宵</view>
		<view class="foods_view">
			<view class="foods" v-for="(item,index) in order.detailList" :key="index">

			</view>
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
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
	}

	.order_status {
		font-size: 36upx;
		color: #333333;
		padding-top: 20upx;
		padding-left: 24upx;
	}
</style>
