<template>
<!-- 分类页面 -->
  <div style="padding-bottom:40px;">
    <van-cell
      v-for="(item, index) in list"
      :key="index"
      :value="item"
      :url="item.url"
      @click="info(item)"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      isLoading: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios.get("http://106.14.145.57:7788/api/v1/School").then((e) => {
        this.list = [];
        this.list = e.data.data;
        console.log(e);
        this.isLoading = false;
      });
    },
    info(val) {
this.$router.push({name:'page4',params:{type:val}})
      console.log("我被点击");
    },
  },
};
</script>