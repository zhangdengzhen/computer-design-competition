<template>
<div class="Pie">
           <h5 style="line-height:1.92rem"> 
           <svg class="icon" aria-hidden="true">
                 <use xlink:href="#icon-bingzhuangtu"></use>
                </svg>各分类占比
           </h5>
    <div  class="Pie">
        <canvas id="pie" style="width:100%;height:100%;"></canvas>
    </div>
</div>

</template>
<style lang="less" scoped>
   .Pie{
     text-align: center;
     background-color: #ffffffff;
     
     .Pie{
       margin: 0 auto;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
       width: 22.4rem;
       height: 19.2rem;
       
     }
   }
</style>
<script>
import axios from 'axios'
export default {
    data(){
        return{
           data:[],
           time:null,
        }
    },

  created(){
       this.getdata()
       this.time=setInterval(() => {
         console.log("柱状图")
            this.getdata()
       }, 60000);
    },
    beforeDestroy(){
        clearInterval(this.time)
    },
    mounted(){
        
    },
    methods:{
        setpie(data){
            // const data = [{
            //   amount: 20,
            //   ratio: 0.1,
            //   memo: '学习',
            //   const: 'const'
            // }, {
            //   amount: 100,
            //   ratio: 0.5,
            //   memo: '睡觉',
            //   const: 'const'
            // }, {
            //   amount: 10,
            //   ratio: 0.05,
            //   memo: '吃饭',
            //   const: 'const'
            // }, {
            //   amount: 30,
            //   ratio: 0.15,
            //   memo: '讲礼貌',
            //   const: 'const'
            // }, {
            //   amount: 10,
            //   ratio: 0.05,
            //   memo: '其他',
            //   const: 'const'
            // }, {
            //   amount: 20,
            //   ratio: 0.1,
            //   memo: '运动',
            //   const: 'const'
            // }, {
            //   amount: 10,
            //   ratio: 0.05,
            //   memo: '暂无备注',
            //   const: 'const'
            // }];
         
             const chart = new this.$F2.Chart({
               id: 'pie',
               pixelRatio: window.devicePixelRatio
             });
             
             chart.source(data);
             chart.coord('polar', {
               transposed: true,
               innerRadius: 0.4,
               radius: 0.75
             });
             chart.axis(false);
             chart.legend({
               position: 'bottom',
               align: 'center'
             });
             chart.tooltip(false);
             chart.guide()
               .html({
                 position: [ '50%', '50%' ],
                 html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>'
               });
             // 配置文本饼图
             chart.pieLabel({
               sidePadding: 75,
               label1: function label1(data) {
                 return {
                   text: data.memo,
                   fill: '#808080'
                 };
               },
               label2: function label2(data) {
                 return {
                   fill: '#000000',
                  //  text: '$' + data.amount.toFixed(2),
                  text:  data.amount.toFixed(2),
                   fontWeight: 500,
                   fontSize: 10
                 };
               }
             });
             chart.interval()
               .position('const*ratio')
               .color('memo', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273' ])
               .adjust('stack');
             chart.render();
             
             // 绘制内阴影
             const frontPlot = chart.get('frontPlot');
             const coord = chart.get('coord'); // 获取坐标系对象
             frontPlot.addShape('sector', {
               attrs: {
                 x: coord.center.x,
                 y: coord.center.y,
                 r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
                 r0: coord.circleRadius * coord.innerRadius,
                 fill: '#000',
                 opacity: 0.15
               }
             });
             chart.get('canvas').draw();

        },
       getdata(){
            let this_1=this
            axios.get("http://106.14.145.57:7788/api/v1/statistics").then(function (response) {
            
        // 　　console.log(response.data.data)
            this_1.data=[]
           response.data.data.forEach(element => {
          let datatest = {
                
              amount: null,
              ratio: null,
              memo: null,
              const: 'const'
          
            }
               datatest.amount=parseInt(element.total)
               datatest.ratio=parseInt(element.percent.slice(0,-1))/100
               datatest.memo=element.classifier
               
               this_1.data.push(datatest)
           });
           console.log(this_1.data)
             this_1.setpie(this_1.data)
                  
        }).catch(function (err) {
        　　console.log(err)
        });
        }
    }
}
</script>