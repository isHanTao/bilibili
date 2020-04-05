import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import channel from '@/views/channel'
import news from '@/views/news'
import mine from '@/views/mine'
import detail from '@/views/detail-article'
import typeList from '@/views/article_type'
import write_thing from '@/views/write_thing'
import login from '@/views/login'
import userinfo from '@/views/userinfo'
import about from '@/views/about'
import collect from '@/views/collect'

Vue.use(Router);

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, {
      path: '/channel',
      name: 'channel',
      component: channel
    }, {
      path: '/news',
      name: 'news',
      component: news
    }, {
      path: '/mine',
      name: 'mine',
      component: mine
    }, {
      path: '/detail/:article_id',
      name: 'detail',
      component: detail
    }
    , {
      path: '/channel/:type_id',
      name: 'channel.type',
      component: typeList
    }, {
      path: '/news/write',
      name: 'news.write',
      component: write_thing
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/userinfo',
      name: 'userinfo',
      component: userinfo
    },{
      path: '/about',
      name: 'about',
      component: about
    },{
      path: '/collect',
      name: 'collect',
      component: collect
    }
  ]
})

router.beforeEach((to, form, next) => {
  if (to.path==='/login' || to.path === '/admin/login') return next();
  const token = window.localStorage.getItem('token');
  if (!token) return next('/login');
  next();
});
export default router
