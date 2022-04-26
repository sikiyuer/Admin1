<template>
  <div class="all">
    <el-button type="primary" @click="initEchart" style="margin-bottom: 2em"
      >点击初始化图表</el-button
    >

    <div class="echart" ref="demo"></div>
    <el-button type="primary" @click="initEchart2" style="margin: 2em"
      >点击初始化图表</el-button
    >
    <div class="echart" ref="demo2"></div>
  </div>
</template>

<script>
// import  './echart.js'
import * as echarts from "echarts";
export default {
  name: "echartTest",
  methods: {
    initEchart() {
      //初始化echart图表
      let demo = echarts.init(this.$refs.demo);
      //准备配置项和数据
      demo.setOption({
        title: {
          // 标题
          text: "ECharts可视化",
          //     副标题
          subtext: "入门示例",
          textStyle: {
            color: "blue",
          },
          left: "20",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true,
          },
        },
        series: [
          {
            name: "销量",
            // 图表类型的设置
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
            color: "cyan",
          },
        ],
      });
    },
    initEchart2() {
      //初始化echart图表
      let demo = echarts.init(this.$refs.demo2);
      // 字符集配置
      let data = [
        ["衣服", 12, 20, "x", 30],
        ["鞋子", 14, 18, "y", 32],
        ["游戏", 16, 16, "z", 31],
        ["电影", 19, 14, "m", 30],
      ];
      //准备配置项和数据
      demo.setOption({
        // 设置缩放
        dataZoom: {},
        //设置字符集
        dataset: {
          source: data,
        },
        title: {
          //主标题
          text: "折线图",
          //副标题
          subtext: "实例",
          left: "center",
          textStyle: {
            color: "purple",
          },
          subtextStyle: {
            color: "red",
          },
        },
        xAxis: {
          data: ["衣服", "鞋子", "游戏", "电影"],
          //     type:'category' 均匀分布
        },
        yAxis: {},
      //   yAxis: [{}, {}],

        // 类型和数据
        series: [
          {
            type: "line",
            name: "折线图",
            // data:[10,20,20,30,60,10,40],
            color: "red",
            yAxisIndex:0, // 使用索引为0的yAxis作为y坐标
            encode: {
              y: 2,
            },
          },
          {
            type: "pie",
            name: "饼图",
            // data:[{name:'周一',value:10},{name:'周二',value:40},{name:'周三',value:30},{name:'周四',value:60},{name:'周五',value:10}],
            // color:'cyan'
            width: 250,
            left: 600,
            top: -330,
            radius: 45,
            encode: {
              //配置饼图的name
              itemName: 3,
              value: 4,
            },
          },
          {
            type: "bar",
            name: "柱状图",

            // data:[10,20,20,30,60,10,40],
            color: "purple",
            encode: {
              y: 1,
            },
          },
        ],
        //設置提示组件
        tooltip: {
          // 文字颜色
          textStyle: {
            color: "cyan",
          },
        },
        //展示类型切换组件
        legend: {
          data: ["饼图", "柱状图", "折线图"],
          left: 40,
        },
        //   工具栏组件

        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: {
              readOnly: false,
            },
            magicType: {
              type: ["line", "bar"],
            },
            restore: {},
            saveAsImage: {},
          },
        },
        //整体图标布局
        grid: {
          left: 40,
        },
      });
    },
  },
  mounted() {
    // let script = document.createElement('script')
    // script.type='text/javascript';
    // script.src='https://cdn.bootcdn.net/ajax/libs/echarts/5.3.2/echarts.common.js'
    // document.body.appendChild(script);
    this.initEchart();
    this.initEchart2();
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}
.echart {
  width: 800px;
  height: 500px;
  margin: 0 auto;
  border: 1px solid yellowgreen;
}
</style>