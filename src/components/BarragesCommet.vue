<template>
  <div class="barrages-drop">
    <vue-baberrage
      :isShow="common_off.show"
      :barrageList="barrageList"
      :maxWordCount="maxWordCount"
      :throttleGap="throttleGap"
      :loop="barrageLoop"
      :boxHeight="boxHeight"
      :messageHeight="messageHeight"
    >
    </vue-baberrage>
  </div>
</template>
<script>
import axios from 'axios'
import {  MESSAGE_TYPE } from 'vue-baberrage';
import { v4 as uuidv4 } from 'uuid'
export default {
	name: 'BarragesCommet',
    props:["common_off"],
	data() {
		return {
      time:null,
      websocket:null,
      num:0,
      userinfo:null,
			msg: '马优晨就是个辣鸡~',
			barrageIsShow: true,
			messageHeight: 3,
			boxHeight: 150,
			barrageLoop: false,
			maxWordCount: 3,
			throttleGap: 5000,
			barrageList: []
		};
	},
    created(){
       console.log(JSON.parse(localStorage.getItem("userinfo")))
        if(JSON.parse(localStorage.getItem("userinfo"))!=null){
            this.userinfo=JSON.parse(localStorage.getItem("userinfo"))
        }
  
    },

	mounted() {
		// this.addToList();
	},
  watch:{
     common_off:{
         handler (val, olVal) {
           let this_1 = this
           if(val.show==true){
               this_1.getdata()
               if(this_1.time=null){
              this_1.time=setInterval(function () {
                     this_1.getdata()
              },10000)
               }
     }
         else{
           if(this_1.time!=null){
             clearInterval(this_1.time)
           }
         }
         },
            immediate:true,
            deep:true
  },
  },
	methods: {
    getdata(){
           let this_1 = this
             axios
              .get('http://106.14.145.57:7788/api/v1/component')
              .then(function (response) {
                console.log(response)
                response.data.data.forEach(element => {
                 this_1.barrageList.push({
                  id: ++this_1.currentId,
                  avatar: element.url,
                  msg: element.message,
                  time: Math.ceil(Math.random()*10),
                  type: MESSAGE_TYPE.NORMAL,
                  extraWidth: 60,
                  barrageStyle: element.color
                })
                });
              })
              .catch(function (error) { // 请求失败处理
                console.log(error);
              });
   
    },
      addToList(msg,time,color,img){
      this.barrageList.push({
        id: ++this.currentId,
        avatar: img,
        msg: msg,
        time: time,
        type: MESSAGE_TYPE.NORMAL,
        extraWidth: 60,
        barrageStyle: color
      })
    }
},

}
</script>
<style  lang="less">
.barrages-drop {
	.blue {
		border-radius: 100px;
		background: #e6ff75;
		color: #fff;
	}

	.green {
		border-radius: 100px;
		background: #75ffcd;
		color: #fff;
	}
	.red {
		border-radius: 100px;
		background: #e68fba;
		color: #fff;
	}
	.yellow {
		border-radius: 100px;
		background: #dfc795;
		color: #fff;
	}
	.baberrage-stage {
		position: absolute;
		width: 100%;
		height: 212px;
		overflow: hidden;
		top: 0;
		margin-top: 130px;
	}
}

</style>

