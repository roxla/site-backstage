// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as axios from '@/assets/axiosServer.js'

Vue.use(ElementUI);
let Base64 = require('js-base64').Base64;
Vue.config.productionTip = false;
import $axios from 'axios';
Vue.prototype.axios = axios;
// let HTTP = 'http://' + location.host + '/association/'
// Vue.prototype.$GLO = {host:'http://xyxh.fryxy.cn/association/'}
// Vue.prototype.$GLO = {host: HTTP};
Vue.prototype.$GLO = {host:'http://192.168.1.116:8080/'}
Vue.prototype.formatDate = function(now){ 
  let year=now.getFullYear();
  let month=now.getMonth()+1;
  let date=now.getDate();
  let hour=now.getHours();
  let minute=now.getMinutes();
  let second=now.getSeconds();
  if(month<10){
    month = '0' + month;
  };
  if(date<10){
    date = '0' + date;
  };
  if(hour<10){
    hour = '0' + hour;
  };
  if(minute<10){
    minute = '0' + minute;
  };
  if(second<10){
    second = '0' + second;
  };
  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 全日期过滤
Vue.filter('fulldate', function (value) {
  let MD = value.split("-")[0] + "-" + value.split("-")[1] + "-" + value.split("-")[2].split(" ")[0];
  return MD;
})

// 日期过滤
Vue.filter('date', function (value) {
  let MD = value.split("-")[1] + "-" + value.split("-")[2].split(" ")[0];
  return MD;
})

// 全时间过滤
Vue.filter('fulltime', function (value) {
  let HM = value.split("-")[2].split(" ")[1].split(":")[0] + ":" + value.split("-")[2].split(" ")[1].split(":")[1] + ":" + value.split("-")[2].split(" ")[1].split(":")[2];
  return HM;
})

// 时间过滤
Vue.filter('time', function (value) {
  let HM = value.split("-")[2].split(" ")[1].split(":")[0] + ":" + value.split("-")[2].split(" ")[1].split(":")[1];
  return HM;
})
