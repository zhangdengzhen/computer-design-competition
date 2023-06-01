<template>
    <div>
        <van-swipe-cell v-for="(item,index) in list" :key="index">
            <van-cell :border="false" :title="item.title" @click="content(item)" />
            <template #right>
                <van-button square type="danger" @click="shanchu(item.url)" text="删除" />
            </template>
        </van-swipe-cell>
        <drag-ball :value="message" @click="fabu">
            <div slot="value">发布</div>
        </drag-ball>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    data() {
        return {
            message: "你好",
            list:[]
        }
    },
    components: {

    },
    created() {
         this.init()
    },
    methods: {
        // 查看详情
        content(item){
           this.$router.push({name:'page7',params:{item:item}})
        },
        fabu() {
            console.log("发布招聘")
            this.$router.push("/index/page6")
        },
        shanchu(url) {
              axios({
                method: "DELETE",
                url: "http://106.14.145.57:7788/api/v1/workPublish",
               data: { url: url },
            }).then((e) => {
                if(e.data.code==200){
                    Toast("删除成功")
                    this.init()
                }
            });

        },
        init(){
                        axios({
                method: "GET",
                url: "http://106.14.145.57:7788/api/v1/workInformationPublish",
                params: { openid: JSON.parse(localStorage.getItem("userinfo")).openid },
            }).then((e) => {
                this.list=e.data.data
                console.log(e.data.data)
            });
        }
    }
}
</script>