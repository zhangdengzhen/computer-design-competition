import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant';
Vue.use(Toast);
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Home',
    component:() =>import( '../views/shuangxuanhui/Home.vue'),
    meta:{
      title:"rpa专题"
    }
  },
  {
    path: '/middlepage',
    name: 'middlepage',
    component:() =>import( '../views/shuangxuanhui/Middlepage.vue'),
    meta:{
      title:"文件下载"
    }
  },
  {
    path: '/home',
    name: 'HotHome',
    meta:{
      title:"邑北",
    },
     component: () => import( '../views/Home.vue')
  },

  {
    path: '/show',
    name: 'show',

    component: () => import('../views/Show.vue')
  },
  {
    path: '/myvideo',
    name: 'myvideo',

    component: () => import('../views/Tabshow/MyVideo.vue')
  },
  {
    path:"/video",
    name:"Video",
    meta:{
      title:"短视频",
    },
   
    component: () => import('../views/Tabshow/Video.vue'),
  },
  {
    path: '/tabshow',
    name: 'tabshow',
    
    component: () => import('../views/TabShow.vue'),
    children:[
      {
        path:"hot",
        name:"hot",
        meta:{
          title:"热点",
        },
       
        component: () => import('../views/Tabshow/Hot.vue'),
      },
      {
        path:"usertopic",
        name:"usertopic",
        meta:{
          title:"用户订阅",
        },
    
        component: () => import('../views/Tabshow/UserTopic.vue'),
      },
      {
        path:"bar",
        name:"Bar",
        meta:{
          title:"柱状图分析",
        },
        
        component: () => import('../views/Tabshow/Bar.vue'),
      },
      {
        path:"pie",
        name:"pie",
        meta:{
          title:"饼状图分析",
        },
     
        component: () => import('../views/Tabshow/Pie.vue'),
      },
      {
        path:"Me",
        name:"Me",
        meta:{
          title:"我的",
        },
       
        component: () => import('../views/Tabshow/Me.vue'),
      },

    ]

  },

  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/shuangxuanhui/About.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import( '../views/shuangxuanhui/Index.vue'),
    redirect:"/index/page1",
    children:[
      {
        path:"page1",
        name:"page1",
        meta:{
          title:"推荐",
        },
       
        component: () => import('../views/shuangxuanhui/Recommend.vue'),
      },
      {
        path:"page2",
        name:"page2",
        meta:{
          title:"分类",
        },
       
        component: () => import('../views/shuangxuanhui/Classfily.vue'),
      },
      {
        path:"page3",
        name:"page3",
        meta:{
          title:"我的",
        },
       
        component: () => import('../views/shuangxuanhui/Me.vue'),
      },
      {
        path:"page4",
        name:"page4",
        meta:{
          title:"分类",
        },
       
        component: () => import('../views/shuangxuanhui/Info.vue'),
      },
      {
        path:"page5",
        name:"page5",
        meta:{
          title:"招聘",
        },
       
        component: () => import('../views/shuangxuanhui/Job.vue'),
      },
      {
        path:"page6",
        name:"page6",
        meta:{
          title:"发布招聘",
        },
       
        component: () => import('../views/shuangxuanhui/Repo.vue'),
      },
      {
        path:"page7",
        name:"page7",
        meta:{
          title:"详情",
        },
       
        component: () => import('../views/shuangxuanhui/Content.vue'),
      },
    ]
    
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path=="/") {
      next();
  } else if (to.path=="/middlepage") {
     next()
  } else if(!localStorage.getItem("userinfo")){
    next("/")
  }else if(JSON.parse(localStorage.getItem("userinfo")).errcode){
    Toast.fail('微信授权过于频繁，请稍后再试');
    next("/")
  }
  else {
      next();
  }
});
export default router
