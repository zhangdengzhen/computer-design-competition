<template>
    <div>
 <router-view/>
<van-tabbar v-model="active" @change="onChange"  route>
  <van-tabbar-item replace to="/tabshow/hot">
          <span :class="{'active1':active==0,'inactive':active!=0}">热点</span>
    <template #icon="props">
               <svg class="icon" aria-hidden="true">
                 <use :xlink:href="props.active ? icon.active : icon.inactive"></use>
                </svg>
    </template>
  </van-tabbar-item>

  <van-tabbar-item replace to="/tabshow/usertopic">
    <span :class="{'active2':active==1,'inactive':active!=1}">订阅</span>
       <template #icon="props">
               <svg class="icon" aria-hidden="true">
                 <use :xlink:href="props.active ? icon.active2 : icon.inactive2"></use>
                </svg>
         </template>
  </van-tabbar-item>

  <van-tabbar-item replace to="/tabshow/bar" >
          <span :class="{'active3':active==2,'inactive':active!=2}">趋势</span>
       <template #icon="props">
               <svg class="icon" aria-hidden="true">
                 <use :xlink:href="props.active ? icon.active3 : icon.inactive3"></use>
                </svg>
         </template>
  </van-tabbar-item>

  <van-tabbar-item replace to="/tabshow/pie">
          <span :class="{'active4':active==3,'inactive':active!=3}">分布</span>
       <template #icon="props">
               <svg class="icon" aria-hidden="true">
                 <use :xlink:href="props.active ? icon.active4 : icon.inactive4"></use>
                </svg>
         </template>
  </van-tabbar-item>

  <van-tabbar-item replace to="/tabshow/me">
          <span :class="{'active5':active==4,'inactive':active!=4}">我的</span>
       <template #icon="props">
               <svg class="icon" aria-hidden="true">
                 <use :xlink:href="props.active ? icon.active5 : icon.inactive5"></use>
                </svg>
         </template>
  </van-tabbar-item>
</van-tabbar>
    </div>
</template>
<style lang="less" scoped>
    .active1{
        color: red;
    }
    .active2{
        color: #F5AB16;
    }
    .active3{
        color: #54C3F1;
    }
    .active5{
        color: #f4ea2a;
    }
        .active4{
        color: #54C3F1;
    }
    .inactive{
        color: #8a8a8a8a;
    }
</style>
<script>

export default {
    data(){
        return{
            active: 0,
      icon: {
        active: '#icon-redu',
        inactive: '#icon-redu-copy',
                active2: '#icon-dingyuehao',
        inactive2: '#icon-dingyuehao-copy',
                active3: '#icon-zhuzhuangtu',
        inactive3: '#icon-zhuzhuangtu-copy',
         active4: '#icon-bingzhuangtu',
        inactive4: '#icon-bingzhuangtu-copy',
          active5: '#icon-wode-copy',
        inactive5: '#icon-wode',
      },
        }
    },
    methods:{
            onChange(index) {
        console.log(index)

    },
    }
}
</script>