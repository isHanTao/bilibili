// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import { Button, PullRefresh ,Row,Popup,List ,Divider, Col, Cell,Search, Image, Tab, Tabs, Grid, GridItem, Swipe, SwipeItem, Tabbar, TabbarItem, Sticky, Icon,Overlay  } from 'vant'
import 'amfe-flexible'
Vue.use(Button).use(Row).use(Col).use(Search).use(Image).use(Tab).use(Tabs).use(Grid).use(GridItem).use(Swipe).use(SwipeItem).use(Sticky).use(Icon)
  .use(Tabbar).use(TabbarItem).use(Popup).use(Overlay).use(Divider).use(List).use(Cell).use(PullRefresh);
import { Field, Uploader } from 'vant';
Vue.use(Field);
Vue.use(Uploader);
import { Skeleton } from 'vant';
import { Toast } from 'vant';
import { NavBar } from 'vant';
import { Tag } from 'vant';

Vue.use(Tag);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Skeleton);
import 'jquery';
import './assets/common.css'
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://www.blessed.com/api/';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
