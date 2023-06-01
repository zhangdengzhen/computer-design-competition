<template>
    <div>
        <div class="hdaer">
            <img v-if="userinfo!=null" :src="userinfo.headimgurl" alt="">

            <img v-else src="" alt="" srcset="">
             <div  v-if="userinfo==null" class="name">
                  <h5 class="name1">游客模式</h5>
                   <h5 class="name2"><van-button type="primary"  size="mini">点击登录</van-button></h5>
             </div>
             <div v-else-if="userinfo!=null" class="name">
                  <h5 class="name1">{{userinfo.nickname}}</h5>
                   <h5 class="name2"><van-button type="primary" size="mini">登录成功</van-button></h5>
             </div>
        </div>
        <van-cell-group>
       
         <van-cell @click="showPicker = true" title="公众号定时推送"   />
          <van-cell @click="rechoose" title="重新选择"   />
            <van-cell @click="getvideo" title="短视频"   />
         <van-cell  title="大数据推送" @click="show=true"  />
             <van-cell title="rpa大数据分析主页面"  to="/" />
       </van-cell-group>
<van-popup v-model="show" position="bottom" :style="{ height: '70%' }" >
   <h4 style="text-align:center;font-size:15px;">注意事项</h4>
   <p style="text-indent:2em;font-size:12px;">1,开启本功能后默认您同意我们抓取您的隐私进行情感数据分析。</p>
   <p style="text-indent:2em;font-size:12px;">2,本团队承诺不盗用或泄露您的个人隐私。</p>
   <p style="text-indent:2em;font-size:12px;">3,若出现侵权现象请联系队长吴凯，一切后果本人承担</p>
   <p style="text-indent:2em;font-size:12px;">4,联系方式:1517736118@qq.com</p>
 <van-checkbox v-model="checked" style="font-size:14px;">本人已阅读并同意上述条件</van-checkbox>
<van-row type="flex" justify="space-around" style="text-align:center">
  <van-col span="12"> <van-button type="primary" @click="confirm">确认</van-button></van-col>
  <van-col span="12"> <van-button type="default" @click="cancle">取消</van-button></van-col>
 
</van-row>
  

</van-popup>
<van-popup v-model="showPicker" round position="bottom">
  <van-picker
    show-toolbar
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onConfirm"
  />
</van-popup>
    </div>

</template>
<style lang="less" scoped>
  .content {
    padding: 16px 16px 160px;
  }
.hdaer{
    width: 95%;
    background-color: #ffffff;
    margin: .32rem auto;
    overflow: hidden;
    img{
        padding: 3px 0;
        width: 3.84rem;
        height: 3.84rem;
        float: left;
    }
    .name{
        padding: .192rem 0;
        float: left;
        margin-left: .256rem;
        // background-color: rebeccapurple;
        width: 6.4rem;
        height: 3.84rem;
        position: relative;
      
    }
    .name1{
        font-size: .896rem;
        margin: 0;
        position: absolute;
        top: .576rem;
    }
    .name2{
        font-size: .896rem;
        margin: 0;
        position: absolute;
        top: 1.92rem;
    }
}
</style>
<script>
import axios from 'axios'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    data(){
         return{
         checked: false,
           show:false,
            value: '',
           showPicker: false,
            userinfo:null,
              columns: [
        // 第一列
        {
          values: ['1', '2', '3', '4', '5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
          defaultIndex: 2,
        },
        // 第二列
        {
          values: ['00', '01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20',
          '21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40',
          '41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
          defaultIndex: 1,
        },
      ],
         }
    },

    created(){
        console.log(JSON.parse(localStorage.getItem("userinfo")))
        if(JSON.parse(localStorage.getItem("userinfo"))!=null){
            this.userinfo=JSON.parse(localStorage.getItem("userinfo"))
        }
        console.log(JSON.parse(localStorage.getItem("userinfo")))
    },
    methods:{
      confirm(){
        if(this.checked==true){
          this.show=false
          Toast("您已确认本团抓取您的数据，已经为您开启大数据推送功能，感谢您的使用")
        }else{
          Toast("请勾选已阅读并同意以上条例")
        }
      },
      cancle(){
         this.show=false
      },
      rechoose(){
        localStorage.removeItem("userchose")
         this.$router.push("/home")
      },
 onConfirm(value) {
      this.value = value;
      this.showPicker = false;
      Toast("选择成功，我们会每天定时推送，敬请期待")
    },
  getvideo(){
    this.$router.push("/myvideo")
  }

    }
}
</script>