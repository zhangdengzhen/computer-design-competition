<template>
    <!-- 发布招聘 -->
    <div style="overflow:auto;padding-bottom: 40px;">
        <van-form @submit="onSubmit">
            <van-field v-model="title" name="title" label="标题" placeholder="标题"
                :rules="[{ required: true, message: '请填写标题' }]" />
            <van-field readonly clickable name="starttime" :value="startTime" label="开始时间" placeholder="点击选择时间"
                @click="showPicker1 = true" />
            <van-field readonly clickable name="endtime" :value="endTime" label="截止时间" placeholder="点击选择时间"
                @click="showPicker2 = true" />
            <van-field v-model="company" name="compane" label="公司" placeholder="公司"
                :rules="[{ required: true, message: '请填写公司' }]" />
            <van-field v-model="area" name="area" label="地区" placeholder="地区,例如广州"
                :rules="[{ required: true, message: '请填写地区,例如广州' }]" />
            <van-field v-model="schoolName" name="school" label="学校" placeholder="学校，选填"
                :rules="[{ required: false, message: '请填写学校' }]" />
            <van-field v-model="place" name="place" label="具体地点" placeholder="具体地点"
                :rules="[{ required: true, message: '请填写具体地点' }]" />
            <van-field v-model="content" rows="2" name="content" autosize label="内容" type="textarea" maxlength="2000"
                placeholder="请输入内容" show-word-limit />
            <van-field name="uploader" label="文件上传">
                <template #input>
                    <van-uploader :after-read="afterRead" :max-count="3"
                        accept=" application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,image/*"
                        @delete="mydelete" multiple v-model="uploader" />
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <van-popup v-model="showPicker1" position="bottom">
            <van-datetime-picker type="date" :min-date="minDate" v-model="currentDate" :max-date="maxDate"
                @confirm="onConfirm1" @cancel="showPicker1 = false" />
        </van-popup>

        <van-popup v-model="showPicker2" position="bottom">
            <van-datetime-picker type="date" :min-date="minDate" v-model="currentDate" :max-date="maxDate"
                @confirm="onConfirm2" @cancel="showPicker2 = false" />
        </van-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
import axios from 'axios';
export default {
    data() {
        return {
            deletable: false,
            title: '',
            company: "",
            area: '',
            place: "",
            schoolName: "",
            message: "",
            startTime: '',
            content: "",
            fileuuid: "",
            showPicker1: false,//开始时间
            endTime: '',
            uploader: [],
            fileid: 0,
            showPicker2: false,//开始时间
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(2021, 0, 17),
            formData: null
        };
    },
    methods: {
        onSubmit(values) {

            if (this.uploader.length > 0) {
                let formdata = new FormData()
                this.uploader.forEach((item, i) => {

                    formdata.append("file", item.file)

                }
                )

                axios
                    .post(
                        "http://106.14.145.57:7788/api/v1/testuploadimg",
                        formdata,
                        {
                            headers: {
                                "content-type": "multer/form-data"
                            }
                        }
                    )
                    .then(res => {
                        console.log(res)
                        this.fileuuid = res.data.data
                        console.log(this.fileuuid, "文件")
                        this.repo(values)
                    });
            } else {
                this.repo(values)
            }


        },
        // 开始时间
        onConfirm1(value) {
            console.log(value)
            let str = ""
            str = this.jsDateFormatter(value)
            console.log(str)
            this.startTime = str;
            this.showPicker1 = false;
        },
        // 截止时间
        onConfirm2(value) {
            console.log(value)
            let str = ""
            str = this.jsDateFormatter(value)
            console.log(str)
            this.endTime = str;
            this.showPicker2 = false;
        },
        jsDateFormatter: function (date) {
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes()+ seperator2 + date.getSeconds();    
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            return currentdate;
        },
        afterRead(file) {
            console.log(this.uploader)

        },
        mydelete(file) {
            let i = null
            this.uploader.forEach((item, index) => {
                if (item.file.name == file.name) {
                    i = index
                }
            })
            if (i) {
                this.uploader.remove(i)
            }
            console.log(this.uploader)
        },
        repo(values) {
            // 提交数据,发布招聘
            axios({
                method: "post",
                url: "http://106.14.145.57:7788/api/v1/workPublish",
                data: {
                    area: values.area,
                    company: values.compane,
                    content: values.content,
                    endTime: values.endtime,
                    file: this.fileuuid,
                    openid: JSON.parse(localStorage.getItem("userinfo")).openid,
                    place: values.place,
                    schoolName: values.school,
                    startTime: values.starttime,
                    title: values.title
                },
            }).then((res) => {
                console.log(res.data)
                Toast('发布成功');
                this.$router.push("/index/page5")
            });
        }

    },
}
</script>