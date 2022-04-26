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
                type:'line',data:[3,6,5,7,4,9,6,4,2],
                smooth:true, //设置平滑
            //     隐藏拐点
                  itemStyle:{
                        opacity:0
                  },
                  lineStyle:{
                        color:'purple'
                  },areaStyle:{ // 折线渐变
                        color:{
                              type:'linear',
                              x:0,
                              y:0,
                              x2:0,
                              y2:1,
                              colorStops:[
                                    {
                                          offset:0,
                                          color:'purple' ,//0%的颜色
                                    },
                                    {
                                          offset:1,
                                          color:'white' ,//100%的颜色
                                    },
                              ],
                              global:false,//缺省为false
                        }
                  }
          },
          grid:{
                left:0,
                right:0,
                top:0,
                bottom:0
          }
    })
}
}
</script>

<style scoped>
.line{height:3em;width:100%}
</style>