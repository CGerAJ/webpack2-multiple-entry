// 样式重置基础文件
require('../css/base.css');
// CSS合并打包文件 具体看common.less文件
require('../css/common.less');


// import url from "./lib/url";
// swiper轮播插件
import swiper from "./lib/swiper.min.js";
// Vue核心js文件
import Vue from "./lib/vue.min.js";
// iview核心js文件
import iView from "./lib/iview.min.js";
// axios核心js文件
import axios from "./lib/axios.min.js";
// iview样式
import '../css/iview.css';
//iview 使用
Vue.use(iView);

window.onload = function() {
  // 测试swiper
  let swiperScroll = new Swiper(".swiper-container", {
    pagination: '.swiper-pagination-index',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: 3000,
    loop: true
  });
  //   message: 'Hello Vue!',
  // 测试Vue
  let app = new Vue({
    el: '#app',
    data: {
      results: [],
      message: 'Hello Vue!',
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      ruleValidate: {
        name: [{
          required: true,
          message: '姓名不能为空',
          trigger: 'blur'
        }],
        mail: [{
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        city: [{
          required: true,
          message: '请选择城市',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }],
        interest: [{
            required: true,
            type: 'array',
            min: 1,
            message: '至少选择一个爱好',
            trigger: 'change'
          },
          {
            type: 'array',
            max: 2,
            message: '最多选择两个爱好',
            trigger: 'change'
          }
        ],
        date: [{
          required: true,
          type: 'date',
          message: '请选择日期',
          trigger: 'change'
        }],
        time: [{
          required: true,
          type: 'date',
          message: '请选择时间',
          trigger: 'change'
        }],
        desc: [{
            required: true,
            message: '请输入个人介绍',
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 20,
            message: '介绍不能少于20字',
            trigger: 'blur'
          }
        ]
      },
    },
    mounted() {
    axios.get("/data")
    .then(response => {this.results = response.data.results;}).catch(function (error) {
    console.log(error);
  });
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  });

};



console.log('page home');
