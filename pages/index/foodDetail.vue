<template>
	<view class="page">
		<navbar title="" :backcolorType='0' ></navbar>
		<image class="food_img"  :src="food.imgs" mode="aspectFill"></image>
		<view class="big_view">
			<view class="food_name">{{food.name}}</view>
			<view class="sale_num">月售{{food.monthlySales}}份</view>
		</view>
		<view class="food_introduction">
			<view class="top_view">
				商品简介
			</view>
			<view class="introduction">{{food.name}}</view>
		</view>
		<view class="comment_view" @click="commentClick">
			<view class="comment">商品评论({{food.commentAmount}})</view>
			<span class="iconfont icon-jiantou"></span>
		</view>
		<view class="cash_view">
			<view class="cash">￥{{food.price}}</view>
			<view class="btn_view">
				<view class="collect_btn">收藏</view>
				<view class="add_btn" @click="addGoodsClick">加入购物车</view>
			</view>
		</view>
		<view class="chooseWindow_view" v-if="boxType">
			<view class="chooseBg"></view>
			<view class="chooseWindow">
				<view class="choose_text">请选择</view>
				<view class="box">
					<view class="text">学生:</view>
					<view class="checkbox">
						<checkbox-group>
							<label v-for="(item,index) in student" :key='index' @click='checkClick(item.id)'>
								<checkbox :value="item.id" :checked='item.checked'  style="transform:scale(0.7)" /><text>{{item.name}}</text>
							</label>
						</checkbox-group>
					</view>
				</view>
				<view class="choose_btn">添加</view>
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
					name:'周速度',
					id: '1',
					checked:false
				},
				{
					name:'放方法',
					id: '2',
					checked:false
				},
				// {
				// 	name:'放方法',
				// 	id: '2',
				// 	checked:false
				// },
				// {
				// 	name:'放方法',
				// 	id: '2',
				// 	checked:false
				// },
				],
				allId:[],
				food:[],
				id:''
			}
		},
		onLoad(options) {
			this.id = options.id
			this.foodDetail(options.id)
		},
		methods:{
			foodDetail(id){
				let params= id
				this.httpUtil.get1('/api/school/food/',params,(obj)=>{
					if(obj.data.images&&obj.data.images!=''){
						obj.data.imgs = JSON.parse(obj.data.images)[0]
						
					}
					this.food = obj.data
					console.log(this.food)
				})
			},
			commentClick(){
				uni.navigateTo({
					url:'comment/comment?id=' + this.id
				})
			},
			addGoodsClick(){
				this.boxType = true
			},
			checkClick(id){
				for(let i = 1;i<this.student.length;i++){
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
		z-index: 1;
		box-shadow: 0 -10upx 20upx rgba(0,0,0,0.1);
	}
	.cash{
		font-size: 36upx;
		line-height: 1;
		color: #FFBA59;
		
	}
	.add_btn{
		width: 168upx;
		height: 68upx;
		border-top-right-radius: 24upx;
		border-bottom-right-radius: 24upx;
		background: #FFBA59;
		font-size: 26upx;
		color: #FFFFFF;
		line-height: 68upx;
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
		height: 68upx;
		border-top-left-radius: 24upx;
		border-bottom-left-radius: 24upx;
		background: #FF4D4C;
		font-size: 26upx;
		color: #FFFFFF;
		line-height: 68upx;
		text-align: center;
	}
	.box{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: center;
		flex-wrap: wrap;
		font-size: 26upx;
	}
	label{
		padding-right: 40upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	label:last-of-type{
		padding-right: 0;
	}
	label text{
		font-size: 26upx;
	}
	checkbox-group{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.chooseBg{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 1666upx;
		background: #000000;
		opacity: 0.5;
		z-index: 100000;
	}
	.chooseWindow{
		width: 600upx;
		padding: 32upx 24upx;
		border-radius: 24upx;
		background: #FFFFFF;
		z-index: 100001;
		position: fixed;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		top: 20%;
		left: 50%;
		margin-left: -300upx;
	}
	.choose_text{
		color: #333333;
		line-height: 1;
		margin-bottom: 48upx;
		width: 100%;
		text-align: center;
	}
	.text{
		padding-right: 80upx;
	}
	.chooseWindow_view{
		z-index: 998;
	}
	.choose_btn{
		width: 120upx;
		height: 58upx;
		font-size: 26upx;
		color: #FFFFFF;
		background: #FFBA59;
		border-radius: 24upx;
		text-align: center;
		line-height: 58upx;
		margin-top: 40upx;
	}
</style>
