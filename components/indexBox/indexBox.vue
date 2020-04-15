<template>
	<view class="page">
		<view class="scroll2" @click="bugClick(typeSubList.id)">
			
			<view class="name_view">
				<view class="top_name">{{typeSubList.name}}</view>
				<view class="time">早上7:00-8:00</view>
				<view class="intro">美好的一天从早餐开始~</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'indexBox',
		props:[
			'typeSubList'
		],
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			bugClick(id) {
				uni.navigateTo({
					url: "../index/choose?id=" + id
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
	}

	.time {
		font-size: 24upx;
		line-height: 1;
		color: #333;
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
		width: 180upx;
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
		width: 100%;
		background-color: #FFFFFF;
		height: 240upx;
		border-bottom: 20upx solid #F5F5F5;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 24upx;
		box-sizing: border-box;
	}
	.scroll2:last-of-type{
		border: none;
	}
</style>
