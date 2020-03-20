<template>
	<view class="page">
		<navbar title="" :backcolorType='0' ></navbar>
		<image class="food_img" src="/static/微信图片_20200318092008.jpg" mode="aspectFill"></image>
		<view class="big_view">
			<view class="food_name">梅菜肉</view>
			<view class="sale_num">月售100份</view>
			<view class="cash_view">
				<view class="cash">￥10.00</view>
				<view class="btn_view">
					<view class="collect_btn">收藏</view>
					<view class="add_btn" @click="addGoodsClick">加入购物车</view>
				</view>
			</view>
		</view>
		<view class="food_introduction">
			<view class="top_view">
				商品简介
			</view>
			<view class="introduction">梅菜+肉</view>
		</view>
		<view class="comment_view" @click="commentClick">
			<view class="comment">商品评论(5)</view>
			<span class="iconfont icon-jiantou"></span>
		</view>
		<view class="chooseWindow_view">
			<view class="chooseBg"></view>
			<view class="chooseWindow">
				<text>请选择</text>
				<view class="box">
					<text>学生:</text>
					<view class="checkbox">
						<checkbox-group>
							<label v-for="(item,index) in student" :key='index' @click='checkClick(item.id)'>
								<checkbox :value="item.id" :checked='item.checked'  /><text>{{item.name}}</text>
							</label>
						</checkbox-group>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	export default{
		components: {
			navbar
		},
		data(){
			return{
				boxType:false,
				student:[{
					'name':'1',
					'id': '1',
					checked:false
				},
				{
					'name':'2',
					'id': '2',
					checked:false
				}],
				allId:[]
			}
		},
		onLoad() {
			
		},
		methods:{
			commentClick(){
				uni.navigateTo({
					url:'comment/comment'
				})
			},
			addGoodsClick(){
				this.boxType = true
			},
			checkClick(id){
				console.log(id)
				for(let i = 0;i<this.student.length;i++){
					if(this.student[i].id==id){
						this.student[i].checked = !this.student[i].checked
						console.log('111',this.student)
						break;
					}
				}
			},
		}
	}
</script>

<style>
	page{
		color: #333333;
	}
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
		box-sizing: border-box;
		padding: 20upx 24upx;
		position: fixed;
		bottom: 0;
		left: 0;
		box-shadow: 0 -10upx 20upx rgba(0,0,0,0.1);
	}
	.cash{
		font-size: 36upx;
		line-height: 1;
		color: #FFBA59;
		
	}
	.add_btn{
		width: 168upx;
		height: 54upx;
		border-top-right-radius: 24upx;
		border-bottom-right-radius: 24upx;
		background: #FFBA59;
		font-size: 26upx;
		color: #FFFFFF;
		line-height: 54upx;
		text-align: center;
	}
	.top_view{
		font-size: 38upx;
		width: 100%;
		padding: 20upx 24upx;
		color: #333333;
		border-bottom: 4upx solid #F5F5F5;
	}
	.introduction{
		font-size: 26upx;
		line-height: 1;
		padding-top: 32upx;
		padding-left: 24upx;
		color: #333333;
	}
	.comment_view{
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;
		padding: 60upx 24upx 24upx;
		width: 100%;
		border-bottom: 1upx solid #F5F5F5;
		box-sizing: border-box;
	}
	.comment{
		font-size: 38upx;
		line-height: 1;
		color: #333333;
		font-weight: 400;
		opacity: 0.9;
	}
	.icon-jiantou{
		font-size: 32upx;
		color: #333333;
		font-weight: 400;
		opacity: 0.9;
	}
	.btn_view{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.collect_btn{
		width: 140upx;
		height: 54upx;
		border-top-left-radius: 24upx;
		border-bottom-left-radius: 24upx;
		background: #FF4D4C;
		font-size: 26upx;
		color: #FFFFFF;
		line-height: 54upx;
		text-align: center;
	}
	.box{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	checkbox-group{
		padding-left: 20upx;
	}
	label{
		padding-right: 20upx;
	}
	label:last-of-type{
		padding-right: 0;
	}
</style>
