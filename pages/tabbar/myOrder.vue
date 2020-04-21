<template>
	<view class="page">
		<navbar title="我的订单" :backcolorType='2' :showKongPanel="true" :whiteback='2'></navbar>
		<view class="tab_view" :style='{top:heights +"px"}'>
			<view class="tab_box">
				<view class="tab" :class="{active:tabType==0}" @click="tabClick(0)">全部</view>
				<view class="tab" :class="{active:tabType==1}" @click="tabClick(1)">已完成</view>
				<view class="tab" :class="{active:tabType==2}" @click="tabClick(2)">未评论</view>
			</view>
		</view>
		<view class="kongHeights"></view>
		<view class="order_view">
			<block v-if="orders.length>0">
				<orderItem v-for='(item,index) in orders' :key="index" :item='item'></orderItem>
			</block>
			<block v-if="orders.length==0">
				<view class="no_order">还没有订单哦~</view>
				<view class="btn" @click="goIndex">去下单</view>
			</block>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import orderItem from "@/components/orderItem/orderItem.vue"
	export default {
		onReady() {
			this.heights = this.$store.state.kongHeight
		},
		components: {
			navbar,
			orderItem
		},
		data(){
			return{
				tabType:0,
				heights:'',
				orders:[],
				orderState:''
			}
		},
		onLoad() {
			this.orderList()
		},
		methods:{
			goIndex(){
				uni.switchTab({
					url:'index'
				})
			},
			orderList(){
				let params={
					pageNum:1,
					pageSize:10,
					orderState: this.orderState
				}
				this.httpUtil.get("/api/school/order/list",params,(obj)=>{
					for(let i = 0 ;i<obj.rows.length;i++){
						obj.rows[i].date = obj.rows[i].mealDate.split(' ')[0]
					}
					
					this.orders = this.orders.concat(obj.rows)
					console.log(obj)
				})
			},
			tabClick(type){
				this.tabType = type
				if(type==0){
					this.orderState = ''
				}
				if(type==1){
					this.orderState = 'FINISH'
				}
				if(type==2){
					this.orderState = 'NOT_COMMENT'
				}
				this.orders = []
				this.orderList()
			},
		}
	}
</script>

<style>
	page {
		background: #F5F5F5;
	}

	.tab_view {
		height: 68upx;
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999999;
	}
	.tab_box{
		height: 48upx;
		border-radius: 64upx;
		background: #F5F5F5;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.tab{
		width: 160upx;
		font-size: 28upx;
		color: #333333;
		text-align: center;
		line-height: 48upx;
		height: 48upx;
		border-radius: 64upx;
	}
	.active{
		background: #FFBA59 !important;
		color: #FFFFFF !important;
	}
	.kongHeights{
		height: 68upx;
		width: 100%;
		opacity: 0;
	}
	.no_order{
		color: #999999;
		font-size: 28upx;
		width: 100%;
		text-align: center;
		margin-top: 300upx;
	}
	.btn{
		width: 140upx;
		height: 68upx;
		font-size: 26upx;
		color: #FFFFFF;
		background: linear-gradient(270deg, rgba(249, 128, 80, 1) 1%, rgba(255, 186, 89, 1) 100%);
		border-radius: 34upx;
		margin: 40upx auto;
		text-align: center;
		line-height: 68upx;
		box-shadow: 4upx 4upx 10upx 0 rgba(0,0,0,.1);
	}
</style>
