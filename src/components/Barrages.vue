<template>
  <div class="barrages-drop">
    <vue-baberrage
      :isShow="danmuon_off.show"
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

import {  MESSAGE_TYPE } from 'vue-baberrage';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { v4 as uuidv4 } from 'uuid'
export default {
	name: 'Barrages',
    props:["mydata","danmuon_off"],
	data() {
		return {
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
        this. createWebsocket();
    },
    beforeDestroy(){
      this.websocketOnclose()
    },
	mounted() {
		// this.addToList();
	},
	methods: {
    createWebsocket() {
    
      let url ="ws://106.14.145.57:7788/api/v1/users/Ws/" + uuidv4()　
      this.websocket = new ReconnectingWebSocket(url,null, { debug: false, reconnectInterval: 3000 });
      // 连接发生错误的回调方法
      this.websocket.onerror = this.websocketOnerror;
      // 连接成功建立的回调方法
      this.websocket.onopen = this.websocketOnopen;
      // 接收到消息的回调方法
      this.websocket.onmessage = this.websocketOnmessage;
      // 连接关闭的回调方法
      this.websocket.onclose = this.websocketOnclose;
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      this.websocket.onbeforeunload = this.websocketOnbeforeunload;
    },
    // 连接发生错误的回调方法
    websocketOnerror() {
      console.log('连接发生错误的回调方法');
    },
    // 连接成功建立的回调方法
    websocketOnopen() {
      console.log('连接成功建立的回调方法');
    },
    // 接收到消息的回调方法
    websocketOnmessage(event) {
    
      console.log('接收到消息的回调方法', event.data);
      let data = JSON.parse(event.data)
      console.log(data.time,data.color,data.text)
      this.addToList(data.text,data.time,data.color,data.link)

    },
    // 连接关闭的回调方法
    websocketOnclose() {
      console.log('连接关闭的回调方法');
    },
    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
    websocketOnbeforeunload() {
      this.closeWebSocket();
      console.log('监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常');
    },
    // 关闭WebSocket连接
    closeWebSocket() {
      this.websocket.close();
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
     watch:{
            
            mydata:{
                  handler (val, olVal) {
                console.log("子组件数据",val)
                let data={
                  text:"",
                  color:"",
                  link:"",
                  time:5
                }
                console.log(this.userinfo)
                data.text=val.content
                data.color = val.color
                data.link=this.userinfo.headimgurl
                data.time=data.time
                console.log(data)
                this.websocket.send(JSON.stringify(data))
            },
            immediate:true,
            deep:true
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

