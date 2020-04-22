<template>
	<view class="page">
		<!-- <navbar title="000" :backcolorType='2' :whiteback='2' :showKongPanel="true" :downType="true" :dateType="true" @weeks='tPickerClick'
		 @food="foodTypeClick" :date='date' :date1='date1' :food='food' :typeListArr='typeListArr'></navbar> -->
		<view style="z-index: 997;">
			<view class='status_bar graybackgroud' :style="{'padding-top':pddTitleTop+'px','height':pddTitleHeight+'px'}">
				<view class="customtitlediv fontwhite" @click="chooseClick">{{food}}<span class='iconfont icon-jiantou1'></span></view>
				<view class="navback1" @click='navBack'>

					<image src="/static/back1.png" mode='aspectFit' class="back1"></image>
				</view>
				<view class="date_view">

					<picker mode="date" @change="pickerClick" @cancel="cancelClick">
						<view>{{date}} </view>
					</picker><span class='iconfont icon-jiantou1'></span>
				</view>
			</view>
			<view class="KongPanel" :style="{height:kongHeight+'px'}">

			</view>

		</view>
		<view class="scroll" :style="{height:scrollHeight +'px'}">
			<scroll-view scroll-y="true" class="scrollY" :style="{height:scrollHeight +'px'}">
				<view v-for="(item,index1) in typeSubList" :key="index1" class="scroll1" :class="index1==indexs1?'active':''"
				 @click="indexClick1(item.id)">{{item.name}}</view>
			</scroll-view>
			<view class="scrollX_view">
				<!-- <view class="tab_view">
					<view class="tab" :class="{'active1':typeAll.zongheType}" @click="tabClick('zongheType')">
						综合<span class="iconfont icon-jiantou1" :class='{"icon-jiantou2":typeAll.zongheType==2}' v-if='typeAll.zongheType'></span>
					</view>
					<view class="tab" :class="{active1:typeAll.monthType}" @click="tabClick('monthType')">
						月售<span class="iconfont icon-jiantou1" :class='{"icon-jiantou2":typeAll.monthType==2}' v-if='typeAll.monthType'></span>
					</view>
					<view class="tab" :class="{active1:typeAll.cashType}" @click="tabClick('cashType')">
						价格<span class="iconfont icon-jiantou1" :class='{"icon-jiantou2":typeAll.cashType==2}' v-if='typeAll.cashType'></span>
					</view>
					<view class="tab" :class="{active1:typeAll.levelType}" @click="tabClick('levelType')">
						评分<span class="iconfont icon-jiantou1" :class='{"icon-jiantou2":typeAll.levelType==2}' v-if='typeAll.levelType'></span>
					</view>
					<view class="tab" :class="{active1:typeAll.newType}" @click="tabClick('newType')">
						新菜<span class="iconfont icon-jiantou1" :class='{"icon-jiantou2":typeAll.newType==2}' v-if='typeAll.newType'></span>
					</view>
				</view> -->
				<scroll-view scroll-y="true" class="scrollX" :style="{height:scrollHeight +'px'}">
					<block v-if="foods.length>0">
						<view class="scroll2" v-for="(item,index2) in foods" :key='index2' @click.stop="foodClick(item.food.id,item.num,item.readyAmount,item.soldAmount)">
							<view class="no_sale" v-if="item.readyAmount<=item.soldAmount">
								<view class="no_sale_text">已售罄</view>
							</view>

							<view class="foods_left">
								<view class="foods_img_view">
									<image class="foods_img" :src="item.food.imgs" mode="aspectFill"></image>
								</view>
								<view class="foods_name_view">
									<view class="foods_name">{{item.food.name}}</view>
									<view class="foods_num">月售{{item.food.monthlySales}}</view>
									<view class="foods_cash">￥{{item.food.price}}</view>
								</view>
							</view>
							<view class="add_view">
								<view>
									<span class="iconfont icon-jianhao" v-if="item.num>0" @click.stop="reduceClick(item.food.id,item.food.price,index2)"></span>
									<text v-if="item.num>0">{{item.num}}</text>
									<span class="iconfont icon-jiahao" @click.stop="addClick(item.food.id,item.food.price,item.food.imgs,item.food.name,index2)"></span>
								</view>
							</view>
							<!-- <view class="add_btn">
								<view @click.stop="addClick(item.id,item.price,item.imgs,item.name,index2)">添加</view>
							</view> -->
						</view>
					</block>
					<block v-if="foods.length==0">
						<view class="no_foods">{{msg}}</view>
					</block>
				</scroll-view>
			</view>

		</view>
		<view class="bottom_view" @click="shoppingCarClick">
			<view class="money_view" :class="price==0?'money_view1':''">
				<span class='iconfont icon-gouwuche'></span>
				<view class="money">￥{{price}}</view>
			</view>
			<view class="buy_btn">去结算</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import popup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			navbar,
			popup
		},
		onReady() {
			let that = this
			var query = uni.createSelectorQuery().in(this);
			query.select('.scroll').boundingClientRect(data => {
				uni.getSystemInfo({
					success: function(res) {
						that.scrollHeight = res.windowHeight - data.top - 55
					}
				})
			}).exec();
		},
		created: function(e) {
			//console.log("自定义组件--------------------------------",getCurrentPages());
			this.pddTitleTop = this.$store.state.pddTitleTop;
			this.pddTitleHeight = this.$store.state.pddTitleHeight;
			this.kongHeight = this.$store.state.kongHeight;
			// if (a) {
			// 	setTimeout(() => {
			// 		this.pddTitleTop = this.$store.state.pddTitleTop;
			// 		this.pddTitleHeight = this.$store.state.pddTitleHeight;
			// 		this.kongHeight = this.$store.state.kongHeight;
			// 	}, 500)
			// }
		},
		data() {
			return {
				startDate: '',
				endDate: '',
				scrollHeight: 0,
				scrollHeight1: 0,
				indexs1: 0,
				indexs2: '',
				date: '',
				typeAll: {
					'zongheType': 0,
					'levelType': 0,
					'newType': 0,
					'monthType': 0,
					'cashType': 0,
				},
				foods: [
				// 	{
				// 	createTime: "2020-04-18 17:46:55",
				// 	food: {
				// 		afternoonTea: true,
				// 		breakfast: true,
				// 		createTime: "2020-04-21 13:04:05",
				// 		detail: "培根、青菜",
				// 		dinner: true,
				// 		id: 2,

				// 		imgs: "http://food-edu.net/api/profile/upload/2020/04/21/3269d17f5eef941ac527b809abed3915.jpg",
				// 		lunch: true,
				// 		monthlySales: 123,
				// 		morningTea: true,
				// 		name: "培根肉卷",
				// 		price: 20,
				// 		reserve: 100,
				// 		state: "1",
				// 		supper: true,
				// 	},
				// 	id: 4,
				// 	mealDate: "2020-04-21 00:00:00",
				// 	mealTime: "BREAKFAST",
				// 	merchant: Object,
				// 	readyAmount: 10,
				// 	soldAmount: 10,
				// 	school: Object,
				// }, 
				],
				foodType: ['早餐', '午餐', '晚餐', '宵夜'],
				food: '早餐',
				price: 0,
				typeList: [],
				typeList1: [],
				typeListArr: [],
				typeSubList: [],
				date1: '',
				schoolId: '',
				msg: ''
			}
		},
		onLoad(options) {
			this.food = options.food
			this.foodTy = options.type
			this.studentId = options.studentId
			this.student = options.student
			this.schoolId = options.schoolId
			this.date1 = options.date
			this.date = options.date + ' ' + options.week
			// this.getTypeSubList()
			// let date = Date.parse(new Date())
		},
		onShow() {
			// this.foods = []

			this.getTypeList()
		},
		methods: {

			pickerClick(e) {
				console.log(e)
				var arr = "日一二三四五六".split("")
				this.weeks = arr[new Date(e.detail.value).getDay()]
				console.log(999, this.weeks)
				let date = e.detail.value + ' ' + '周' + this.weeks
				this.date1 = e.detail.value
				this.date = date
				this.foods = []
				this.foodDetail()
			},
			chooseClick() {
				if (this.downType == 0) {
					return false
				}
				let that = this
				uni.showActionSheet({
					itemList: that.typeList,
					success(res) {
						that.food = that.typeList[res.tapIndex]
						that.foodTy = that.typeList1[res.tapIndex]
						that.foods = []
						that.foodDetail()

					},
				})
			},
			navBack(e) {
				var pages1 = getCurrentPages();
				let first = pages1[0];
				if (pages1.length > 1) {
					uni.navigateBack();
				} else {
					uni.switchTab({
						url: '/pages/tabbar/index'
					})
				}
			},
			getTypeList() {
				let params = {
					studentId: 1,
					mealDate: this.date1
				}
				this.httpUtil.get('/api/school/book/info', params, (obj) => {
					console.log(123, obj)
					for (let i = 0; i < obj.data.length; i++) {
						this.typeList.push(obj.data[i].title)
						this.typeList1.push(obj.data[i].titleEnum)
					}
					this.getTypeSubList()
				})
			},
			getTypeSubList() {
				let params = {

				}
				this.httpUtil.get('/api/school/foodSubType/list', params, (obj) => {
					console.log(123, obj)
					this.typeSubList = obj.rows
					this.foodDetail()
				})
			},
			foodDetail() {
				let params = {
					mealDate: this.date1,
					'school.id': this.schoolId,
					mealTime: this.foodTy

				}
				this.httpUtil.get('/api/school/foodplan/list', params, (obj) => {
					console.log(obj)
					if (obj.rows) {
						let foods = obj.rows
						let shoppingCarList = {}
						if (uni.getStorageSync('shoppingCarList')) {
							shoppingCarList = uni.getStorageSync('shoppingCarList')
							if (shoppingCarList[this.date1]) {
								for (let x = 0; x < shoppingCarList[this.date1].length; x++) {
									for (let y = 0; y < foods.length; y++) {
										if (shoppingCarList[this.date1][x].id == foods[y].id && shoppingCarList[this.date1][x].type == this.foodTy) {
											foods[y].num = shoppingCarList[this.date1][x].amount
										}
									}

								}
							}
						}
						if (foods.length != 0) {
							for (let i = 0; i < foods.length; i++) {
								if (foods[i].food.images) {
									foods[i].food.imgs = JSON.parse(foods[i].food.images)[0]
								}
								foods[i].soldAmount = foods[i].soldAmount ? foods[i].soldAmount : 0
							}
							this.foods = this.foods.concat(foods)

						} else {
							this.foods = []
						}
						if (uni.getStorageSync('price')) {
							this.price = uni.getStorageSync('price').toFixed(2)
						} else {
							this.price = 0
						}
						console.log('foods', this.foods)
					}

				}, (err) => {

					this.msg = err.msg
					this.foods = []
				})
			},
			reduceClick(id, price) {
				let shoppingCarList = uni.getStorageSync('shoppingCarList')
				for (let i = 0; i < shoppingCarList[this.date1].length; i++) {
					if (id == shoppingCarList[this.date1][i].id && shoppingCarList[this.date1][i].type == this.foodTy) {
						shoppingCarList[this.date1][i].amount--
						if (shoppingCarList[this.date1][i].amount == 0) {
							shoppingCarList[this.date1].splice(i, 1)
						}
						break
					}
				}

				let prices = ''
				if (uni.getStorageSync('price')) {
					prices = uni.getStorageSync('price')
				} else {
					prices = 0
				}

				let k = {}
				for (let y in shoppingCarList) {
					if (shoppingCarList[y].length != 0) {
						k[y] = shoppingCarList[y]
					}
				};
				prices = prices - price
				this.price = prices.toFixed(2)
				uni.setStorageSync("price", prices)
				uni.setStorageSync("shoppingCarList", k)
				this.getnum(id, 'reduce')
				// for (let i = 0; i < this.foods.length; i++) {
				// 	if (this.foods[i].id == id) {
				// 		this.foods[i].num--
				// 	}
				// }
			},
			addClick(id, price, images, name, index) {
				let shoppingCarList = {}
				let prices = ''
				if (uni.getStorageSync('price')) {
					prices = uni.getStorageSync('price')
				} else {
					prices = 0
				}

				let that = this
				let food = {
					id: '',
					amount: '',
					type: '',
					name: '',
					images: '',
					price: ''
				}
				if (uni.getStorageSync('shoppingCarList')) {
					shoppingCarList = uni.getStorageSync('shoppingCarList')
					if (shoppingCarList[this.date1]) {
						for (let i = 0; i < shoppingCarList[this.date1].length + 1; i++) {
							if (i == shoppingCarList[this.date1].length) {
								food.id = id
								food.amount = 1
								food.type = this.foodTy
								food.name = name
								food.price = price
								food.images = images
								shoppingCarList[this.date1].push(food)
								// this.getnum(id)
								break;
							}
							if (shoppingCarList[this.date1][i].id == id && shoppingCarList[this.date1][i].type == this.foodTy) {

								shoppingCarList[this.date1][i].amount++
								// this.getnum(id)
								break;
							}
						}
					} else {
						shoppingCarList[this.date1] = []
						food.id = id
						food.amount = 1
						food.type = this.foodTy
						food.name = name
						food.price = price
						food.images = images
						shoppingCarList[this.date1].push(food)
						// this.getnum(id)
					}
				} else {
					shoppingCarList[this.date1] = []
					food.id = id
					food.amount = 1
					food.type = this.foodTy
					food.name = name
					food.price = price
					food.images = images
					shoppingCarList[this.date1].push(food)
					// this.getnum(id)
				}

				this.getnum(id, 'add')
				prices = prices + price
				this.price = prices.toFixed(2)
				console.log(111, shoppingCarList)
				uni.setStorageSync("shoppingCarList", shoppingCarList)
				uni.setStorageSync("price", prices)

			},
			getnum(id, type) {
				let food = this.foods
				for (let j = 0; j < food.length; j++) {
					if (food[j].id == id) {
						if (!food[j].num) {
							food[j].num = 0
						}
						if (type == 'add') {
							food[j].num++
						}
						if (type == 'reduce') {
							food[j].num--
						}
						this.foods = food
						this.$forceUpdate()
					}
				}
			},

			shoppingCarClick() {
				uni.navigateTo({
					url: "shoppingCart?student=" + this.student + '&studentId=' + this.studentId
				})
			},
			// foodTypeClick(e) {
			// 	this.food = e
			// 	this.foods = []
			// 	this.foodDetail()
			// },
			// tPickerClick(e) {
			// 	this.date = e
			// 	this.date1 = e.split(' ')[0]
			// 	this.foods = []
			// 	this.foodDetail()
			// },
			indexClick(index) {
				this.indexs = index
			},
			indexClick1(index) {
				this.indexs1 = index
				this.foods = []
				this.foodDetail()
			},
			foodClick(id, num, readyAmount, soldAmount) {
				if (readyAmount <= soldAmount) {

					return false
				}
				uni.navigateTo({
					url: 'foodDetail?id=' + id + '&date=' + this.date1 + '&type=' + this.foodTy + '&num=' + (num ? num : 0)
				})
			},
			tabClick(type) {
				if (this.typeAll[type] != 0) {
					if (this.typeAll[type] == 1) {
						this.typeAll[type] = 2
					} else {
						this.typeAll[type] = 1
					}
				} else {
					this.typeAll = {
						'zongheType': 0,
						'levelType': 0,
						'newType': 0,
						'monthType': 0,
						'cashType': 0
					}
					this.typeAll[type] = 1

				}
				console.log(this.typeAll)
			},
		}
	}
</script>

<style>
	.fontwhite {
		color: #fff;
	}

	.fontblack {
		color: #000;
	}

	.whitebackgroud {
		background-color: #ffffff;
	}

	.alpabackgroud {}

	.graybackgroud {
		background-color: #FFBA59;
	}

	.status_bar {
		height: 32px;
		line-height: 32px;
		padding-top: var(--status-bar-height);
		padding-bottom: 5px;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 997;
		/* 		background-color: #F5F5F5;
	*/
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		font-weight: Medium;
		font-size: 36upx;
	}


	.back1 {
		width: 25px;
		height: 25px;
	}

	.customtitlediv {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 200px;
		margin-left: calc(50% - 100px);
		position: absolute;
		font-size: 14px;
		text-align: center;
		font-family: PingFang-SC-Medium;
	}

	.navback1 {
		margin-left: 20upx;
		font-size: 13px;
		display: flex;
		align-items: center;
		line-height: 1;
		color: #fff;
	}

	.icon-jiantou1 {
		font-size: 28upx;
		color: #FFFFFF;
		padding-left: 10upx;
	}

	.date_view {
		font-size: 25upx;
		color: #FFFFFF;
		display: flex;
		flex-direction: row;
		padding-right: 10upx;
	}

	/* 自定义导航 下*/
	.active {
		background: #ffba59 !important;
		color: #FFFFFf !important;
	}

	.active1 {
		color: #FFBA59 !important;
	}

	.scroll {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		border-top: 10upx solid #F5F5F5;
	}

	.scrollY {
		width: 23%;
	}

	.scroll1 {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		background: #FFFFFF;
		font-size: 26upx;
		color: #333333;
	}

	.scrollX_view {
		width: 77%;
	}

	.tab_view {
		width: 100%;
		height: 80upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.tab {
		width: 20%;
		line-height: 80upx;
		text-align: center;
		font-size: 26upx;
		color: #333333;
	}


	.icon-jiantou2 {
		display: inline-block;
		transform: rotate(180deg);
	}

	.scrollX {
		width: 100%;
		background: #F5F5F5;
	}

	.scroll2 {
		width: 100%;
		background-color: #FFFFFF;
		height: 200upx;
		border-bottom: 10upx solid #F5F5F5;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 0 24upx;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}

	.scroll2:last-of-type {
		border: none;
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

	/* 食品 */
	.foods_left {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 30upx;
		color: #333333;
	}

	.foods_img_view {
		font-size: 0;
	}

	.foods_img {
		width: 160upx;
		height: 160upx;
		border-radius: 10upx;
	}

	.foods_name_view {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		height: 160upx;
		box-sizing: border-box;
		padding: 10upx 0;
		padding-left: 20upx;
	}

	.add_view {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
		height: 160upx;
		color: #FFBA59;
		display: flex;
		font-size: 28upx;
	}

	.add_view view {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.add_view text {
		color: #333333;
		line-height: 1;
		padding: 0 14upx;
	}

	.icon-jianhao {
		color: #999;
	}

	.add_btn {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
		height: 160upx;
	}

	.add_btn view {
		padding: 10upx 24upx;
		font-size: 24upx;
		border-radius: 34upx;
		color: #FFFFFF;
		background: linear-gradient(270deg, rgba(249, 128, 80, 1) 1%, rgba(255, 186, 89, 1) 100%);
	}

	.no_foods {
		width: 100%;
		display: flex;
		justify-content: center;
		padding-top: 100upx;
		font-size: 26upx;
		color: #666;
	}

	.no_sale {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background: #fff;
		opacity: 0.5;
		z-index: 999;
		font-size: 60upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #000;
	}

	.no_sale_text {
		transform: rotate(35deg);
	}
</style>
