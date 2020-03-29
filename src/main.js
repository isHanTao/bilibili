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
axios.interceptors.request.use(config =>{
  // config.headers.Authorization = window.sessionStorage.getItem('token');
  config.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTVlNzAwMzQ1ZTdiY2NhM2RiZTYwNTRlNzJhNzc5ODRlZmEwYmRmNmM2YzNkNzQ3ZDNlNTUyM2FmNDRkZDZlODJiYzcwNWJjNTk1Zjg0YTIiLCJpYXQiOjE1ODU0ODgxNjcsIm5iZiI6MTU4NTQ4ODE2NywiZXhwIjoxNTg2Nzg0MTY3LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.e7tRF1xQkKoCJyYeD6wrd0Su1UO_ntOJKwo42_mf0tJyPvxrMXM3mVAKV5ExZ8ynqBJzcEp-n4alaWok060-aSapH5NfPoAAuN1yvCQtzqpwIm4FEMAtGm6-LCsBudo4hyxvCMOW5hS4ctx0-WIrPpgUMvEJpf2Bkf3GcoITP3OJGmmMpXumRIULudvLEvgm3ZExbl4hW-E3zDMg-MeRdongU4odjwbfarSw6dk1x7k1rfKQ-g0KfjPPWOfdHq-EMbd8MntTxbRojiADmG25Po12s9WZUzORGAMKkFFPTMTKQvTW15ZuaUB4gZnnsKxoVuJ5MgQo2f1y18-UEzJO2eA9fRS2kyn50Wk39PvMGNodhYisRlUVqWf8l-q69EkxoW2u_yEybQ3QCCbdpYJSA5s4SsNlUkA3uTbDsmrLLyZn1BqbxWc4NFzpTtm9WfClEM5NXKEmUp9nC_M5WwkIujlnUAKwTfWp1S5d7cy_bvM7LmO0QsYNzwFVt8Zsnqk231Hz3QzxGuTFXcE39O7hG2z_wvN4cOJTZve1B_Y16e0_RsqgcW1v_oZWWM8mYhr_o7lUDlgeBniTBfG0XLIiH_aHMDWWY8oG21JzucY15rnr8rdUM1zd92TZzVok81X18fAIMP8tPk1yJ9EVtWv2D2i7FwETOPH4FQ9CBXjksn8';
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
