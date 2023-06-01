<template>
  <div>

     <span v-for="(item,index) in list" :key="index">
   <van-cell v-if="item.come=='publish'" :value="item.title" @click="mypublish(item)" />
    <van-cell v-else :value="item.title" :url="item.url" />
  </span>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      type: null,
      list: [],
      files:[]
    };
  },
  created() {
    console.log(this.$route.params.type);
    this.type = this.$route.params.type;
    axios({
      method: "GET",
      url: "http://106.14.145.57:7788/api/v1/workInformationUseSchoolName",
      params: { SchoolName: this.type },
    }).then((e) => {
      console.log(e.data.data);
      this.list = [];

        this.list = e.data.data;
    });
  },
  methods:{
       mypublish(item){
       this.$router.push({name:'page7',params:{item:item}})
    },

  }
};
</script>