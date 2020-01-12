import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import channel from '@/views/channel'
import news from '@/views/news'
import shop from '@/views/shop'

Vue.use(Router)

export default new Router({
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
      path: '/shop',
      name: 'shop',
      component: shop
    }
  ]
})
