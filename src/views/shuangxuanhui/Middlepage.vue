<template>
    <div>

        <van-overlay :show="show">
            <div class="wrapper">
                <div class="block">
                    <div>
                        <van-row type="flex" justify="center">
                            <van-col span="12">
                                <van-button type="primary" v-clipboard:copy="url" v-clipboard:success="copy">复制链接
                                </van-button>
                            </van-col>
                        </van-row>
                        <van-row type="flex" justify="center">
                            <van-col span="8" style="margin-top:10px;">
                                <van-button type="info" @click="back">返回</van-button>
                            </van-col>
                        </van-row>



                    </div>

                </div>
            </div>
        </van-overlay>

    </div>
</template>
<style scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 220px;
    height: 120px;
    background-color: #fff;
}
</style>
<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
    data() {
        return {
            show: false,
            url: ""
        }
    },
    created() {
        console.log(this.$route.params.url)
        this.url = this.$route.params.url
        if (this.is_weixin()) {
            this.show = true
        } else {
            this.show = false
        }
    },
    methods: {
        is_weixin() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                console.log("微信浏览器");
                return true;
            } else {
                console.log("不是微信浏览器");
                return false;
            }
        },
        copy() {
            Toast("复制链接成功，请粘贴链接到本地浏览器中下载文件")
        },
        back() {
            this.$router.push("/index/")
        }
    },

}
</script>