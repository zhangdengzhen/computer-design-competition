<template>
  <div>
    <!--留言弹窗-->
    <van-popup
      v-model="videoinfo.pop"
      closeable
      :overlay="true"
      class="comment_container"
      position="bottom"
    >
      <div class="comment_box">
        <div class="comment_top">
          12.5w条评论
          <i class="iconfont icon-guanbi1 guanbi3" @click="closeComment"></i>
        </div>
        <ul class="comment_ul">
          <div v-if="videoComment.length != 0">
            <transition-group appear>
              <li
                class="comment_li"
                v-for="(item, index) in videoComment"
                :key="index"
                @click="replayUser(item, index, -1)"
              >
                <div class="comment_author_left">
                  <img :src="item.url" />
                </div>
                <div class="comment_author_right">
                  <div class="comment_author_top">
                    <div class="comment_author_name">@{{ item.nickName }}</div>
                    <div
                      class="icon-shoucang1_box"
                      @click.stop="commentLove(item, index, -1)"
                    >
                      <!-- <div
                        class="icon_right_change"
                        :class="false ? 'love_active' : ''"
                      >
                        <i class="iconfont icon-shoucang icon-shoucang1"></i>
                      </div> -->
                      <!-- <div class="shoucang1_num">空</div> -->
                    </div>
                  </div>
                  <div class="comment_author_text">
                    {{ item.content }}
                    <!-- <span>空</span> -->
                  </div>
                </div>
                <div class="clear"></div>
                <div class="comment_replay_box">
                  <transition-group appear>
                    <div
                      class="comment_replay_li"
                      v-for="(item2, index2) in item.replyEntities"
                      :key="index2"
                      @click.stop="replayUser(item2, index, index2)"
                    >
                      <div class="comment_replay_left">
                        <img :src="item2.url" />
                      </div>
                      <div class="comment_replay_right">
                        <div class="comment_replay_top">
                          <div class="comment_replay_name">
                            @{{ item2.fromNickname }}
                          </div>
                          <!-- <div
                            class="icon-shoucang1_box"
                            @click.stop="commentLove(item2, index, index2)"
                          >
                            <div
                              class="icon_right_change"
                              :class="false ? 'love_active' : ''"
                            >
                              <i
                                class="iconfont icon-shoucang icon-shoucang1"
                              ></i>
                            </div>
                            <div class="shoucang1_num">
                             11
                            </div>
                          </div> -->
                        </div>
                        <div class="comment_replay_text">
                          <span>回复 {{ item2.toNickname }}：</span>
                          {{ item2.content }}
                          <!-- <span>空</span> -->
                        </div>
                      </div>
                      <div class="clear"></div>
                    </div>
                  </transition-group>
                </div>
              </li>
            </transition-group>
          </div>
          <div
            class="no_message"
            style="text-align: center"
            v-if="videoComment.length == 0"
          >
            <i class="iconfont iconfont_style icon-zanwupinglun"></i>
            <div class="no_message_tips" style="font-size: 12px">暂无评论</div>
          </div>
        </ul>
      </div>
    </van-popup>
    <!--留言输入-->
    <div class="comment_input_box_hover"></div>
    <div
      class="comment_input_box"
      v-show="videoinfo.pop"
      style="font-size: 12px"
    >
      <!--<form action="#" class="comment_form">-->
      <input
        :placeholder="commentPlaceholder"
        class="comment_input"
        v-model="comment_text"
        ref="content"
        @keyup.enter="checkComment"
      />
      <!--</form>-->
      <div class="comment_input_right" @click="checkComment">
        <i
          class="iconfont icon-fasong comment_i"
          :class="canSend ? 'comment_i_active' : ''"
        ></i>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Comment",
  props: ["videoinfo"],
  data() {
    return {
      commentPop: false, //弹窗
      videoComment: [],
      comment_text: "", //评论输入内容
      commentPlaceholder: "留下你的精彩评论吧",
      canSend: false, //是否可以发送
      replayUserData: "",
      name: {
        nickname: "",
        fromNickname: "",
      },
    };
  },
  computed: {
    twoNum() {
      return this.videoinfo;
    },
  },

  watch: {
    twoNum: {
      handler: function (val, oldVal) {
        console.log(val, "评论");
        axios
          .get(`http://106.14.145.57:7788/api/v1/commentList?topicId=${val.videoid}`)
          .then((e) => {
            this.replayUserData=""
            console.log("评论数据", e.data.data);
            if(e.data.code==200){
            this.videoComment = [];
            this.videoComment = e.data.data;
            this.Toast("获取评论数据成功")
            }else if(e.data.msg=="not found"){
                this.videoComment = [];
                //  this.Toast("暂无评论")
            }

          });
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    closeComment() {},
    //检测评论内容
    checkComment() {
      if (this.comment_text == "") {
        this.Toast("评论内容不能为空");
      } else {
        if (this.name.nickname == "" && this.name.fromNickname == "") {
          axios
            .post("http://106.14.145.57:7788/api/v1/comment", {
              content: this.comment_text,
              id: 0,
              nickname: JSON.parse(localStorage.getItem("userinfo")).nickname,
              openid: JSON.parse(localStorage.getItem("userinfo")).openid,
              topicId: this.videoinfo.videoid,
              topicType: this.videoinfo.topicType,
              url: JSON.parse(localStorage.getItem("userinfo")).headimgurl,
            })
            .then((e) => {
              console.log(e.data, "发表父评论");
              this.Toast("发表评论成功");
              this.comment_text = "";
              this.initcomment()
            });
        } else if (this.name.nickname != "") {
          axios.post("http://106.14.145.57:7788/api/v1/reply", {
            commentId: this.replayUserData.commentId,
            content: this.comment_text,
            fromNickname: JSON.parse(localStorage.getItem("userinfo")).nickname,
            fromUid: JSON.parse(localStorage.getItem("userinfo")).openid,
            id: 0,
            replyId: this.replayUserData.commentId,
            replyType: "comment",
            toNickname: this.replayUserData.nickName,
            toUid: this.replayUserData.openid,
            url: JSON.parse(localStorage.getItem("userinfo")).headimgurl,
          }).then(e=>{
            this.Toast("发表评论成功")
             this.comment_text = "";
                this.initcomment()
          })
        } else {
                   axios.post("http://106.14.145.57:7788/api/v1/reply", {
            commentId: this.replayUserData.commentId,
            content: this.comment_text,
            fromNickname: JSON.parse(localStorage.getItem("userinfo")).nickname,
            fromUid: JSON.parse(localStorage.getItem("userinfo")).openid,
            id: 0,
            replyId: this.replayUserData.id,
            replyType: "reply",
            toNickname: this.replayUserData.fromNickname,
            toUid: this.replayUserData.fromUid,
            url: JSON.parse(localStorage.getItem("userinfo")).headimgurl,
          }).then(e=>{
            this.Toast("发表评论成功")
             this.comment_text = "";
                this.initcomment()
          })
        }
        
      }
    },
    //点击回复
    replayUser(item, index, index2) {
      item.index = index;
      item.index2 = index2;
      this.replayUserData = item;
      console.log(this.replayUserData);
      this.commentPlaceholder = `回复 @${
        item.nickName ? item.nickName : item.fromNickname
      }：`;
      this.$refs.content.focus();
      this.name.nickname = "";
      this.name.fromNickname = "";
      item.nickName
        ? (this.name.nickname = item.nickName)
        : (this.name.fromNickname = item.fromNickname);
    },
    initcomment(){
        axios
          .get(`http://106.14.145.57:7788/api/v1/commentList?topicId=${this.videoinfo.videoid}`)
          .then((e) => {
            console.log("评论数据", e.data.data);
            if(e.data.code==200){
            this.videoComment = [];
            this.videoComment = e.data.data;
            this.Toast("获取评论数据成功")
            this.replayUserData=""
            }

          });
    },
    commentLove() {},
  },
};
</script>
<style scoped>
.video {
  object-fit: fill;
}
.clear {
  clear: both;
}

.back_i {
  position: fixed;
  top: 20px;
  left: 10px;
  width: 28px;
  z-index: 10;
}

.video-player {
  height: 100vh;
  width: 100vw;
}

.product_swiper {
  width: 100vw;
  height: 100vh;
}

.van_swipe {
  width: 100vw;
  height: 100vh;
  max-width: 550px;
  margin: 0 auto;
  position: relative;
}

.van-swipe {
  width: 100%;
  height: 100%;
}

.container_box {
  width: 100vw;
  height: 100vh;
  background: #000;
}

.video_box {
  /*object-fit: fill !important;*/
  /*z-index: 999;*/
  width: 100%;
}

video {
  object-position: 0 0;
}

.icon_play {
  position: absolute;
  top: 44%;
  right: 0;
  left: 0;
  bottom: auto;
  margin: auto;
  z-index: 999;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

.play,
.platStart {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
}

/*头像， 点赞，转发 */
.tag_image {
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  box-sizing: border-box;
  border-radius: 50%;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0px 0px 10px #9d9d9d;
}

.tag_add {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  border-radius: 67px;
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin: 0 auto;
  z-index: 1;
  font-size: 20px;
  color: #f44;
  background: #fff;
}

.tag_dui {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  border-radius: 67px;
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 auto;
  z-index: 1;
  font-size: 11px;
  color: #f44;
  background: #fff;
}

.tag_dui_active {
  opacity: 0;
  animation: showFollow 1.4s ease-in-out 0s;
}

.tag_add_num {
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
}

@keyframes showFollow {
  0% {
    opacity: 1;
    color: #fff;
    background: #f44;
    transform: rotate(-180deg) scale(1);
  }
  35% {
    opacity: 1;
    color: #f44;
    background: #fff;
    transform: rotate(0deg) scale(1.2);
  }
  80% {
    opacity: 1;
    color: #f44;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    display: none;
    color: #f44;
    transform: scale(0);
  }
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

.container_bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  height: 48px;
  /*border-top: 1px solid rgba(255, 255, 255, 0.7);*/
  max-width: 550px;
}

.production_top {
  display: inline-block;
  padding: 6px;
  margin-bottom: 5px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  margin-top: 5px;
}

.product_go {
  color: #fbdd21;
}

.production_title {
  margin-left: 4px;
}

.border_progress {
  width: 0;
  height: 1px;
  background: #bababa;
  position: absolute;
  top: 0;
  transition: 0.1s all;
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

.icon-shoucang {
  transition: 0.5s all;
}

.fabulous_active {
  color: #f44;
  animation: showHeart 0.5s ease-in-out 0s;
}

/*animation-name：用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致*/
/*animation-duration ：指定元素播放动画所持续的时间*/
/*animatino-timing-function ： 和transition中的transition-timing-function 中的值一样。根据上面@keframes中分析的animation中可能存在多个小动画，因此这里的值设置是针对每一个小动画所在时间范围内的属性变换速率。*/
/*animation-delay：定义在浏览器开始执行动画之前等待的时间，这里是指整个animation执行之前的等待时间，而不是上面说的多个小动画*/
/*animation-iteration-count：定义动画的播放次数，其通常为整数，默认是1,；取值为infinite，动画将无限次的播放。*/
/*animation-direction：主要用来设置动画播放方向*/
@keyframes showHeart {
  0% {
    color: #f44;
    transform: scale(1);
  }

  25% {
    color: #fff;
    transform: scale(0);
  }

  80% {
    color: #f44;
    transform: scale(1.2);
  }

  100% {
    color: #f44;
    transform: scale(1);
  }
}

/*分享样式*/
.share_hover {
  position: fixed;
  display: none;
}

.share_box {
  position: fixed;
  bottom: -300px;
  width: 100%;
  z-index: 1002;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: 0.5s;
}

.share_tips {
  text-align: center;
  line-height: 38px;
  color: #333;
}

.share_ul {
  box-sizing: border-box;
  padding: 0 25px 25px;
  border-bottom: 1px solid #e8e8e8;
}

.share_li {
  float: left;
  width: 33%;
  text-align: center;
}

.share_li i {
  font-size: 44px;
}

.share_cancel {
  text-align: center;
  line-height: 48px;
  color: #777;
  text-align: center;
}

.pengyouquan {
  color: #47d000;
}

.pengyouquan_li {
  animation: rotating 8s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

.weixin {
  color: #20ca2e;
}

.lianjie {
  color: #cdcdcd;
}

.share_active {
  bottom: 0px;
}

/*评论样式*/
::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.2);
}

:-moz-placeholder {
  color: rgba(0, 0, 0, 0.2);
}

::-moz-placeholder {
  color: rgba(0, 0, 0, 0.2);
}

:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.2);
}

.comment_container {
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.comment_box {
  padding: 0 15px 52px 15px;
}

.comment_top {
  text-align: center;
  font-size: 12px;
  color: #000;
  line-height: 40px;
}

.guanbi3 {
  float: right;
  font-size: 12px;
  padding: 0 10px;
  position: absolute;
  right: 6px;
}

.comment_li {
  margin-bottom: 20px;
  font-size: 14px;
  text-align: left;
}

.comment_author_left {
  float: left;
}

.comment_author_left img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.comment_author_right {
  margin-left: 46px;
  padding-top: 4px;
}

.comment_author_top {
  position: relative;
}

.comment_author_name {
  margin-bottom: 6px;
  color: #777;
}

.icon-shoucang1_box {
  position: absolute;
  right: 0px;
  top: 0;
  text-align: center;
  color: #777;
}

.comment_author_text {
  color: #555;
  margin-bottom: 10px;
  padding-right: 35px;
}

.comment_replay_box {
  padding-left: 46px;
  box-sizing: border-box;
}

.comment_replay_li {
  margin-bottom: 10px;
}

.comment_replay_left {
  float: left;
}

.comment_replay_left img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}

.comment_replay_right {
  margin-left: 35px;
  padding-top: 2px;
}

.comment_replay_top {
  position: relative;
  margin-bottom: 6px;
}

.comment_replay_text {
  padding-right: 35px;
  margin-bottom: 10px;
  color: #555;
}

.comment_author_text span,
.comment_replay_text span {
  color: #999;
  font-size: 13px;
  margin-left: 6px;
}

.shoucang1_num {
  text-align: center;
  width: 30px;
  font-size: 12px;
  /* right: -4px; */
  position: relative;
}

.comment_ul {
  height: 400px;
  overflow-y: auto;
}

.comment_input_box {
  position: fixed;
  bottom: 0;
  z-index: 2999;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  background: #fff;
  padding: 10px 15px;
  box-sizing: border-box;
}

/*.comment_form {*/
/**/
/*}*/

.comment_input {
  border: none;
  resize: none;
  width: 80%;
  float: left;
  color: #555;
  caret-color: #f44;
  /* line-height: 0.44rem; */
}

.comment_input_right {
  float: right;
}

.comment_i {
  font-size: 22px;
  color: #999;
  transition: 0.3s;
}

.comment_i_active {
  color: #f44;
}

.icon-zanwupinglun {
  font-size: 100px;
  color: #777;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

/*添加进场效果*/
.v-move {
  transition: all 1s ease;
}

.v-leave-active {
  position: absolute;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.love_active {
  color: #f44;
}

/*评论样式*/
</style>