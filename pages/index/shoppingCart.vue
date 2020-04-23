<template>
	<view class="page">
		<navbar title="购物车" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="stu">学生：{{student}}</view>
		<view class="foods_view">
			<view class="foods_box" v-for="(item,index) in foods" :key="index">
				<view class="date">{{index}}</view>
				<view class="foods" v-for="(items,indexs) in item" :key="indexs">
					<view class="foods_left">
						<view class="foods_state" v-if="items.type=='breakfast'">早餐</view>
						<view class="foods_state" v-if="items.type=='lunch'">午餐</view>
						<view class="foods_state" v-if="items.type=='dinner'">晚餐</view>
						<view class="foods_state" v-if="items.type=='supper'">宵夜</view>
						<view class="name">{{items.name}}
							<view class="num">{{items.amount}}份</view>
						</view>
					</view>
					<view class="price">￥{{items.price*items.amount}}
						<view class="del" @click="delClick(items.price,items.amount,items.id,items.type,index)">删除</view>
					</view>
				</view>

			</view>
		</view>
		<view class="chooseWindow_view" v-if="boxType">
			<view class="chooseBg" @click.stop="closeClick"></view>
			<view class="chooseWindow">
				<view class="choose_text">删除数量</view>
				<view class="box">
					<input class="input" type="number" :value="value" placeholder="数量" @input="inputClick" />
				</view>
				<view class="btn_view">
					<view class="choose_btn choose_btn1" @click="allClick">全部</view>
					<view class="choose_btn" @click="delClick1">删除</view>
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
	export default {
		components: {
			navbar
		},
		data() {
			return {
				price: 0,
				foods: {},
				student: '',
				boxType: false,
				param: {},
				value: '',
				studentId:''
			}
		},
		onLoad(options) {
			this.student = options.student
			this.studentId = options.studentId
			this.price = uni.getStorageSync('price').toFixed(2)
			this.getFoodList()
		},
		methods: {
			inputClick(e) {
				this.value = e.detail.value
			},
			allClick(amount) {
				this.value = this.param.amount
			},
			delClick(price, amount, id, type, index) {
				this.boxType = true
				this.param = {
					price: price,
					id: id,
					amount: amount,
					type: type,
					index: index
				}
			},
			closeClick() {
				this.param = {}
				this.boxType = false
			},
			delClick1() {
				if (this.value == '') {
					return false
				}
				this.param.amount = this.value
				let prices = ''
				if (uni.getStorageSync('price')) {
					prices = uni.getStorageSync('price')
				} else {
					prices = 0
				}
				let shoppingCarList = uni.getStorageSync('shoppingCarList')
				for (let i = 0; i < shoppingCarList[this.param.index].length; i++) {
					let o = shoppingCarList[this.param.index][i]
					if (o.id == this.param.id && o.type == this.param.type) {
						o.amount = o.amount - this.param.amount
						if (o.amount == 0) {
							shoppingCarList[this.param.index].splice(i, 1)
						}
						break;
					}
				}
				let x = this.param.price * this.param.amount
				prices = prices - x
				uni.setStorageSync("price", prices)
				uni.setStorageSync("shoppingCarList", shoppingCarList)
				this.boxType = false
				this.value = ''
				this.param = {}
				this.getFoodList()
			},
			getFoodList() {
				let shoppingList = {}
				if (uni.getStorageSync('shoppingCarList')) {
					shoppingList = uni.getStorageSync('shoppingCarList')
					
					let k = {}
					for (let y in shoppingList) {
						if (shoppingList[y].length!=0 ) {
							k[y] = shoppingList[y]
						}
					};
					this.foods = k
					console.log(this.foods)
					uni.setStorageSync("shoppingCarList", k)
					this.$forceUpdate()
				}

			},
			payClick() {
				let i = this.foods
				let that = this
				// let toFoods = {}
				let toFoodsList = []
				let date = []
				for (let j in i) {
					date.push(j)
				}
				for (let k = 0; k < date.length; k++) {
					
					let z = date[k]
					let toFoods = {
						date: '',
					}
					let foods = {
						id: '',
						amount: ''
					}
					toFoods.date = z
					for (let o = 0; o < i[z].length; o++) {
						if(!toFoods[i[z][o].type]){
							toFoods[i[z][o].type]=[]
						}
						foods.id = i[z][o].id
						foods.amount = i[z][o].amount
						toFoods[i[z][o].type].push(foods)
					}
					toFoodsList.push(toFoods)

				}
				let params = {
					childId: this.studentId,
					bookInfo: toFoodsList
				}
				console.log(toFoodsList)
				this.httpUtil.post2('/api/school/book', params, (obj) => {

					if (obj.code == 200) {
						uni.removeStorageSync('shoppingCarList')
						uni.removeStorageSync('price')
						WeixinJSBridge.invoke('getBrandWCPayRequest', {
							'appId': obj.data.appId,
							'timeStamp': obj.data.timeStamp,
							'nonceStr': obj.data.nonceStr,
							'package': obj.data.package,
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
								
								that.httpUtil.post2('/api/school/order/pay-result', param, (obj) => {
									
								})
							} else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
								param.result = 'CANCELED'
								uni.showToast({
									title: "取消支付",
									icon: "none",
									duration: 1500
								})
								
								that.httpUtil.post2('/api/school/order/pay-result', param, (obj) => {
									
								})
							}
								uni.switchTab({
									url: '../tabbar/myOrder'
								})
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
		}
	}
</script>

<style>
	page {
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

	.money_view1 {
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
		background: linear-gradient(270deg, rgba(249, 128, 80, 1) 1%, rgba(255, 186, 89, 1) 100%);
		border-radius: 44upx;
		text-align: center;
	}

	.date {
		font-size: 30upx;
		padding: 10upx 24upx;
	}

	.foods {
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

	.foods_left {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.foods_state {
		color: #999999;
	}

	.name {
		padding-left: 20upx;
		display: flex;
		flex-direction: row;
	}

	.num {
		padding-left: 20upx;
	}

	.stu {
		padding: 10upx 24upx;
		width: 100%;
		box-sizing: border-box;
		background: #FFFFFF;
	}

	.price {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 25%;
	}

	.del {
		color: #999999;
		text-decoration: underline;
	}

	/* 弹窗 */
	.chooseBg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 1666upx;
		background: #000000;
		opacity: 0.5;
		z-index: 100000;
	}

	.chooseWindow {
		width: 240upx;
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
		margin-left: -120upx;
	}

	.choose_text {
		color: #333333;
		line-height: 1;
		margin-bottom: 48upx;
		width: 100%;
		text-align: center;
	}

	.text {
		padding-right: 80upx;
	}

	.chooseWindow_view {
		z-index: 998;
	}

	.choose_btn {
		width: 80upx;
		height: 50upx;
		font-size: 24upx;
		color: #FFFFFF;
		background: #FFBA59;
		border-radius: 24upx;
		text-align: center;
		line-height: 50upx;
		margin-top: 40upx;
	}

	.input {
		width: 120upx;
		background: #f3eded;
		border-radius: 14upx;
		text-align: center;
		font-size: 28upx;
		height: 50upx;
	}

	.box {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.btn_view {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: space-around;
	}

	.choose_btn1 {
		background-color: #bdbdbd;
	}
</style>
