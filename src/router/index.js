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
import register from '@/views/register'
import notfind from '@/views/notfind';
import history from '@/views/history';
import myinfo from '@/views/my_info';
import otherinfo from '@/views/other_info';
import main from '@/views/main';
import tuijian from '@/views/tuijian';
import hot from '@/views/hot';
import guanzhu from '@/views/guanzhu';
import zuixin from '@/views/zuixin';
import search from '@/views/search';

Vue.use(Router);

let router = new Router({
      mode: 'hash',
      routes: [{
          path: '/',
          name: 'index',
          component: index,
          redirect:'/index/main',
          children: [{
              path: '/index/main',
              component: main,
              meta: {
                keepAlive: true,
                title: '主要内容'
              },
          },{
              path: '/index/tuijian',
              component: tuijian,
              meta: {
                keepAlive: true,
                title: '推荐'
              },
          },{
              path: '/index/hot',
              component: hot,
              meta: {
                keepAlive: true,
                title: '热门'
              },
          },{
              path: '/index/guanzhu',
              component: guanzhu,
              meta: {
                keepAlive: true,
                title: '关注'
              },
          },{
              path: '/index/zuixin',
              component: zuixin,
              meta: {
                keepAlive: true,
                title: '最新'
              },
          },
          ],
          },
          {
            path: '/index/channel',
            name: 'channel',
            component: channel
          },
          {
            path: '/index/news',
            name: 'news',
            component: news,
            meta: {
              keepAlive: true,
              title: '动态'
            }
          },
          {
            path: '/index/mine',
            name: 'mine',
            component: mine
          },
          {
            path: '/detail/:article_id',
            name: 'detail',
            component: detail
          },
          {
            path: '/index/channel/:type_id',
            name: 'channel.type',
            component: typeList
          },
          {
            path: '/index/news/write',
            name: 'news.write',
            component: write_thing
          },
		  {
		    path: '/index/search',
		    name: 'index.search',
		    component: search
		  },
          {
            path: '/login',
            name: 'login',
            component: login
          },
          {
            path: '/userinfo',
            name: 'userinfo',
            component: userinfo
          },
          {
            path: '/about',
            name: 'about',
            component: about
          },
          {
            path: '/collect',
            name: 'collect',
            component: collect
          },
          {
            path: '/regieter',
            name: 'register',
            component: register
          },
          {
            path: '/history',
            name: 'history',
            component: history,
            meta: {
              keepAlive: true,
              title: '推荐'
            },
          },
          {
            path: '/myinfo',
            name: 'myinfo',
            component: myinfo
          },
          {
            path: '/otherinfo/:id',
            name: 'otherinfo',
            component: otherinfo
          },
          {
            path: '*',
            component: notfind
          },
        ],
        scrollBehavior(to, form, savedPosition) {
          //scrollBehavior方法接收to，form路由对象
          //第三个参数savedPosition当且仅当在浏览器前进后退按钮触发时才可用
          //该方法会返回滚动位置的对象信息，如果返回false，或者是一个空的对象，那么不会发生滚动
          //我们可以在该方法中设置返回值来指定页面的滚动位置，例如：
          return {
            x: 0,
            y: 0
          }
          //表示在用户切换路由时让是所有页面都返回到顶部位置
          //如果返回savedPosition,那么在点击后退按钮时就会表现的像原生浏览器一样，返回的页面会滚动过到之前按钮点击跳转的位置，大概写法如下：
          if (savedPosition) {
            return savedPosition
          } else {
            return {
              x: 0,
              y: 0
            }
          }
          //如果想要模拟滚动到锚点的行为:
          if (to.hash) {
            return {
              selector: to.hash
            }
          }
        }
      })

    router.beforeEach((to, form, next) => {
      if (to.path === '/login' || to.path === '/admin/login') return next();
      const token = window.localStorage.getItem('token');
      if (!token) return next('/login');
      next();
    });
    export default router
