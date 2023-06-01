<template>
  <div style="padding-bottom:40px;">
    <van-search
      v-model="value"
      show-action
      label="地址"
      placeholder="请输入搜索关键词"
    >
      <template #label>
        <div @click="onChange">{{ type }}</div>
      </template>
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  <span v-for="(item,index) in list" :key="index">
   <van-cell v-if="item.come=='publish'" :value="item.title" @click="mypublish(item)" />
    <van-cell v-else :value="item.title" :url="item.url" />
  </span>
 
</van-pull-refresh>
   

    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      value: "",
      type: "学校",
      showPicker: false,
      columns: ["学校","地区"],
       list: [],
       isLoading: false,
    };
  },
  created(){
    this.init()
  },
  methods: {
    onSearch() {
      console.log(this.value);
      axios({
        method:'get',
        url:"http://106.14.145.57:7788/api/v1/workInformationLike",
        params:{
          type:this.type,
          keyword:this.value
        }
      }).then(e=>{
        console.log(e.data)
        this.list=[]
        this.list=e.data.data
      })
    },
    onChange() {
      this.showPicker=true
    },
    onConfirm(value) {
      this.type = value;
      this.showPicker = false;
    },
        onRefresh() {
      setTimeout(() => {
          this.init()
      }, 1000);
    },
    init(){
        axios.get("http://106.14.145.57:7788/api/v1/workInformation")
        .then(e=>{
          this.list=[]
          this.list=e.data.data
          console.log(e)
          this.isLoading=false
        })
    },
    mypublish(item){
       this.$router.push({name:'page7',params:{item:item}})
    }
  },
};
</script>