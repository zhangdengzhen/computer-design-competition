<template>
    <!-- 自己发布的招聘信息 -->
    <div style="width:100%;height:100%;background:#ffffff;overflow: auto;">
        <div style="font-size:15px;text-align:center;">{{ item.title }}</div>
        <div style="font-size:13px;margin: 5px 0;">公司：{{ item.company }}</div>
        <div style="font-size:13px;margin: 5px 0;">地点：{{ item.area }},{{ item.schoolName }}</div>
        <div style="font-size:13px;margin: 5px 0;">具体地点: {{ item.place }}</div>
        <div v-for="(item, index) in item2" :key="index">
            <div style="font-size:13px;margin: 5px 0;">开始时间: {{ item.startTime }}</div>
            <div style="font-size:13px;margin: 5px 0;">截止时间: {{ item.endTime }}</div>
            <div style="font-size:13px;margin: 5px 0;">详情: </div>
            <div style="font-size:13px;margin: 5px 0;">
                <p style="text-indent:2em;">
                    {{ item.content }}
                </p>
            </div>
        </div>
        <div style="font-size:13px;margin: 5px 0;">文件</div>
        <div v-for="(item, index) in files" :key="'file' + index">
            <van-row type="flex">
                <van-col span="15"><span style="font-size:14px;">{{ item.url.split("/")[2].split("-")[4] }}</span>
                </van-col>
                <van-col span="9">
                    <van-row type="flex">
                        <!-- <van-col span="12">
                            <van-button type="primary" size="mini">预览</van-button>
                        </van-col> -->
                        <van-col span="12">
                            <van-button type="primary" size="mini" @click="mydownload(item.url)">下载</van-button>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>

        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            item: null,
            item2: [],
            files: []
        }
    },
    created() {
        // console.log(this.$route.params.item);
        this.item = this.$route.params.item
        this.init()
    },
    methods: {
        init() {
            axios({
                method: "GET",
                url: "http://106.14.145.57:7788/api/v1/workPublish",
                params: { uuid: this.item.url },
            }).then((e) => {
                this.item2 = e.data.data
                console.log(this.item2 = e.data.data)
                if (this.item2[0] != "") {
                    this.getfile(this.item2[0].file)
                }

            });
        },
        getfile(uuid) {
            axios({
                method: "GET",
                url: "http://106.14.145.57:7788/api/v1/getFile",
                params: { uuid: uuid },
            }).then((e) => {
                console.log(e.data.data);
                this.files = e.data.data
                console.log(this.files)
            });
        },
        mydownload(url) {
            this.$router.push({name:'middlepage',params:{url:"http://106.14.145.57:7788"+url}})       
        },


    }
}
</script>