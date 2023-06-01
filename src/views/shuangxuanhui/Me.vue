<template>
  <div>
    <div class="hdaer">
      <img v-if="userinfo != null" :src="userinfo.headimgurl" alt="" />

      <img v-else src="" alt="" srcset="" />
      <div v-if="userinfo == null" class="name">
        <h5 class="name1">游客模式</h5>
        <h5 class="name2">
          <van-button type="primary" size="mini">点击登录</van-button>
        </h5>
      </div>
      <div v-else-if="userinfo != null" class="name">
        <h5 class="name1">{{ userinfo.nickname }}</h5>
        <h5 class="name2">
          <van-button type="primary" size="mini">登录成功</van-button>
        </h5>
      </div>
    </div>

    <van-cell title="rpa大数据分析主页面" is-link to="/" />
  </div>


</template>
<style lang="less" scoped>
.hdaer {
  width: 95%;
  background-color: #ffffff;
  margin: 0.32rem auto;
  overflow: hidden;
 

  img {
    padding: 3px 0;
    width: 3.84rem;
    height: 3.84rem;
    float: left;
  }
  .name {
    padding: 0.192rem 0;
    float: left;
    margin-left: 0.256rem;
    // background-color: rebeccapurple;
    width: 6.4rem;
    height: 3.84rem;
    position: relative;
  }
  .name1 {
    font-size: 0.896rem;
    margin: 0;
    position: absolute;
    top: 0.576rem;
  }
  .name2 {
    font-size: 0.896rem;
    margin: 0;
    position: absolute;
    top: 1.92rem;
  }
 }
</style>
<script>
export default {
  data() {
    return {
      userinfo: null,
    };
  },
  created(){
            console.log(JSON.parse(localStorage.getItem("userinfo")))
        if(JSON.parse(localStorage.getItem("userinfo"))!=null){
            this.userinfo=JSON.parse(localStorage.getItem("userinfo"))
        }
        console.log(JSON.parse(localStorage.getItem("userinfo")))
  }
};
</script>