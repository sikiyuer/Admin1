<template>
  <el-card class="box-card">
    <!-- 顶部 -->
    <div slot="header" class="clearfix">
      <!--  @tab-click="handleClick" -->
      <!-- 头部左侧 -->
      <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
        <el-tab-pane label="访问量" name="visit"> </el-tab-pane>
      </el-tabs>
      <!-- 头部右侧 -->
      <div class="right">
        <span @click="setDay"> 本日</span><span @click="setWeek"> 本周</span><span @click="setMon"> 本月</span>

        <div class="block">
          <!-- v-model="value2" -->

          <el-date-picker
            class="date"
            size="mini"
            v-model="date"
            value-format="yyyy-mm-dd"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="echart" ref="saleEchart"></div>
        </el-col>
        <el-col :span="6">
          <h4 style="margin: 0">今日{{title}}排行</h4>
          <ul>
            <li><span>1</span><span>肯德基</span><span>33333</span></li>
            <li><span>2</span><span>肯德基</span><span>33333</span></li>
            <li><span>3</span><span>肯德基</span><span>33333</span></li>
            <li><span>4</span><span>肯德基</span><span>33333</span></li>
            <li><span>5</span><span>肯德基</span><span>33333</span></li>
            <li><span>6</span><span>肯德基</span><span>33333</span></li>
            <li><span>7</span><span>肯德基</span><span>33333</span></li>

          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echart from "echarts";
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
  name: "",
  mounted() {

    this.echart = echart.init(this.$refs.saleEchart);
    this.echart.setOption({
      title: {
        text: this.title+"趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          color: "purple",
          data: [],
        },
      ],
    });
  // this.handleClick()
  },
  data() {
    return {
      activeName: "sale",
      echart:null,
      date:[]
    };
  },
  methods: {
        setDay(){
              let day = dayjs().format('YYYY-MM-DD')
              this.date = [day,day]
        },
        setWeek(){ // 获取周一
              let start = dayjs().day(1).format('YYYY-MM-DD')
              let end = dayjs().day(7).format('YYYY-MM-DD')
              this.date = [start,end]
        },
        setMon(){
              let start = dayjs().startOf('month').format('YYYY-MM-DD')
              let end = dayjs().endOf('month').format('YYYY-MM-DD')
              this.date = [start,end]

        },
         setYear(){
              let start = dayjs().startOf('month').format('YYYY-MM-DD')
              let end = dayjs().endOf('year').format('YYYY-MM-DD')
              this.date = [start,end]

        },
        handleClick(){
          console.log(this.list.orderFullYearAxis);
             this.echart.setOption({
      title: {
        text: this.title+"趋势",
      },
      xAxis:{
        data:this.title=='销售额'?this.list.orderFullYearAxis:this.list.userFullYearAxis
      },
      series:[
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          color: "purple",
          data:this.title=="销售额"?this.list.orderFullYear:this.list.userFullYear
        },
      ],

        })}
  },
  computed: {
        title(){
              return this.activeName=='sale'?'销售额':'访问量'
        },
        ...mapState({
          
          list:state=>state.home.list
        })
  },
  watch: {
    list(){ // 获取到数据立刻调用数据覆盖
      this.handleClick()
    }
  },

};
</script>

<style scoped>
ul {
  margin-top: 2em;
  padding-left: 0;
}
ul > li {
  margin: 10px 0;
  list-style: none;
  line-height: 40px;
  display: flex;
  /* justify-content: center; */
  padding-left: 2em;
  align-items: center;
}
ul span {
  margin-left: 1em;
}
ul > li:nth-child(n + 1):nth-child(-n + 3) > span:first-child {
  background: #000;
  color: #fff;
  border: 1px solid;
}
ul > li > span:first-child {
  width: 20px;
  border-radius: 50%;
  line-height: 18px;

  text-align: center;
  margin-left: 0;
  /* color:#fff; */
  /* background: #000; */
}
ul > li > span:last-child {
  margin-left: 40%;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.right {
  position: absolute;
  right: 2em;
  display: flex;
  align-items: center;
}
.right > span {
  margin: 0 12px;
  font-size: 14px;
}
.date {
  width: 220px;
  margin: 0 20px;
}
.echart {
  width: 100%;
  height: 400px;
}
</style>
