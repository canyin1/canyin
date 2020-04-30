<template>
	<view class="comment_detail">
		<view class="top_view">
			<view class="player_view">
				<view class="player_img_view">
					<image class="player_img" src="/static/meHL.png" mode=""></image>
				</view>
				<view class="player_name_view">
					<view class="player_name">名字</view>
					<view class="level_view">
						<level :levels="5"></level>
					</view>
				</view>
			</view>
			<view class="time_view">2020-01-02</view>
		</view>
		<view class="comment">真好吃！！！</view>
		<view class="image_view">
			<image class="comment_img" src="/static/微信图片_20200318092008.jpg" mode=""></image>
			<image class="comment_img" src="/static/微信图片_20200318092008.jpg" mode=""></image>
			<image class="comment_img" src="/static/微信图片_20200318092008.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import level from '@/components/level/level.vue'
	export default{
		name: 'commentDetail',
		props:['item'],
		components:{
			level
		},
		data(){
			return{
				levels:'5'
			}
		},
		onLoad() {
			
		},
		methods:{
		}
	}
</script>

<style>
	
	
	.comment_detail{
		width: 710upx;
		background: #FFFFFF;
		border-radius: 24upx;
		padding: 32upx 24upx;
		box-sizing: border-box;
		margin: 20upx auto 0;
	}
	.top_view{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.player_view{
		display: flex;
		align-items: center;
	}
	.player_img_view{
		font-size: 0;
	}
	.player_img{
		width: 68upx;
		height: 68upx;
		border-radius: 50%;
	}
	.player_name_view{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		padding-left: 20upx;
		height: 68upx;
	}
	.player_name{
		font-size: 28upx;
		color: #333333;
		line-height: 1;
	}
	.time_view{
		font-size: 24upx;
		color: #999;
	}
	.comment{
		font-size: 32upx;
		padding: 32upx 0;
		padding-left: 88upx;
		width: 100%;
		box-sizing: border-box;
		color: #333333;
	}
	.image_view{
		padding-left: 88upx;
		font-size: 0;
	}
	.comment_img{
		width: 150upx;
		height: 150upx;
		margin-right: 10upx;
	}
	.comment_img:last-of-type{
		margin-right: 0;
	}
</style>
