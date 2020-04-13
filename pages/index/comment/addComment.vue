<template>
	<view class="page">
		<navbar title="评论" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<view class="big_view">
			<view class="pingfen">
				<text>总分：</text>
				<level :levels="4" :fontSizeType='1'></level>
			</view>
			<view class="evaluate_view">
				<view class="evaluate">
					<text>味道</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.tasteType>=index+1}" v-for='(item,index) in params.taste'
					 :key='index' @click.stop="evaluateClick('tasteType',index)"></span>
				</view>
				<view class="evaluate">
					<text>卫生</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.hygieneType>=index+1}" v-for='(item,index) in params.hygiene'
					 :key='index' @click.stop="evaluateClick('hygieneType',index)"></span>
				</view>
				<view class="evaluate">
					<text>份量</text>
					<span class="iconfont icon-weixiao" :class="{'icon-weixiao-':params.weightType>=index+1}" v-for='(item,index) in params.weight'
					 :key='index' @click.stop="evaluateClick('weightType',index)"></span>
				</view>
			</view>
			<view class="input_view">
				<textarea @input="inputClick" type="text" value="" />
				<view class="img_view">
					<image v-for="(item,index1) in img" :src="item" mode="aspectFill" v-if="img.length>0" :key="index1" @click="imageClick(index1)"></image>
					<span class="iconfont icon-jiahao1" @click='addImg' v-if="img.length<3"></span>
				</view>
			</view>
			<view class="comfire_btn">立即评论</view>
		</view>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import level from '@/components/level/level.vue'
	export default {
		components: {
			navbar,
			level
		},
		data() {
			return {
				levels: '1',
				value:'',
				params: {
					'taste': ['', '', '', '', ''],
					'hygiene': ['', ''],
					'weight': ['', '', ''],
					tasteType: 0,
					hygieneType: 0,
					weightType: 0,
				},
				img:[],
				id:''
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id
			}
		},
		methods: {
			imageClick(index){
				let img = this.img[index]
				let that = this
				uni.showActionSheet({
					itemList:['查看图片','删除','全部清空'],
					itemColor:'#333333',
					success(res) {
						console.log(res)
						if(res.tapIndex==0){
							uni.previewImage({
								current:img,
								urls:that.img
							})
						}
						if(res.tapIndex==1){
							that.img.splice(index,1)
						}
						if(res.tapIndex==2){
							that.img = []
						}
					},
				})
			},
			inputClick(e){
				this.value = e.detail.value
			},
			evaluateClick(type, index) {
				this.params[type] = index + 1
			},
			addImg(){
				let that = this
				uni.chooseImage({
					count:3,
					success(res) {
						console.log(res.tempFilePaths)
						
						// that.uploadImg(res.tempFilePaths)
						let teamparr = res.tempFilePaths
						function uploadimg(){
							while(teamparr.length > 0){
								let item = teamparr.pop()
								
								uni.uploadFile({
								    url: 'http://food-edu.net/api/common/upload', //仅为示例，非真实的接口地址
								    filePath: item,
									header:{
										'Authorization':  "Bearer" + ' ' + uni.getStorageSync("token")
									},
								    name: 'file',
								    success: (uploadFileRes) => {
								        let data = JSON.parse(uploadFileRes.data)
										console.log(data)
										that.img.push(data.url)
										if(teamparr.length>0){
											uploadimg()
										}else{
										}
										
								    }
								});
							}
						}
						uploadimg()
					}
				})
			},
			uploadImg(tempFilePaths){
				
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.pingfen {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 32upx 24upx;
	}

	.pingfen text {
		font-size: 32upx;
		color: #333333;
	}

	.icon-weixiao- {
		color: #FFBA59 !important;
	}
	.evaluate_view{
		padding: 32upx 24upx;
		border-top: 2upx solid #F5F5F5;
		border-bottom: 2upx solid #F5F5F5;
	}
	.evaluate{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-bottom: 20upx;
	}
	.evaluate:last-of-type{
		padding-bottom: 0;
	}
	.evaluate text{
		font-size: 32upx;
		line-height: 1;
		padding-right: 20upx;
		color: #333333;
	}
	.icon-weixiao{
		font-size: 46upx;
		padding-right: 10upx;
		color: #999999;
	}
	.icon-jiahao1{
		font-size: 120upx;
		color: #999999;
		margin-top: 5upx;
	}
	.input_view{
		width: 710upx;
		background-color: #F5F5F5;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		border-radius: 24upx;
		margin: 20upx auto;
		padding: 32upx 24upx;
		box-sizing: border-box;
	}
	.img_view{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.img_view image{
		width: 120upx;
		height: 120upx;
		margin-right: 10upx;
	}
	textarea{
		font-size: 32upx;
		color: #333333;
	}
	.comfire_btn{
		width: 680upx;
		height: 88upx;
		line-height: 88upx;
		margin: 20upx auto 0;
		color: #FFFFFF;
		font-size: 32upx;
		text-align: center;
		border-radius: 44upx;
		background: linear-gradient(270deg, rgba(249, 128, 80, 1) 1%, rgba(255, 186, 89, 1) 100%);
	}
</style>
