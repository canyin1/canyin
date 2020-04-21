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
				<!-- <orderItem v-for='(item,index) in orders' :key="index" :item='item'></orderItem> -->
				<view class="order" v-for='(item,index) in orders' :key="index">
					<view class="student">学生：{{item.student.name}}</view>
					<view class="order_top">
						<view class="order_time">{{item.date}}</view>
						<view class="order_time" v-if="item.mealTime=='BREAKFAST'">早餐</view>
						<view class="order_time" v-if="item.mealTime=='LUNCH'">午餐</view>
						<view class="order_time" v-if="item.mealTime=='DINNER'">晚餐</view>
						<view class="order_time" v-if="item.mealTime=='SUPPER'">夜宵</view>
						<view class="order_status" v-if="item.orderState=='NOT_PAY'">未支付</view>
						<view class="order_status" v-if="item.orderState=='PAID'">未就餐</view>
						<view class="order_status" v-if="item.orderState=='NOT_COMMENT'">未评论</view>
						<view class="order_status" v-if="item.orderState=='FINISH'">已完成</view>
						<view class="order_status" v-if="item.orderState=='CANCELED'">已取消</view>
					</view>
					<view class="order_top" v-for="(items,index2) in item.detailList" :key="index2">
						<view class="goods_left">
							
							<view class="goods_name">{{items.itemName}}</view>
						</view>
						<view class="goods_right">
							<view class="goods_cash">￥{{items.itemPrice}}</view>
						</view>
					</view>
					<view class="order_top">
						<view class="order_num">总价：￥{{item.totalPrice}}</view>
						<view class="order_btn_view">
							<view class="order_btn order_btn1" v-if="item.orderState!='FINISH'||item.orderState!='CANCELED'" @click="cancelClick(item.id)">取消订单</view>
							<view class="order_btn" v-if="item.orderState=='NOT_PAY'" @click="payClick(item.id)">立即支付</view>
							<view class="order_btn" v-if="item.orderState=='NOT_COMMENT'" @click="addCommon(item.id)">立即评论</view>
							
						</view>
					</view>
				</view>
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
			
		},
		onShow() {
			this.orders = []
			this.orderList()
		},
		methods:{
			cancelClick(id){
				let that = this
				uni.showModal({
					content:'是否取消订单',
					cancelColor:'#FFBA59',
					confirmColor:'#999',
					confirmText:'取消订单',
					cancelText:'否',
					success(res) {
						if(res.confirm==true){
							let params={
								id:id
							}
							that.httpUtil.post2('/api/school/order/cancel',params,(obj)=>{
								let orders = that.orders
								for(let i =0;i<orders.length;i++){
									if(orders[i].id ==id){
										orders[i].orderState = 'CANCELED'
										break;
									}
								}
								that.orders = orders
								that.$forceUpdate()
								uni.showToast({
									title:'取消成功',
									icon:'none',
									duration:1500
								})
							})
						}
					},
					
				})
			},
			addCommon(id) {
				uni.navigateTo({
					url: "../../pages/index/comment/addComment?id=" + id
				})
			},
			payClick(id) {
				let params = {
					id: id
				}
				this.httpUtil.post2('/api/school/order/pay', params, (obj) => {
					if (obj.code == 200) {
						WeixinJSBridge.invoke('getBrandWCPayRequest', {
							'appId': obj.data.appId,
							'timeStamp': obj.data.timeStamp,
							'nonceStr': obj.data.nonceStr,
							'package': obj.data.packageOne,
							'signType': obj.data.signType,
							'paySign': obj.data.paySign
						}, function(res) {
			
							let param = {
								outTradeNo: obj.data.outTradeNo,
			
							}
							if (res.err_msg === 'get_brand_wcpay_request:ok') {
								param.result = 'PAID'
								uni.showToast({
									title: "支付成功",
									icon: "none",
									duration: 1500
								})
							this.httpUtil.post2('/api/school/order/pay-result',param,(obj)=>{
								uni.switchTab({
									url: '../tabbar/myOrder'
								})
							})
							} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
								param.result = 'CANCELED'
								uni.showToast({
									title: "取消支付",
									icon: "none",
									duration: 1500
								})
							this.httpUtil.post2('/api/school/order/pay-result',param,(obj)=>{
								uni.switchTab({
									url: '../tabbar/myOrder'
								})
							})
							}
							
						});
			
					}
					else{
						uni.showToast({
							title: obj.msg,
							icon:'none',
							duration:1500
						})
					}
				})
			},
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
	.order {
		width: 710upx;
		padding: 32upx;
		border-radius: 14upx;
		margin: 10upx auto 0;
		background: #FFFFFF;
		box-sizing: border-box;
		box-shadow: 10upx 10upx 40upx rgba(0, 0, 0, .1);
	}
	
	.order_top {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 20upx;
	}
	
	.order_top:last-of-type {
		padding-bottom: 0;
	}
	
	.order_num {
		font-size: 26upx;
		color: #333333;
		line-height: 1;
	}
	
	.order_status {
		font-size: 24upx;
		color: #999999;
		line-height: 1;
	}
	
	.order_time {
		font-size: 26upx;
		color: #333333;
		line-height: 1;
	}
	
	.order_btn_view {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	
	.order_btn {
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
	
	.order_btn1 {
		background: #FFFFFF !important;
		color: #999 !important;
		width: 144upx !important;
		height: 44upx !important;
		line-height: 44upx !important;
		border: 2upx solid #999 !important;
	}
	
	.goods_left {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 80%;
	}
	
	.goods_img_view {
		font-size: 0;
	}
	
	.goods_name {
		font-size: 26upx;
		line-height: 1.5;
		color: #333333;
	}
	
	.good_img {
		width: 120upx;
		height: 120upx;
		border-radius: 9upx;
	}
	
	.goods_right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		width: 20%;
	}
	
	.goods_cash {
		font-size: 26upx;
		line-height: 1;
		color: #333333;
	
	}
	
	.goods_num {
		font-size: 24upx;
		line-height: 1;
		color: #999999;
	}
	.price_view{
		font-size: 26upx;
	}
</style>
