// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import appStore from './store/appStore'
import VueI18n from 'vue-i18n'
import langEn from './i18n/msg-en'
import langZh from './i18n/msg-zh'
import VueClipboard from 'vue-clipboard2'
import { format } from 'timeago.js'
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css' // 样式文件
import {get, post} from './services/netService/https'

Vue.prototype.$get = get
Vue.prototype.$post = post

//
Vue.use(VueI18n)
Vue.use(VueClipboard)

Vue.config.productionTip = false
//
const i18n = new VueI18n({
  locale: 'en', // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh: langZh,
    en: langEn}})

// 定义全局的时间过滤器
Vue.filter('changeTime', function (dateStr) {
  return format(dateStr, 'en')
})

// 自定义指令-展示sql高亮
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('p code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'userRoles') {
    // 创建一个StorageEvent事件
    const newStorageEvent = document.createEvent('StorageEvent')
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val)
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null)
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal)
  }
}

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  i18n,
  store: appStore,
  components: { App },
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  template: '<App/>'
})
