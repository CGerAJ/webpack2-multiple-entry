// 样式重置基础文件
require('../css/base.css');
// iview样式
// require('../css/iview.css');
// CSS合并打包文件 具体看common.less文件
require('../css/common.less');


// import url from "./lib/url";
// swiper轮播插件
import swiper from "./lib/swiper.min.js";
// Vue核心文件
import Vue from "./lib/vue.min.js";
// iview核心文件
import iView from "./lib/iview.min.js";
// iview样式
import '../css/iview.css';
//iview 使用
Vue.use(iView);

window.onload=function () {
  // 测试swiper
  let swiperScroll = new Swiper(".swiper-container", {
     pagination: '.swiper-pagination-index',
     paginationClickable: true,
     nextButton: '.swiper-button-next',
     prevButton: '.swiper-button-prev',
     autoplay: 3000,
     loop: true
  });
  // 测试Vue
  let app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })

}



console.log('page home');
