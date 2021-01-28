import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引用 样式重置 和 rem计算文件
import './assets/css/reset.css'
import './assets/js/rem.js'

//引入第三方库
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
