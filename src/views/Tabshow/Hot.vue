<template>
<div class="hot" >
             <h5 style="line-height:1.92rem"> 
           <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-redu"></use>
                </svg>实时热点榜
                </h5>
    <div class="Hot" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);padding-bottom: 50px;">
        <ul v-for="(item,index) in hot" :key="index" style="text-align:left;">
            <li style="margin:0px 5px;line-height:5px;color:#222222;font-size:16px;" >
                <h4 style="display:inline-block;color:#fe2d46;" v-if="index==0" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#ff6600;" v-else-if="index==1" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#FAA901;" v-else-if="index==2" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#9195a3;" v-else >{{index+1}}</h4>
                &nbsp;<a target="_self" :href="item.url" style="display:inline-block;width:200px;line-height:20px;" class="van-ellipsis">{{item.topic}}</a>
                <van-tag type="success">{{item.classifier}}</van-tag>
                 &nbsp;
                <van-tag type="primary">{{item.human}}</van-tag>
                </li>
        </ul>
    </div>
</div>

</template>
<style lang="less" scoped>

.hot{
    text-align: center;
    background-color: #ffffffff;
     .Hot{
     overflow: auto;
    //  max-height: 32rem;
    // height: 500px;
    //   width: 22.4rem;
     margin: 0 auto;
     /*包含以下四种的链接*/
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
import { Toast } from 'vant';
import axios from 'axios'
export default {
   
    data(){
        return{
            hot:null,
            time:null
        }
    },
    created(){
       this.getdata()
       this.time=setInterval(() => {
            this.getdata()
       }, 60000);

   axios.post(`http://106.14.145.57:7788/api/v1/userpost`,
    {
     classifier: JSON.parse(localStorage.getItem("userchose"))[0],
      openid: JSON.parse(localStorage.getItem("userinfo")).openid
    })
    .then(res=>{
      Toast("欢迎")   
}).catch(function name(params) {
      Toast("出错了")
})
    },
    beforeDestroy(){
        clearInterval(this.time)
    },
    methods:{
        getdata(){
            let this_1=this
            axios.get("http://106.14.145.57:7788/api/v1/data").then(function (response) {
            this_1.hot=response.data.data
        　　console.log(this_1.hot)
        }).catch(function (err) {
        　　console.log(err)
        });
        }
    }

}
</script>