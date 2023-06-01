<template>
<div class="bar">
         <h5 style="line-height:1.92rem"> 
           <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-zhuzhuangtu"></use>
                </svg>各类条形图
           </h5>
    <div style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);" class="Bar" >
        <canvas id="bar" style="width:100%;height:100%"></canvas>
    </div>
</div>

</template>
<style lang="less" scoped>
   .bar{
       background-color: #ffffffff;
       text-align: center;
       .Bar{
           width: 22.4rem;
           margin: 0 auto;
           height: 19.2rem;
       }
   }
</style>
<script>
import axios from 'axios'
import { Toast } from 'vant';
export default {
   
    data(){
        return{
            char:null,
            data:[],
            time:null,
        }
    },
    mounted(){

    },

   created(){
       this.getdata()
       this.time=setInterval(() => {
            this.getdata()
       }, 60000);

    },
    beforeDestroy(){
        clearInterval(this.time)
    },
    methods:{
         setbar(data){
             // F2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
        //    const data = [
        //     //  { genre: 'Sports', sold: 275 },
        //     //  { genre: 'Strategy', sold: 115 },
        //     //  { genre: 'Action', sold: 120 },
        //     //  { genre: 'Shooter', sold: 350 },
        //     //  { genre: 'Other', sold: 150 }
        //    ];

            // Step 1: 创建 Chart 对象
            this.$nextTick(()=>{
             this.chart = new this.$F2.Chart({
              id: 'bar',
              pixelRatio: window.devicePixelRatio // 指定分辨率
            });
            
            // Step 2: 载入数据源
            this.chart.source(data);
            
            // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
            this.chart.interval()
              .position('genre*sold')
              .color('genre');
            
            // Step 4: 渲染图表
            this.chart.render();
            })
           
         },
        getdata(){
            let this_1=this
            axios.get("http://106.14.145.57:7788/api/v1/statistics").then(function (response) {
            
        // 　　console.log(response.data.data)
            this_1.data=[]
           response.data.data.forEach(element => {
          let datatest = {
                genre:null,
                sold:null,
            }
               datatest.genre=element.classifier
               datatest.sold=parseInt(element.total)
               this_1.data.push(datatest)
           });
      
             this_1.setbar(this_1.data)
                  
        }).catch(function (err) {
        　　console.log(err)
        });
        }
               }
           
           }
</script>