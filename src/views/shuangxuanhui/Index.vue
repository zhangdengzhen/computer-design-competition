<template>
  <div style="width:100%;height:100%;">
    <router-view />
    <van-tabbar v-model="active" @change="onChange" route>
      <van-tabbar-item replace to="/index/page1">
        <span>推荐</span>
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="active == 0 ? icon.active : icon.inactive"></use>
          </svg>
        </template>
      </van-tabbar-item>

      <van-tabbar-item replace to="/index/page2">
        <span>分类</span>
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use
              :xlink:href="active == 1 ? icon.active1 : icon.inactive1"
            ></use>
          </svg>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/index/page5">
        <span>招聘</span>
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use
              :xlink:href="active == 2 ? icon.active3 : icon.inactive3"
            ></use>
          </svg>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/index/page3">
        <span>我的</span>
        <template #icon>
          <svg class="icon" aria-hidden="true">
            <use
              :xlink:href="active == 3 ? icon.active2 : icon.inactive2"
            ></use>
          </svg>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: "#icon-remaituijian",
        inactive: "#icon-remaituijian-copy",
        active1: "#icon-fenlei",
        inactive1: "#icon-fenlei-copy",
        active2: "#icon-wode-copy",
        inactive2: "#icon-wode-copy-copy",
        active3: "#icon-qiyezhaopin",
        inactive3: "#icon-qiyezhaopin-copy",
      },
    };
  },
  methods: {
    onChange(index) {
      console.log(index, this.active);
    },
  },
};
</script>