<template>
  <div ref="line" class="line"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
name:'',
mounted(){
    let lineChart = echarts.init(this.$refs.line);
    lineChart.setOption({
          xAxis:{
                show:false,
                  // 设置最小值和最大值
                  min:0,max:100
          },
          yAxis:{
                show:false,
                //设置在Y轴均分
                 type:'category'
          },
          series:{
                type:'bar',data:[78],
            color:'purple',
            //设置宽度
            barWidth:10,
            //设置背景颜色
            showBackground:true,
            backgroundStyle:{
                  color:'#eee'
            },
            //设置文本
            label:{
                  show:true,
                  formatter:"|",
                  position:"right"
            }
          },
          grid:{
                left:0,
                right:0,
                top:0,
                bottom:0
          },tooltip:{}
    })
}
}
</script>

<style scoped>
.line{height:3em;width:100%}
</style>