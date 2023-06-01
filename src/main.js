import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import F2 from '@antv/f2'
import F2 from "@antv/f2/lib/index-all";
import './static/css/iconfont.css'
import './assets/icon2/iconfont.css'
import './assets/icon2/iconfont.js'
import './assets/icon/iconfont.css'
import './assets/icon/iconfont.js'
import "./assets/css/iconfont.css"
import "./assets/css/iconfont.js"
import VueWechatTitle from 'vue-wechat-title'
import { vueBaberrage } from 'vue-baberrage'
import {
  Col, Row, Tabbar, TabbarItem, Cell, CellGroup, Icon, Tag, NoticeBar, Button,
  Checkbox, CheckboxGroup, RadioGroup, Radio, Stepper, Picker, Popup, Form, Field,
  PullRefresh,SwipeItem,Swipe,Toast,Search,Image as VanImage,DatetimePicker,Uploader,Overlay,
  SwipeCell
} from 'vant';
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
import utils from 'km-vue-utils'
// 悬浮球
import dragBall from 'vue-drag-ball'
Vue.use(dragBall)
Vue.use(Overlay);
Vue.use(utils);
Vue.prototype.$utils = utils;
Vue.use(Col);
Vue.use(Row);
Vue.use(vueBaberrage)
Vue.use(VueWechatTitle)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(Tag);
Vue.use(NoticeBar);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Stepper);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Form);
Vue.use(Field);
Vue.use(PullRefresh);
Vue.use(SwipeItem);
Vue.use(Swipe);
Vue.use(Search);
Vue.use(VanImage);
Vue.use(DatetimePicker);
Vue.use(Uploader);
Vue.use(SwipeCell);
Vue.prototype.$F2 = F2;
Vue.config.productionTip = false
Vue.prototype.Toast = Toast
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
