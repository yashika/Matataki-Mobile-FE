import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import API from '@/api/API'
import errorHandling from '@/common/errorHandling'
// import "lib-flexible"; // 适配
import moment from 'moment'
import Navigation from 'vue-navigation' // 记录路由并缓存页面，像原生APP导航一样。

// Vue plugins
import (/* webpackChunkName: "pluginsBroadcastChannel" */ './plugins/broadcastChannel')
import (/* webpackChunkName: "pluginsSentry" */ './plugins/sentry')
import (/* webpackChunkName: "registerServiceWorker" */ './registerServiceWorker')
import (/* webpackChunkName: "assetsGt" */ '@/assets/gt.js')
import (/* webpackChunkName: "animate.css" */ 'animate.css')
import (/* webpackChunkName: "twitter_login" */ './plugins/twitter_login')

import '@/assets/css/index.less'
import './plugins/iview'
import './plugins/vant'
import './plugins/element-ui'
import './plugins/baseComponents'
import './plugins/vue_plugins'
import './plugins/vue_directive'
import './plugins/vue-mavon-editor'
import './icons'

import ossProcess from './utils/oss_process'

import i18n from './plugins/i18n'

Vue.prototype.$API = API
Vue.prototype.$errorHandling = errorHandling
Vue.prototype.$ossProcess = ossProcess

Vue.config.productionTip = false

Vue.use(Navigation, { router, store, keyName: 'c' })

// Register moment's default language
moment.locale('zh-CN')


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

// 13000++  3000+
// 11866.34 KiB     2819.08 KiB
// 11103.13 KiB     2648.39 KiB
// 10959.49 KiB     2609.92 KiB
// 8976.32 KiB      2220.81 KiB
// 8864.04 KiB      2194.85 KiB
// 8850.48 KiB      2191.09 KiB
// 8759.09 KiB      2167.78 KiB
// 8759.09 KiB      2167.78 KiB
// 8682.07 KiB      2145.48 KiB
// 8408.18 KiB      2090.59 KiB

// dist/js/chunk-libs.8a671db1.js            1538.20 KiB      471.62 KiB
// dist/js/app.9d1dda2f.js                   326.40 KiB       94.46 KiB