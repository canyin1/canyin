<template>
	<view class="page">
		<navbar title="000" :backcolorType='2' :whiteback='2' :showKongPanel="true" :downType="true" :dateType="true" @weeks='tPickerClick'
		 @food="foodTypeClick" :date='date' :date1='date1'></navbar>

		<view class="scroll" :style="{height:scrollHeight +'px'}">
			<scroll-view scroll-y="true" class="scrollY" :style="{height:scrollHeight +'px'}">
				<view v-for="(item,index1) in typeSubList" :key="index1" class="scroll1" :class="index1==indexs1?'active':''" @click="indexClick1(index1)">{{item.name}}</view>
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
					<view class="scroll2" v-for="(item,index2) in foods" :key='index2' @click.stop="foodClick(item.id)">

						<view class="foods_left">
							<view class="foods_img_view">
								<image class="foods_img" src="/static/微信图片_20200318092008.jpg"></image>
							</view>
							<view class="foods_name_view">
								<view class="foods_name">{{item.name}}</view>
								<view class="foods_num">月售{{item.monthlySales}}</view>
								<view class="foods_cash">￥{{item.price}}</view>
							</view>
						</view>
						<!-- <view class="add_view">
							<view>
								<span class="iconfont icon-jianhao" v-if="item.num>0" @click.stop="reduceClick(item.id,index2)"></span>
								<text v-if="item.num>0">{{item.num}}</text>
								<span class="iconfont icon-jiahao" @click.stop="addClick(item.id,index2)"></span>
							</view>
						</view> -->
						<view class="add_btn">
							<view @click.stop="addClick(item.id,item.price,item.imgs,item.name,index2)">添加</view>
						</view>
					</view>
				</scroll-view>
			</view>

		</view>
		<view class="bottom_view">
			<view class="money_view" :class="price==0?'money_view1':''" @click="shoppingCarClick">
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
		data() {
			return {
				startDate: '',
				endDate: '',
				scrollHeight: 0,
				scrollHeight1: 0,
				indexs1: '',
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

				],
				subTypeId: '',
				foodType: ['早餐', '午餐', '晚餐', '夜宵'],
				food: '早餐',
				price: 0,
				typeSubList:[]
			}
		},
		onLoad(options) {
			if (options.id) {
				this.subTypeId = options.id
			}
			this.getTypeSubList()
			let date = Date.parse(new Date())
			this.date1 = this.toolUtil.getTimeStrOnlyDate(date)
			var arr = "日一二三四五六".split("")
			let weeks = arr[new Date(date).getDay()]
			this.date = this.date1 + ' ' + "周" + weeks
			this.foodDetail(options.id)
		},
		methods: {
			getTypeSubList(){
				let params = {
					
				}
				this.httpUtil.get('/api/school/foodSubType/list',params,(obj)=>{
					console.log(123,obj)
					this.typeSubList = obj.rows
				})
			},
			foodDetail(id) {
				let params = {
					date: '',
					schoolId: 1,
					subTypeId: id ? id : this.subTypeId

				}
				this.httpUtil.get('/api/school/foodplan/list', params, (obj) => {
					console.log(obj)
					if (obj.rows[0]) {
						let foods = []
						if (this.food == '早餐') {
							foods = obj.rows[0].breakfastList
						} else if (this.food == '午餐') {
							foods = obj.rows[0].lunchList
						} else if (this.food == '晚餐') {
							foods = obj.rows[0].dinnerList
						} else {
							foods = obj.rows[0].supperList
						}
						for(let i =0;i<foods.length;i++){
							if(foods[i].images){
								foods[i].imgs = JSON.parse(foods[i].images)[0]
							}
						}
						this.foods = foods
						if (uni.getStorageSync('price')) {
							this.price = uni.getStorageSync('price').toFixed(2)
						} else {
							this.price = 0
						}
						console.log('foods', this.foods)
					}

				})
			},
			reduceClick(id) {
				for (let i = 0; i < this.foods.length; i++) {
					if (this.foods[i].id == id) {
						this.foods[i].num--
					}
				}
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
				let typeList = ['breakfast', 'lunch', 'dinner', 'supper']
				let type = ''
				if (this.food == '早餐') {
					type = typeList[0]
				} else if (this.food == '午餐') {
					type = typeList[1]
				} else if (this.food == '晚餐') {
					type = typeList[2]
				} else {
					type = typeList[3]
				}
				
				if (uni.getStorageSync('shoppingCarList')) {
					shoppingCarList = uni.getStorageSync('shoppingCarList')
					if (shoppingCarList[this.date1]) {
						for (let i = 0; i < shoppingCarList[this.date1].length + 1; i++) {
							if (i == shoppingCarList[this.date1].length) {
								food.id = id
								food.amount = 1
								food.type = type
								food.name = name
								food.price = price
								food.images = images
								shoppingCarList[this.date1].push(food)
								// this.getnum(id)
								break;
							}
							if (shoppingCarList[this.date1][i].id == id) {
								shoppingCarList[this.date1][i].amount++
								// this.getnum(id)
								break;
							}
						}
					} else {
						shoppingCarList[this.date1] = []
						food.id = id
						food.amount = 1
						food.type = type
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
					food.type = type
					food.name = name
					food.price = price
					food.images = images
					shoppingCarList[this.date1].push(food)
					// this.getnum(id)
				}

				prices = prices + price
				this.price = prices.toFixed(2)
				console.log(111, shoppingCarList)
				uni.setStorageSync("shoppingCarList", shoppingCarList)
				uni.setStorageSync("price", prices)
				uni.showToast({
					title: "添加成功",
					icon: "none",
					duration: 1500
				})
			},
			getnum(id) {
				let food = this.foods
				for (let j = 0; j < food.length; j++) {
					if (food[j].id == id) {
						if (!food[j].num) {
							food[j].num = 0
						}
						food[j].num++
						this.foods = food
						this.$forceUpdate()
					}
				}
			},

			shoppingCarClick() {
				uni.navigateTo({
					url: "shoppingCart"
				})
			},
			foodTypeClick(e) {
				this.food = e
				this.foodDetail()
			},
			tPickerClick(e) {
				this.date = e
				this.date1 = e.split(' ')[0]
				this.foodDetail()
			},
			indexClick(index) {
				this.indexs = index
			},
			indexClick1(index) {
				this.indexs1 = index
			},
			foodClick(id) {
				uni.navigateTo({
					url: 'foodDetail?id=' + id
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
	.active {
		background: #ffba59 !important;
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
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		background: #F1F1F1;
		font-size: 28upx;
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

	.icon-jiantou1 {
		font-size: 24upx;
		color: #FFBA59;
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
		color: #333;
		font-size: 26upx;
		line-height: 68upx;
		background: #FFBA59;
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
</style>
