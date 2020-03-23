// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import VueTouch from 'vue-touch'
import { Button, Row,Popup ,Divider, Col, Search, Image, Tab, Tabs, Grid, GridItem, Swipe, SwipeItem, Tabbar, TabbarItem, Sticky, Icon,Overlay  } from 'vant'
import 'amfe-flexible'
Vue.use(Button).use(Row).use(Col).use(Search).use(Image).use(Tab).use(Tabs).use(Grid).use(GridItem).use(Swipe).use(SwipeItem).use(Sticky).use(Icon)
  .use(Tabbar).use(TabbarItem).use(Popup).use(Overlay).use(Divider);
Vue.use(VueTouch, {name: 'v-touch'});
import { Skeleton } from 'vant';
Vue.use(Skeleton);
import 'jquery';
Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://www.blessed.com/api/';
axios.interceptors.request.use(config =>{
  // config.headers.Authorization = window.sessionStorage.getItem('token');
  config.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTk4MDgyNjI1ZTYyOGI0MzdmZTIwODkwMjk2MDQ3NGQ3MTkyZWRhOGFiZTQ1YzA3YWQ3ZDUyMzZkZjIyNzU1YTM0YWUwZTFkOTk0ZDRhMGEiLCJpYXQiOjE1ODQxNjAwNjAsIm5iZiI6MTU4NDE2MDA2MCwiZXhwIjoxNTg1NDU2MDYwLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.JKj47CAmsYio1nNv3UiG4D0rHP9frCOoVsaoRNq2MY96wA4SW9r4aRUrvVZyRKsOHihpesSiEocQ7LXsckaSRy1BEBWuwgrA1Vu5NFnScrJ965LqC0XvVudko60Lk10L5B7AuzeDUhjkZFCAz5uc1d3FBvUzGbfR_3CMmJHldRlUAW8feP71ZUA5cXoG0q9e-XGCyxA3UrBcynJw3XierTzJKFTSfTjifCFLvafCw_OmCrLCAkGtaTNmqQ1J58EfzZl-tH-5-f-M2ocwad9bsFxyjSK-_XJX5KJ78ZmdJ8zZFocQgpI6dsDXZ_CvO0tiZ1h2_S_7nFpo0e66aLXyVlDVCXLCJBRVtgNCw5F8WvWrw-1SvCwsgIGtF_gxXckm022zD3KoG48kHKBsibKLSi0Mrh2-rYevYlstgGhSoF_D2A8YJiWYeBvQ-dsKQy8D9SFAy1kh1dMTaXH_2PRJGcnSdM_E1RJdI3zxzVF042kaBEdxgf402ZsvGg2XSLK7fkx1ulgl1oy9sSCFev3krn75rtWNwxT7S2hrEFH6hCZF5HZBgfAAtzwSZ3fDHNUcLSa53Rla3LP0fMhhII-_RzAbAHp0ik3dtjUKY3Gka6QGmbRfTNq5iaLLWAhxljUujoFmZk10lFMTMAPcJUJ0W0IJhqwW5jsoCp3zHnIr2gU';
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
