<template>
	<view class="order">
		<view class="order_top">
			<view class="order_time">3月10日</view>
			<view class="order_time">晚餐</view>
			<view class="order_status">未就餐</view>
		</view>
		<view class="order_top">
			<view class="goods_left">
				<view class="goods_img_view"><image class="good_img" src="/static/微信图片_20200318092008.jpg" mode="aspectFill"></image></view>
				<view class="goods_name">名字</view>
			</view>
			<view class="goods_right">
				<view class="goods_cash">￥10.00</view>
				<view class="goods_num">X1</view>
			</view>
		</view>
		<view class="order_top">
			<view class="order_num">订单号：4545684</view>
			<view class="order_btn">取消订单</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'orderItem',
		props:{
		},
		data(){
			return{
				
			}
		},
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
	.order_btn{
		width: 148upx;
		height: 48upx;
		line-height: 48upx;
		background: #FFBA59;
		text-align: center;
		font-size: 24upx;
		color: #333333;
		border-radius: 24upx;
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
