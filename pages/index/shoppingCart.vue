<template>
	<view class="page">
		<navbar title="购物车" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="foods_view">
			<view class="foods_box" v-for="(item,index) in foods" :key="index">
				<view class="date">{{index}}</view>
				<view class="foods" v-for="(items,indexs) in item" :key="indexs">
					<view class="foods_left">
						<view class="foods_state" v-if="items.type=='breakfast'">早餐</view>
						<view class="foods_state" v-if="items.type=='lunch'">午餐</view>
						<view class="foods_state" v-if="items.type=='dinner'">晚餐</view>
						<view class="foods_state" v-if="items.type=='supper'">宵夜</view>
						<view class="name">{{items.name}}<view class="num">{{items.amount}}份</view></view>
					</view>
					<view class="price">￥{{items.price}}</view>
				</view>
				
			</view>
		</view>
		<view class="bottom_view">
			<view class="money_view" :class="price==0?'money_view1':''">
				<span class='iconfont icon-gouwuche'></span>
				<view class="money">￥{{price}}</view>
			</view>
			<view class="buy_btn" @click="payClick">去结算</view>
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
				price:0,
				foods:{}
			}
		},
		onLoad() {
			this.price=uni.getStorageSync('price').toFixed(2)
			this.getFoodList()
		},
		methods:{
			getFoodList(){
				let shoppingList = {}
				if(uni.getStorageSync('shoppingCarList')){
					shoppingList = uni.getStorageSync('shoppingCarList')
					
					this.foods = shoppingList
					console.log(this.foods)
				}
				
			},
			payClick(){
				let i = this.foods
				// let toFoods = {}
				let toFoodsList = []
				let date = []
				for(let j in i ){
					date.push(j)
				}
				for(let k = 0;k<date.length;k++){
					console.log(date[k])
					let z = date[k]
					let toFoods = {
						date:'',
						breakfast:[],
						lunch:[],
						dinner:[],
						supper:[]
					}
					let foods = {
						id:'',
						amount:''
					}
					toFoods.date = z
					for(let o = 0;o<i[z].length;o++){
						if(i[z][o].type=='breakfast'){
							foods.id = i[z][o].id
							foods.amount = i[z][o].amount
							toFoods.breakfast.push(foods)
						}
						if(i[z][o].type=='lunch'){
							foods.id = i[z][o].id
							foods.amount = i[z][o].amount
							toFoods.lunch.push(foods)
						}
						if(i[z][o].type=='dinner'){
							foods.id = i[z][o].id
							foods.amount = i[z][o].amount
							toFoods.dinner.push(foods)
						}
						if(i[z][o].type=='supper'){
							foods.id = i[z][o].id
							foods.amount = i[z][o].amount
							toFoods.supper.push(foods)
						}
					}
					toFoodsList.push(toFoods)
					
				}
				let params={
					childId: 1,
					bookInfo:toFoodsList
				}
				console.log(toFoodsList)
				this.httpUtil.post2('/api/school/book',params,(obj)=>{
					console.log(555,obj)
				})
				return false
				uni.navigateTo({
					url:'pay'
				})
			},
		}
	}
</script>

<style>
	page{
		background: #F5F5F5;
		color: #333333;
		font-size: 28upx;
	}
	.bottom_view {
		background: #F1F1F1;
		height: 100upx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 12upx;
		box-sizing: border-box;
		box-shadow: 0 -10upx 20upx rgba(0, 0, 0, 0.1);
	}
	
	.money_view {
		display: flex;
		align-items: center;
		color: #FFBA59;
	}
	
	.money_view1{
		color: #333333;
	}
	.icon-gouwuche {
		font-size: 60upx;
	}
	
	.money {
		font-size: 32upx;
		padding-left: 10upx;
	}
	
	.buy_btn {
		width: 148upx;
		height: 68upx;
		color: #fff;
		font-size: 26upx;
		line-height: 68upx;
		background:linear-gradient(270deg,rgba(249,128,80,1) 1%,rgba(255,186,89,1) 100%);
		border-radius: 44upx;
		text-align: center;
	}
	.date{
		font-size: 30upx;
		padding: 10upx 24upx;
	}
	.foods{
		width: 100%;
		padding: 10upx 24upx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
	}
	.foods_left{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.foods_state{
		color: #999999;
	}
	.name{
		padding-left: 20upx;
		display: flex;
		flex-direction: row;
	}
	.num{
		padding-left: 20upx;
	}
</style>
