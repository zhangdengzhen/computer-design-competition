<template>
    <div>
        <ul v-for="(item,index) in hot" :key="index" style="text-align:left;">
            <li style="margin:0px 5px;line-height:5px;color:#222222;font-size:16px;" class="van-ellipsis">
                <h4 style="display:inline-block;color:#fe2d46;" v-if="index==0" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#ff6600;" v-else-if="index==1" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#FAA901;" v-else-if="index==2" >{{index+1}}</h4>
                <h4 style="display:inline-block;color:#9195a3;" v-else >{{index+1}}</h4>
                {{item}}
                <van-tag type="danger">热</van-tag>
                </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"UserTopic",
    data(){
        return{
            hot:["省市广播电视台被约谈新475万hahahahahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh","Facebook改名为Meta#新433万","排查校外培训机构退费难和跑路问题447万","排查校外培训机构退费难和跑路问题447万 ","排查校外培训机构退费难和跑路问题447万 "],
        }
    },

}
</script>