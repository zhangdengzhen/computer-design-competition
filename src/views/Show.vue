<template>
  <div class="show">
    <div class="header">
        <h5>实时数据展示</h5>
    </div>
    <div class="hot">
         <h5 style="line-height:1.92rem"> 
           <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-redu"></use>
                </svg>实时热点榜
           </h5>
         <Hot/>
    </div>
    <div class="usertopic">
         <h5 style="line-height:1.92rem"> 
           <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-dingyuehao"></use>
                </svg>用户订阅模块
           </h5>
           <UserTopic/>
    </div>
    <div class="bar">
         <h5 style="line-height:1.92rem"> 
           <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-zhuzhuangtu"></use>
                </svg>各类条形图
           </h5>
           <Bar/>
    </div>
    <div class="pie">
         <h5 style="line-height:1.92rem"> 
           <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-bingzhuangtu"></use>
                </svg>各分类占比
           </h5>
           <Pie/>
    </div>
    <div class="footer">
     <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
             感谢您的使用。bug提交：1517736118@qq.com
     </van-notice-bar>
    </div>
  </div>
</template>
<style lang="less" scoped>
.header{
   text-align: center;
}
.hot{
  overflow: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 1.28rem auto;
  width: 21.76rem;
  height: 19.2rem;

}
.usertopic{
  overflow: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 20px auto;
  width: 21.76rem;
  height: 19.2rem;
}
.bar{
  text-align: center;
  overflow: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 1.28rem auto;
  width: 21.76rem;
  height: 19.2rem;
}
.pie{
  overflow: auto;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 1.28rem auto;
  width: 21.76rem;
  height: 19.2rem;
  
}
</style>
<script>
import Hot from "../components/Hot.vue"
import UserTopic from '../components/UserTopic.vue'
import Bar from '../components/Bar.vue'
import Pie from '../components/Pie.vue'
export default {
  components:{
    Hot,
    UserTopic,
    Bar,
    Pie
  }
}
</script>