<template>
  <div class="home">
    <h1
      style="font-size: 21px; margin: 0 0; text-align: center; padding: 20px 0"
    >
      基于rpa+AI的大数据分析平台
    </h1>
    <div @click="redian" style="overflow:hidden;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
      <img
        width="40"
        height="40"
        src="../../assets/热卖推荐.png"
        style="float:left;"
      />
      <h2 style="float:left;margin:10px 20px;font-size: 21px;">热点</h2>
    </div>
        <div @click="zhaopin" style="overflow:hidden;margin:10px 0;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
      <img
        width="40"
        height="40"
        src="../../assets/招聘会.png"
        style="float:left;"
      />
      <h2 style="float:left;margin:10px 20px;font-size: 21px;">招聘会</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
export default {
  name: "Home",
  components: {},
  created() {
    if (localStorage.getItem("userinfo") != null) {
      console.log(JSON.parse(localStorage.getItem("userinfo")));
    } else {
      if (this.isCode()) {
        this.getUserinfo();
        console.log(this.isCode());
      } else {
        this.getCode();
      }
    }
  },
  methods: {
    redian(){
       this.$router.push("/tabshow/hot")
    },
    zhaopin(){
      this.$router.push("/index")
    },
    getCode() {
      axios
        .get("http://101.43.68.57:3000/getCode")
        .then((response) => (window.location.href = response.data))
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    isCode() {
      return window.location.search.includes("code=");
    },

    getUserinfo() {
      this.search = window.location.search;
      const url_params = Object.fromEntries(
        window.location.search
          .slice(1)
          .split("&")
          .map((v) => v.split("="))
      );
      console.log(url_params);
      console.log(this.search);
      axios({
        method: "post",
        url: "http://101.43.68.57:3000/getUserInfo",
        data: {
          code: url_params.code,
          search: this.search,
        },
      }).then((res) => {
        console.log(res.data);
        localStorage.setItem("userinfo", JSON.stringify(res.data));
      });
    },
  },
};
</script>
