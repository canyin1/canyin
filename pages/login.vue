<template>
	<view class="page">
		<navbar title="绑定学生" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<form @submit="submitComfire" @reset="submitCancel">
			<input class="input input1" type="text" value="" placeholder="姓名" name="name" placeholder-class="placeholder" />
			<picker mode="selector" :range="schoolList1" @change="pickerClick">
				<view>{{schoolList1[index]}}</view>
			</picker>
			<picker mode="selector" :range="classList1" @change="pickerClick1">
				<view>{{classList1[index1]}}</view>
			</picker>
			<input class="input input1" type="text" value="" placeholder="学号" name="studentNumber" placeholder-class="placeholder" />
			<button form-type="submit">提交</button>

		</form>
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
				type: '',
				schoolList: [],
				schoolList1: ['请选择学校'],
				classList: [],
				classList1: ['请选择年级'],
				index: 0,
				index1: 0
			}
		},
		onLoad(options) {
			if (options.type == 1) {
				this.type = options.type
			}
			this.getSchoolList()
		},
		methods: {
			pickerClick(e) {
				this.index = e.detail.value
				if (e.detail.value != 0) {
					console.log('111', this.index)
					this.getClassList()
				} else {
					this.classList1 = ['请选择年级']
					this.classList = []
				}
			},
			pickerClick1(e) {
				if (this.index == 0) {
					uni.showToast({
						title: '请先选择学校',
						icon: 'none',
						duration: 1500
					})
					return false
				}

				this.index1 = e.detail.value
			},
			getSchoolList() {
				let params = {

				}
				this.httpUtil.get('/api/school/school/list', params, (obj) => {
					this.schoolList = obj.rows
					for (let i = 0; i < obj.rows.length; i++) {
						this.schoolList1.push(obj.rows[i].name)
					}
				})
			},
			getClassList() {
				console.log('222', this.schoolList)
				console.log('333', this.schoolList[this.index - 1])
				console.log('444', this.schoolList[this.index - 1].id)
				let params = {
					schoolId: this.schoolList[this.index - 1].id
				}
				this.httpUtil.get('/api/school/class/list', params, (obj) => {
					this.classList = obj.rows
					for (let i = 0; i < obj.rows.length; i++) {
						this.classList1.push(obj.rows[i].name)
					}
				})
			},
			submitComfire(e) {
				console.log(e.detail.value)
				let params = e.detail.value
				if (this.index == 0 || this.index1 == 0) {
					return false
				}
				params.classId = this.classList[this.index1 - 1].id
				params.schoolId = this.schoolList[this.index - 1].id
				this.httpUtil.post2('/api/school/parent/bindStudent', params, (obj) => {
					console.log(obj)
					uni.navigateBack({

					})
				})
			},
		}
	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	.input {
		width: 70%;
		font-size: 32upx;
		color: #333333;
		border: 1upx solid #999;
		background: #F5F5F5;
		margin: 40upx auto;
		height: 60upx;
	}

	.input1 {
		position: relative;
		overflow: visible;
		border-radius: 10upx;
		padding-left: 10upx;
	}

	/* .input1::before{
		position: absolute;
		content: "*";
		left: -30upx;
		font-size: 26upx;
		color: #FF374E;
		top: 50%;
		margin-top: -13upx;
		line-height: 1;
	} */
	.placeholder {
		color: #999999;
	}

	button {
		width: 600upx;
		height: 88upx;
		font-size: 32upx;
		line-height: 88upx;
		color: #FFFFFF;
		text-align: center;
		margin: 40upx auto 0;
		border: none !important;
		border-radius: 44upx;
		background: linear-gradient(270deg, rgba(249, 128, 80, 1) 1%, rgba(255, 186, 89, 1) 100%);
	}

	picker {
		width: 70%;
		height: 60upx;
		margin: 40upx auto;
		font-size: 32upx;
		background: #F5F5F5;
		line-height: 60upx;
		border: 1upx solid #999;
		padding-left: 10upx;
	}

	picker::before {
		position: absolute;
		content: "*";
		left: -30upx;
		font-size: 26upx;
		color: #FF374E;
		top: 50%;
		margin-top: -13upx;
		line-height: 1;
		z-index: 9999;
	}
</style>
