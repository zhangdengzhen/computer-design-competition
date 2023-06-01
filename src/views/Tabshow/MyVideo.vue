<template>
  <div style="width: 100%; height: 100%">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      style="width: 100%; height: 100%"
    >
      <Play :src="video.url" />
      <!-- 右侧头像、点赞、评论、分享功能 -->
      <div class="tools_right">
        <!-- <div class="tools_r_li">
                <img :src="item.tag_image" class="tag_image" />
                <i
                  class="iconfont icon-jiahao tag_add"
                  v-show="!item.tagFollow"
                  @click="checkSubscribe(item, index)"
                ></i>
                <i
                  class="iconfont icon-duihao tag_dui"
                  v-show="item.tagFollow"
                  :class="item.tagFollow ? 'tag_dui_active' : ''"
                ></i>
              </div> -->

              <!-- 点赞 -->
        <!-- <div class="tools_r_li">
          <i
            class="iconfont icon-shoucang icon_right"
            :class="false ? 'fabulous_active' : ''"
          ></i>
        </div> -->
        <div class="tools_r_li" @click="comment">
          <i class="iconfont icon-liuyan icon_right icon_right_change"></i>
          <!-- <div class="tools_r_num">12.5w</div> -->
        </div>
        <!-- <div class="tools_r_li">
          <i class="iconfont icon-iconfontforward icon_right"></i>
          <div class="tools_r_num">22.2w</div>
        </div> -->
      </div>
      <!--底部操作栏-->
      <div class="container_bottom">
        <!-- <div
          class="border_progress"
          :style="'width:' + videoProcess + '%'"
        ></div> -->
        <div
          class="bottom_tab"
          :class="tabIndex == 0 ? 'tab_active' : ''"
          @click="changeTab(0)"
        >
          <span class="bottom_tab_span">首页</span>
        </div>
        <div
          class="bottom_tab"
          :class="tabIndex == 1 ? 'tab_active' : ''"
          @click="changeTab(1)"
        >
          <img
            src="http://oss.jishiyoo.com/images/file-1575427746903.png"
            alt=""
            class="bottom_tab_icon"
          />
        </div>
        <div
          class="bottom_tab"
          :class="tabIndex == 2 ? 'tab_active' : ''"
          @click="changeTab(2)"
        >
          <span class="bottom_tab_span" @click="goback">我的</span>
        </div>
      </div>

      <!-- 底部作品描述 -->
      <div class="production_box">
        <div class="production_name">{{myinfo.name}}</div>
        <div class="production_des">{{myinfo.videotype}}</div>
      </div>
    </van-pull-refresh>
    <Comment :videoinfo="videoinfo" />
  </div>
</template>

<script>
import axios from "axios";
import Comment from "../../components/Comment.vue";
import Play from "../../components/Play.vue";
export default {
  name: "Video",
  components: {
    Play,
    Comment,
  },
  data() {
    return {
      dp: {},
      myinfo:{name:"",videotype:""},
      tabIndex: 0,
      isLoading: false,
      videoinfo: { id: 0, videoid: 0, pop: false,topicType:"" },
      video: {
        id: 0,
        url: "http://vd3.bdstatic.com/mda-mme7s7cxspdep1fn/360p/h264/1639546196904971878/mda-mme7s7cxspdep1fn.mp4?v_from_s=hkapp-haokan-hbe",
      },
      contextmenu: [
        {
          text: "旅行",
          link: "http://vd3.bdstatic.com/mda-mme7s7cxspdep1fn/360p/h264/1639546196904971878/mda-mme7s7cxspdep1fn.mp4?v_from_s=hkapp-haokan-hbe",
        },
        {
          text: "custom2",
          link: "http://vd4.bdstatic.com/mda-nb89qaf53wffqbxd/360p/h264_delogo/1644389566674767143/mda-nb89qaf53wffqbxd.mp4?v_from_s=hkapp-haokan-tucheng",
        },
        {
          text: "3",
          link: "http://vd3.bdstatic.com/mda-nbqew1m1j30s2i8u/360p/h264_delogo/1645785858356101514/mda-nbqew1m1j30s2i8u.mp4?v_from_s=hkapp-haokan-tucheng",
        },
      ],
    };
  },
  created(){
     axios.get("http://106.14.145.57:7788/api/v1/video").then((e) => {
          console.log(e)
          this.video.url = e.data.data.url;
          this.videoinfo.videoid=e.data.data.id
          this.videoinfo.topicType=e.data.data.type
          this.myinfo.name=JSON.parse(localStorage.getItem("userinfo")).nickname
          this.myinfo.videotype=e.data.data.type
        });
  },
  methods: {
    // 评论
    comment() {
      this.videoinfo.id++;
      this.videoinfo.pop = true;
      console.log("我白大音");
    },
    //滑动改变播放的视频
    onChange(index) {
      console.log(index, "当前页面");
      this.url = this.contextmenu.link;
    },
    //改变菜单
    changeTab(index) {
      this.tabIndex = index;
    },
    goback(){
      this.$router.push("/tabshow/me")
    },
    onRefresh() {
      setTimeout(() => {
        this.Toast("刷新成功");
        this.isLoading = false;
        this.count++;
        axios.get("http://106.14.145.57:7788/api/v1/video").then((e) => {
          console.log(e)
          this.video.url = e.data.data.url;
          this.videoinfo.videoid=e.data.data.id
          this.videoinfo.topicType=e.data.data.type
           this.myinfo.name=JSON.parse(localStorage.getItem("userinfo")).nickname
          this.myinfo.videotype=e.data.data.type
        });
      }, 1000);
    },
  },
  //弹出评论窗口
  changeComment() {},
  //改变收藏状态
  changeFabulous(item, index) {},
  //展示分享弹窗
  changeShare() {},
};
</script>
<style scoped>
.product_swiper {
  width: 100%;
  height: 100%;
}

.container_bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  height: 48px;
  /*border-top: 1px solid rgba(255, 255, 255, 0.7);*/
  max-width: 550px;
}
.bottom_tab {
  width: 33%;
  text-align: center;
  float: left;
  color: #c9c9c9;
  padding: 10px 0;
}

.bottom_tab_icon {
  width: 44px;
}

.bottom_tab_span {
  line-height: 28px;
  border-bottom: 2px solid transparent;
  font-weight: 600;
  font-size: 16px;
  display: inline-block;
  padding: 0 4px;
  transition: 0.5s all;
}

.tab_active .bottom_tab_span {
  border-bottom: 2px solid #fff;
  color: #fff;
}

/* 作品描述 */

.production_box {
  z-index: 1001;
  position: absolute;
  /* right: 16px; */
  bottom: 48px;
  text-align: left;
  padding: 0 15px 15px 15px;
  color: #fff;
  width: 100%;
  left: 0;
  box-sizing: border-box;
  background: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0)
  );
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  /* 标准的语法 */
}

.production_name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}

.production_des {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 62px;
  font-size: 13px;
}

.tools_right {
  z-index: 1001;
  position: absolute;
  right: 16px;
  bottom: 180px;
}

.tools_r_li {
  margin-bottom: 20px;
  color: #fff;
  font-size: 14px;
  position: relative;
}

.tools_r_li:last-child {
  margin-bottom: 0px;
}

.icon_right {
  margin-bottom: 5px;
  font-size: 42px;
  display: block;
  text-shadow: 0px 0px 10px #9d9d9d;
  /*transition: .5s;*/
}
</style>
