import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/appStore'
import RouterPathCfg from './RouterPathCfg'

// by fix: push 重复导航问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => console.log(err))
}
// user 路由
Vue.use(Router)
//
const appRouter = new Router({
  routes: RouterPathCfg.pathCfgInfo()
})

// 这地方实现安全拦截
appRouter.beforeEach(async (to, from, next) => {
  console.log('[appRouter] beforeEach() , from: ' + JSON.stringify(from.name) + '  to:' + JSON.stringify(to.name))
  if (to.name !== 'accountLogin' && to.name !== 'userLogin' && to.name !== 'signUp' && !store.state.csrfToken) {
    store.commit('CSRF_TOKEN', await store.state.services.loginService.csrf())
  }
  next()
})

export default appRouter
