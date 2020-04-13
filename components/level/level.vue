<template>
	<view>
		<span class="iconfont icon-pingfenxingxing" :class='{"icon-pingfenxingxing1":levels>0.5,"icon-pingfenxingxing2":levels==0.5,"icon-fontSize1":fontSizeType==0,"icon-fontSize2":fontSizeType!=0}'></span>
		<span class="iconfont icon-pingfenxingxing" :class='{"icon-pingfenxingxing1":levels>1.5,"icon-pingfenxingxing2":levels==1.5,"icon-fontSize1":fontSizeType==0,"icon-fontSize2":fontSizeType!=0}'></span>
		<span class="iconfont icon-pingfenxingxing" :class='{"icon-pingfenxingxing1":levels>2.5,"icon-pingfenxingxing2":levels==2.5,"icon-fontSize1":fontSizeType==0,"icon-fontSize2":fontSizeType!=0}'></span>
		<span class="iconfont icon-pingfenxingxing" :class='{"icon-pingfenxingxing1":levels>3.5,"icon-pingfenxingxing2":levels==3.5,"icon-fontSize1":fontSizeType==0,"icon-fontSize2":fontSizeType!=0}'></span>
		<span class="iconfont icon-pingfenxingxing" :class='{"icon-pingfenxingxing1":levels>4.5,"icon-pingfenxingxing2":levels==4.5,"icon-fontSize1":fontSizeType==0,"icon-fontSize2":fontSizeType!=0}'></span>

	</view>
</template>

<script>
	export default{
		name: 'level',
		props:{
			levels: {
				type: Number,
				default: 0
			},
			fontSizeType: { 
				type: Number,
				default: 0
			},
		},
		data(){
			return{
				
			}
		},
	}
</script>

<style>
	/* 评价星 */
	.icon-pingfenxingxing {
		color: #999;
		font-size: 26upx;
		margin-right: 8upx;
	}
	.icon-pingfenxingxing:last-of-type{
		margin-right: 0;
	}
	.icon-pingfenxingxing1 {
		color: #FFBA59;
	}
	.icon-fontSize1{
		font-size: 26upx;
	}
	.icon-fontSize2{
		font-size: 40upx;
	}
	.icon-pingfenxingxing2 {
		background: linear-gradient(to right, #ffba59 49%, #999 51%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
