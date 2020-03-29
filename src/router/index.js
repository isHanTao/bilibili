import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import channel from '@/views/channel'
import news from '@/views/news'
import mine from '@/views/mine'
import detail from '@/views/detail-article'
import typeList from '@/views/article_type'

Vue.use(Router);

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
    }
  ]
})
