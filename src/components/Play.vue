<template>
  <div id="dplayer" style="width: 100%; height: 100%"></div>
</template>
<script>
import DPlayer from "dplayer";
export default {
  props: ["src"],
  name: "Play",
  data() {
    return {
      dp: {},
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
          text: "custom2",
          link: "http://vd3.bdstatic.com/mda-nbqew1m1j30s2i8u/360p/h264_delogo/1645785858356101514/mda-nbqew1m1j30s2i8u.mp4?v_from_s=hkapp-haokan-tucheng",
        },
      ],
    };
  },
  computed: {
    twoNum() {
      return this.src;
    },
  },

  watch: {
    twoNum: {
        immediate:true,
      handler: function (val, oldVal) {
        console.log(val);
        setTimeout(function () {
          this.dp = new DPlayer({
            container: document.getElementById("dplayer"),
            mutex: true,
            loop:true,
            hotkey:false,
            autoplay:true,
            video: {
              url: val,
            },
          });
        }, 500);
      },
      deep: true,
    },
  },
};
</script>

