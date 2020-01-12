// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Row, Col, Search, Image, Tab, Tabs, Grid, GridItem, Swipe, SwipeItem, Tabbar, TabbarItem, Sticky, Icon  } from 'vant'
import 'amfe-flexible'
Vue.use(Button).use(Row).use(Col).use(Search).use(Image).use(Tab).use(Tabs).use(Grid).use(GridItem).use(Swipe).use(SwipeItem).use(Sticky).use(Icon)
  .use(Tabbar).use(TabbarItem);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
