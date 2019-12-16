import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './util/axios.js'
import './assets/font/iconfont.css'
import moment from 'moment'//导入转换时间工具
 
Vue.config.productionTip = false
Vue.prototype.$axios = axios; //this.$axios
Vue.prototype.$moment = moment;//赋值使用
 
moment.locale('zh-cn');//需要汉化


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
