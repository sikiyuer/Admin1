<template>
  <div>
    <el-card>
   <div class="header">
      <span>销售额类型占比</span>
         <el-radio-group v-model="radio1">
      <el-radio-button label="全部门店"></el-radio-button>
      <el-radio-button label="线上"></el-radio-button>
      <el-radio-button label="线下"></el-radio-button>
    </el-radio-group>
    </div>
    <div class="echart" ref='pie'></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
      name:'Category',data() {
        return {
          radio1:'全部门店'
        }
      },
  mounted() {
    let lineChart = echarts.init(this.$refs.pie);
    lineChart.setOption( {
      title:{
text:'333'
,subtext:'111',left:'center',top:'center'      },
  tooltip: {
    trigger: 'item'
  },

  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside'
      },
      // emphasis: { 放大效果
      //   label: {
      //     show: true,
      //     fontSize: '40',
      //     fontWeight: 'bold'
      //   }
      // },
      labelLine: {
        show: true
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ],
  
})
lineChart.on('mouseover',(params)=>{
  const {name,value} = params

  lineChart.setOption({
    title:{
      text:name,
      subtext:value
    }
  })
  })
     },

}
</script>

<style scoped>
>>>.el-card__body{
  padding: 10px;

}
.header {

  display: flex;
  align-items: center;
  justify-content: space-between;

}
.echart{
  border-top: 1px solid #ccc;
  width:100%;
  height:250px

}

</style>