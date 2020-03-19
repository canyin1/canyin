<template>
	<view class="page">
		<navbar title="评论" :backcolorType='2' :whiteback='2' :showKongPanel="true"></navbar>
		<level :levels="levels"></level>
	</view>
</template>

<script>
	import navbar from "@/components/navbar/navbar.vue"
	import level from '@/components/level/level.vue'
	export default{
		components: {
			navbar,
			level
		},
		data(){
			return{
				levels:'3.5'
			}
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
