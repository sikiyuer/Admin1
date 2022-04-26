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
                type:'category'
          },
          yAxis:{
                show:false
          },
          series:{
                type:'bar',data:[3,6,5,7,4,9,6,4,2],
            color:'pink'
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