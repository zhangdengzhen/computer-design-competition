<template>
  <div class="home">
       <div class="header">
         <van-notice-bar
            left-icon="volume-o"
            text="欢迎使用邑北。注意:请选择你所感性趣的类型,点击按钮即可查看当前实时热点数据分析,并且能订阅该热点,微信公众号会定时推送相关内容。感谢您的使用 "
          />
          <h5>基于rpa+AI算法实现实时热点分析</h5>
       </div>
       <div class="contain" >
         <div class="choose">
           <van-checkbox-group v-model="result" style="overflow:hidden;" v-for="(item, index) in choose" :key="index" >
             <van-checkbox v-if="item[0]!=null" label-position="left" :name="item[2]" style="float:left;margin:5px 0;">
               <svg class="icon" aria-hidden="true">
                 <use :xlink:href="item[1]"></use>
                </svg>{{item[0]}}
              </van-checkbox> 

             <van-checkbox v-if="item[3]!=null" label-position="left" :name="item[5]" style="float:right;margin:5px 0;">
                  <svg class="icon" aria-hidden="true">
                 <use  :xlink:href="item[4]"></use>
                </svg>{{item[3]}}
                </van-checkbox>

          </van-checkbox-group>
         </div>

       </div>
       <div class="login">
            <van-button type="primary" @click="goshow">确认</van-button>
       </div>
  </div>
</template>

<style lang="less" scoped>
.contain{
  margin: 2.56rem 0;
  text-align: center;
  .choose{
    font-size: 1.024rem;
    padding: 1.28rem 1.28rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 70%;
    margin: 0 auto;
  }
}
.header{
  text-align: center;
}
.login{
  margin-top: 1.92rem;
  text-align: center;
}

</style>
<script>
import axios from 'axios'
import { Notify } from 'vant';
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
export default {

data(){
      return {
      result: [],
      choose:[["农业","#icon-S-nongye","农业", "体育","#icon-tiyu","体育"],["汽车","#icon-qiche","汽车", "家庭","#icon-gerenzhongxin_wodejiating","家庭"],["文化","#icon-wenhuashenghuo","文化","互联网","#icon-hulianwang","互联网"],["教育","#icon-jiaoyu","教育","旅游","#icon-lvyou","旅游"],["娱乐","#icon-yule","娱乐", "国际","#icon-guojishangbiao","国际"],["金融","#icon-jinrong","金融", "疫情","#icon-youxi","疫情"],[ "游戏","#icon-youxi","游戏","政治","#icon-zhengzhi","政治",],["楼房","#icon-loufang","楼房","航天","#icon-hangkonghangtian-hangtianfeijishuttle",'航天'],["军事","#icon-junshi","军事",null,null,null]]
    };
},
created(){

  // if(localStorage.getItem("userinfo")!=null&&localStorage.getItem("userchose")!=null){
  //   this.$router.push("/tabshow/hot")
  // }else{
  //   if(this.isCode()){
  //          this.getUserinfo()
  //          console.log(this.isCode())
  //       }else{
  //           this.getCode()
  //       }
  //    }
     
},
methods:{
  goshow(){
 
    localStorage.setItem('userchose',JSON.stringify(this.result))

    console.log("你好")
    // console.log(JSON.parse(localStorage.getItem("userinfo")))
    if(this.result.length!=0){
      // console.log(this.result)
      console.log(JSON.parse(localStorage.getItem("userchose")))
      console.log(JSON.parse(localStorage.getItem("userinfo")))
    axios.post(`http://106.14.145.57:7788/api/v1/userpost`,
    {
     classifier: JSON.parse(localStorage.getItem("userchose"))[0],
      openid: JSON.parse(localStorage.getItem("userinfo")).openid
    })
    .then(res=>{
      Toast("登录成功")
      this.$router.push("/tabshow/hot")          
}).catch(function name(params) {
      Toast("出错了")
})
    }else{
      Notify('请至少勾选一个选项');
    }
   
  },
         getCode(){
            axios
              .get('http://101.43.68.57:3000/getCode')
              .then(response => (window.location.href=response.data))
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
        },
       isCode(){
   
         return  window.location.search.includes('code=')
       },
        
       getUserinfo(){
         this.search=window.location.search
         const url_params=Object.fromEntries(window.location.search.slice(1).split('&').map(v=>v.split('=')))
         console.log(url_params)
         console.log(this.search)
         axios({
           method:'post',
           url:"http://101.43.68.57:3000/getUserInfo",
           data:{
             code:url_params.code,
             search:this.search

           }
         }).then(res=>{
            console.log(res.data)
              localStorage.setItem("userinfo",JSON.stringify(res.data))
             
              
         })
       },

   
}
}
</script>
