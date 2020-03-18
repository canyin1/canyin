<template>
	<view class="page">
		<navbar title="" :backcolorType='0' ></navbar>
		<image class="food_img" src="/static/微信图片_20200318092008.jpg" mode="aspectFill"></image>
		<view class="big_view">
			<view class="food_name">梅菜肉</view>
			<view class="sale_num">月售100份</view>
			<view class="cash_view">
				<view class="cash">￥10.00</view>
				<view class="add_btn">加入购物车</view>
			</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style>
	.food_img{
		width: 100%;
		height: 480upx;
	}
	.big_view{
		padding: 20upx 24upx;
		width: 100%;
		box-sizing: border-box;
	}
	.food_name{
		font-size: 38upx;
		line-height: 1;
		color: #333333;
		font-weight: 500;
	}
	.sale_num{
		font-size: 26upx;
		line-height: 1;
		padding-top: 30upx;
		color: #333333;
		font-weight: 400;
	}
	.cash_view{
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-top: 20upx;
	}
	.cash{
		font-size: 26upx;
		line-height: 1;
		color: #FFBA59;
		
	}
	.add_btn{
		width: 168upx;
		height: 54upx;
		border-radius: 34upx;
		background: #FFBA59;
		font-size: 26upx;
		color: #FFFFFF;
		line-height: 54upx;
		text-align: center;
		
	}
</style>
