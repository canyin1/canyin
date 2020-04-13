<template>
	<view class="page">
		<view class="order">
			<view class="order_top">
				<view class="order_time">{{item.date}}</view>
				<view class="order_time" v-if="item.mealTime=='breakfast'">早餐</view>
				<view class="order_time" v-if="item.mealTime=='lunch'">午餐</view>
				<view class="order_time" v-if="item.mealTime=='dinner'">晚餐</view>
				<view class="order_time" v-if="item.mealTime=='supper'">夜宵</view>
				<view class="order_status" v-if="item.orderState=='NOT_PAY'">未支付</view>
				<view class="order_status" v-if="item.orderState=='PAID'">未就餐</view>
				<view class="order_status" v-if="item.orderState=='NOT_COMMENT'">未评论</view>
				<view class="order_status" v-if="item.orderState=='FINISH'">已完成</view>
				<view class="order_status" v-if="item.orderState=='CANCELED'">已取消</view>
			</view>
			<view class="order_top" v-for="(items,index2) in item.detailList" :key="index2">
				<view class="goods_left">
					<view class="goods_img_view"><image class="good_img" src="/static/微信图片_20200318092008.jpg" mode="aspectFill"></image></view>
					<view class="goods_name">{{items.itemName}}</view>
				</view>
				<view class="goods_right">
					<view class="goods_cash">￥{{items.itemPrice}}</view>
					<view class="goods_num">X{{items.itemAmount}}</view>
				</view>
			</view>
			<view class="order_top">
				<view class="order_num">订单号：4545684</view>
				<view class="order_btn_view">
					<view class="order_btn order_btn1" v-if="item.orderState!='FINISH'||item.orderState!='CANCELED'">取消订单</view>
					<view class="order_btn" v-if="item.orderState=='NOT_PAY'" @click="addCommon(item.id)">立即支付</view>
					<view class="order_btn" v-if="item.orderState=='NOT_COMMENT'" @click="addCommon(item.id)">立即评论</view>
					<view class="order_btn" v-if="item.orderState=='PAID'">确认收货</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'orderItem',
		props:['item'],
		data(){
			return{
			}
		},
		methods:{
			addCommon(id){
				uni.navigateTo({
					url:"../../pages/index/comment/addComment?id=" + id
				})
			},
		}
	}
</script>

<style>
	.order{
		width: 710upx;
		padding: 32upx;
		border-radius: 14upx;
		margin: 10upx auto 0;
		background: #FFFFFF;
		box-sizing: border-box;
	}
	.order_top{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 20upx;
	}
	.order_top:last-of-type{
		padding-bottom: 0;
	}
	.order_num{
		font-size: 26upx;
		color: #333333;
		line-height: 1;
	}
	.order_status{
		font-size: 24upx;
		color: #999999;
		line-height: 1;
	}
	.order_time{
		font-size: 26upx;
		color: #333333;
		line-height: 1;
	}
	.order_btn_view{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.order_btn{
		width: 148upx;
		height: 48upx;
		line-height: 48upx;
		background: #FFBA59;
		text-align: center;
		font-size: 24upx;
		color: #FFFFFF;
		border-radius: 24upx;
		margin-left: 10upx;
	}
	.order_btn1{
		background: #FFFFFF !important;
		color: #999 !important;
		width: 144upx !important;
		height: 44upx !important;
		line-height: 44upx !important;
		border: 2upx solid #999 !important;
	}
	.goods_left{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 80%;
	}
	.goods_img_view{
		font-size: 0;
	}
	.goods_name{
		font-size: 26upx;
		line-height: 1.5;
		color: #333333;
		padding-left: 20upx;
	}
	.good_img{
		width: 120upx;
		height: 120upx;
		border-radius: 9upx;
	}
	.goods_right{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		width: 20%;
	}
	.goods_cash{
		font-size: 26upx;
		line-height: 1;
		color: #333333;
		
	}
	.goods_num{
		font-size: 24upx;
		line-height: 1;
		color: #999999;
	}
</style>
