<template>

<div class="user">

             <h5 style="line-height:1.92rem"> 
           <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-dingyuehao"></use>
                </svg>用户订阅模块
           </h5>
               <div class="UserTopic">
        <ul v-for="(item,index) in hot" :key="index" style="text-align:left;">
            <li style="margin:0px 5px;line-height:5px;color:#222222;font-size:16px;" class="van-ellipsis">
                <h4 style="display:inline-block;color:#fe2d46;" v-if="index==0" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#ff6600;" v-else-if="index==1" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#FAA901;" v-else-if="index==2" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#9195a3;" v-else >{{index+1}}</h4>
                
               &nbsp;<a :href="item.url">{{item.topic}}</a>
                </li>
        </ul>
    </div>
<van-button round type="info" style="position:fixed;top:300px;right:3px;z-index:10" @click="showPopup">弹幕</van-button>
  <van-button round type="info" style="position:fixed;top:350px;right:3px;z-index:10" @click="danmuclose">{{danmuon_off.name}}</van-button>
  <van-button round type="info" style="position:fixed;top:400px;right:3px;z-index:10"  @click="commonclose">{{ common_off.name}}大众评论</van-button>
  <!-- <van-button round type="info" style="position:fixed;top:450px;right:3px;z-index:10" @click="commonclose">{{ common_off.name}}</van-button> -->
    <van-button round type="info" style="position:fixed;top:450px;right:3px;z-index:10" @click="closeall">全部关闭</van-button>
<Barrages :mydata="mydata" :danmuon_off="danmuon_off"/>
<BarragesCommet :common_off="common_off" />
<van-popup v-model="show" position="bottom" :style="{ height: '70%' }" >
    <van-form @submit="onSubmit">
  <van-field
    v-model="danmu.content"
    name="contain"
    label="弹幕内容"
    placeholder="请输入弹幕内容"
    :rules="[{ required: true, message: '请填写弹幕内容' }]"
  />
<van-field name="radio" label="弹幕颜色">
  <template #input>
    <van-radio-group v-model="danmu.radio" direction="horizontal">
      <van-radio name="red">红色</van-radio>
      <van-radio name="green">绿色</van-radio>
        <van-radio name="blue">蓝色</van-radio>
          <van-radio name="yellow">黄色</van-radio>
    </van-radio-group>
  </template>
</van-field>
<van-field name="time" label="弹幕时间">
  <template #input>
    <van-stepper v-model="danmu.time" />
  </template>
</van-field>
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
</van-form>
</van-popup>
</div>

</template>
<style lang="less" scoped>


.user{
    width: 100%;
    height: 100%;
    text-align: center;
    background-color: #ffffffff;
  .UserTopic{
       width: 22.4rem;
      max-height: 32rem;
      margin:0 auto;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      a {
    color: #222222;
    text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
    text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
    text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
    text-decoration: none;
}
/* 正在点击的链接*/
a:active {
    text-decoration: none;
}
  }
}

</style>
<script>
import Barrages from '../../components/Barrages.vue'
import BarragesCommet from '../../components/BarragesCommet.vue'
import axios from 'axios'
import { Toast } from 'vant'
export default {
    components:{
        Barrages,
        BarragesCommet
    },
    name:"UserTopic",
    data(){
        return{
            websock:null,
            danmu:{
              content:"",
            radio: 'red',
           time: 5,
            },
           common_off:{
                show:false,
                name:"开启",
            },
            mydata:{
                id:0,
                content:"",
                color:"",
                time:5,
            },
            danmuon_off:{
                id:0,
                show:false,
                name:"开启",
            },
            hot:[],
            userinfo:null,
             show: false,
        }
    },

     created(){
        this.sendata()
       this.time=setInterval(() => {
             this.sendata()
       }, 60000);
 
    },
    beforeDestroy(){
        clearInterval(this.time)
      
    },
    methods:{

 showPopup() {
      this.show = true;
    },
    onSubmit(values) {
      console.log('submit', values);
      this.mydata.content=values.contain
      this.mydata.color=values.radio
      this.mydata.time=values.time
      this.mydata.id++
      this.show=false
    },
    closeall(){
      Toast("已关闭所有弹幕")
      this.danmuon_off.show=false
      this.danmuon_off.name="开启"
      this.common_off.show=false
      this.common_off.name="开启"
    },
      danmuclose(){
          console.log(this.danmuon_off)
         if(this.danmuon_off.show){
           Toast("实时弹幕关闭")
             this.danmuon_off.name="开启"
             this.danmuon_off.show=false
             
         }else{
           Toast("实时弹幕开启")
              this.danmuon_off.name="关闭"
             this.danmuon_off.show=true
              this.common_off.show=false
              this.common_off.name="开启"
               console.log(this.danmuon_off,this.common_off)
         }
      },
      commonclose(){
              console.log(this.danmuon_off)
          this.common_off.id++
         if(this.common_off.show){
           Toast("大众评论关闭")
             this.common_off.name="开启"
             this.common_off.show=false
             
         }else{
           Toast("大众评论开启")
              this.common_off.name="关闭"
             this.common_off.show=true
              this.danmuon_off.show=false
              this.danmuon_off.name="开启"
              console.log(this.danmuon_off,this.common_off)
         }
      },
        sendata(){
              let data=[]
            console.log(JSON.parse(localStorage.getItem("userchose")))
            JSON.parse(localStorage.getItem("userchose")).forEach(element => {
              
                this.getdata(element,data)
            });
            this.hot=data
            console.log(this.hot)
        },
     getdata(data,data2){
            let this_1=this
            axios.get("http://106.14.145.57:7788/api/v1/dataselect",{
                params:{
                    classifier:data
                }
            }).then(function (response) {
                response.data.data.forEach(element=>{
                    data2.push(element)
                })
                 
        }).catch(function (err) {
        　　console.log(err)
        });
        },


    },
    

}
</script>