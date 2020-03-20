import Vue from 'vue'
import App from './App'
import store from './store'
import toolUtil from 'util/toolUtil.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$toolUtil = toolUtil

App.mpType = 'app'

const app = new Vue({
	toolUtil,
	store,
	...App
})
app.$mount()
