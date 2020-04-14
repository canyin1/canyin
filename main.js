import Vue from 'vue'
import App from './App'
import store from './store'
import toolUtil from 'util/toolUtil.js'
import httpUtil from 'util/httpUtil.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.httpUtil = httpUtil
Vue.prototype.toolUtil = toolUtil

App.mpType = 'app'

const app = new Vue({
	toolUtil,
	store,
	httpUtil,
	...App
})
app.$mount()
