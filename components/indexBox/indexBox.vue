<template>
	<view class="page">
		<view class="scroll2" @click="bugClick(0)">
			<view class="scroll_img_view">
				<image class="scroll_img" src="/static/breakfast.jpg" mode="aspectFill"></image>
			</view>
			<view class="name_view">
				<view class="top_name">{{item.title}} <text>Breakfast</text> </view>
				<view class="time time1" v-if="item.bookingState=='NOT_BOOK'">未预定</view>
				<view class="time" v-if="item.bookingState!='NOT_BOOK'">已预定</view>
				<view class="intro">美好的一天从早餐开始~</view>
			</view>
		</view>
		<!-- <view class="scroll2" @click="bugClick(1)">
			<view class="scroll_img_view">
				<image class="scroll_img" src="/static/lunch.jpg" mode="aspectFill"></image>
			</view>
			<view class="name_view">
				<view class="top_name">午餐 <text>Lunch</text></view>
				<view class="time" :class="indexList.bookingState=='NOT_BOOK'?'time1':''">未预定</view>
				<view class="intro">学习再忙也要记得吃午餐哦~</view>
			</view>
		</view>
		<view class="scroll2" @click="bugClick(2)">
			<view class="scroll_img_view">
				<image class="scroll_img" src="/static/dinner.jpg" mode="aspectFill"></image>
			</view>
			<view class="name_view">
				<view class="top_name">晚餐 <text>Dinner</text></view>
				<view class="time" :class="indexList.bookingState =='NOT_BOOK'?'time1':''">未预定</view>
				<view class="intro">来一份美味的晚餐消除一天的疲劳~</view>
			</view>
		</view>
		<view class="scroll2" @click="bugClick(3)">
			<view class="scroll_img_view">
				<image class="scroll_img" src="/static/supper.jpg" mode="aspectFill"></image>
			</view>
			<view class="name_view">
				<view class="top_name">宵夜 <text>Supper</text></view>
				<view class="time" :class="indexList.bookingState=='NOT_BOOK'?'time1':''">未预定</view>
				<view class="intro">夜晚的肚子总是容易抗议~</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		name: 'indexBox',
		props: [
			'item'
		],
		data() {
			return {
				type: true
			}
		},
		onLoad() {

		},
		methods: {
			bugClick(type) {
				uni.navigateTo({
					url: "../index/choose?type=" + type
				})
			},
		}
	}
</script>

<style>
	.top_name {
		font-size: 36upx;
		color: #222;
		font-weight: 400;
		line-height: 1;
		font-weight: bold;
	}
	.top_name text{
		font-size: 24upx;
		color: #999999;
		padding-left: 20upx;
	}
	.time {
		font-size: 24upx;
		line-height: 1;
		color: #333;
	}
	.time1{
		color: #FF374E !important;
	}
	.intro {
		font-size: 26upx;
		color: #999999;
		line-height: 1;
	}

	.scroll_img_view {
		font-size: 0;
	}

	.scroll_img {
		width: 220upx;
		height: 180upx;
		border-radius: 10upx;
	}

	.name_view {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		height: 180upx;
		padding: 12upx 20upx;
		padding-right: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.scroll2 {
		width: 710upx;
		background-color: #FFFFFF;
		height: 240upx;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 24upx;
		box-sizing: border-box;
		margin: 20upx auto;
		border-radius: 14upx;
		box-shadow: 10upx 10upx 40upx rgba(0,0,0,.1);
	}

	.scroll2:last-of-type {
		border: none;
	}
</style>
