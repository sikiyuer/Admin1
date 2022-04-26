<template>
  <div>
        
    <!-- 顶部card -->
  <!-- <LineEcharts></LineEcharts> -->
                    <!-- <BarEcharts></BarEcharts> -->

    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card>
          <Detail title="总销售额" number='￥332563'>
                <template slot="echarts">
                     <span>周同比&nbsp;&nbsp;89.37% 
                           <svg t="1650883911102" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14218" width="16" height="16"><path d="M512 225.28c22.528 0 41.984 12.288 53.248 29.696l0 0 266.24 449.536c0 0 0 0 0 0l0 0 0 0c5.12 9.216 8.192 19.456 8.192 31.744 0 33.792-27.648 61.44-61.44 61.44l0 0L245.76 797.696l0 0c-33.792 0-61.44-27.648-61.44-61.44 0-11.264 3.072-22.528 8.192-31.744l0 0 0 0c0 0 0 0 0 0l266.24-449.536 0 0C470.016 237.568 489.472 225.28 512 225.28z" fill="#d81e06" p-id="14219"></path></svg>
                    </span>
                     <span>日同比&nbsp;&nbsp; 13.96
                           <svg t="1650883963718" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14556" width="16" height="16"><path d="M512 798.72c-22.528 0-41.984-12.288-53.248-29.696v0l-266.24-449.536c0 0 0 0 0 0v0 0c-5.12-9.216-8.192-19.456-8.192-31.744 0-33.793 27.648-61.441 61.44-61.44v0h532.48c33.793 0 61.441 27.648 61.44 61.44 0 11.264-3.072 22.528-8.192 31.744v0 0c0 0 0 0 0 0l-266.24 449.536c-11.264 17.408-30.72 29.696-53.248 29.696z" fill="#1afa29" p-id="14557"></path></svg>
                     </span>
                </template>
                 <template slot="bott">
                   <span>
                         日销售额￥ 12222
                   </span>
                </template>
          </Detail>
      </el-card
      ></el-col>
       <el-col :span="6"
        ><el-card>
          <Detail  title="访问量" number='24666'>
                 <template slot="echarts">
                   <LineEcharts></LineEcharts>
                </template>

                 <template slot="bott">
                   <span>
                         日访问量 12222
                   </span>
                </template>

          </Detail>
      </el-card
      ></el-col>
       <el-col :span="6"
        ><el-card>
          <Detail  title="支付总数" number='588'>
                <template slot="echarts">
                    <BarEcharts></BarEcharts>
                </template>
                 <template slot="bott">
                   <span>
                         转化率 80%
                   </span>
                </template>
          </Detail>
      </el-card
      ></el-col>
       <el-col :span="6"
        ><el-card>
          <Detail  title="活动效果" number='24666'>
                <template slot="echarts">
                   <Progress></Progress>
                </template>
                 <template slot="bott">
                  <span>周同比&nbsp;&nbsp;89.37% 
                           <svg t="1650883911102" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14218" width="16" height="16"><path d="M512 225.28c22.528 0 41.984 12.288 53.248 29.696l0 0 266.24 449.536c0 0 0 0 0 0l0 0 0 0c5.12 9.216 8.192 19.456 8.192 31.744 0 33.792-27.648 61.44-61.44 61.44l0 0L245.76 797.696l0 0c-33.792 0-61.44-27.648-61.44-61.44 0-11.264 3.072-22.528 8.192-31.744l0 0 0 0c0 0 0 0 0 0l266.24-449.536 0 0C470.016 237.568 489.472 225.28 512 225.28z" fill="#d81e06" p-id="14219"></path></svg>
                    </span>
                     <span>日同比&nbsp;&nbsp; 13.96
                           <svg t="1650883963718" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14556" width="16" height="16"><path d="M512 798.72c-22.528 0-41.984-12.288-53.248-29.696v0l-266.24-449.536c0 0 0 0 0 0v0 0c-5.12-9.216-8.192-19.456-8.192-31.744 0-33.793 27.648-61.441 61.44-61.44v0h532.48c33.793 0 61.441 27.648 61.44 61.44 0 11.264-3.072 22.528-8.192 31.744v0 0c0 0 0 0 0 0l-266.24 449.536c-11.264 17.408-30.72 29.696-53.248 29.696z" fill="#1afa29" p-id="14557"></path></svg>
                     </span>
                </template>
          </Detail>
      </el-card
      ></el-col>
      
    </el-row>
  </div>
</template>

<script>
import Detail from "./Details";
import LineEcharts from "./lineEchart";
import BarEcharts from "./barEchart";
import Progress from "./progressEchart";
export default {
  name: "Cards",
  components: { Detail,LineEcharts,BarEcharts,Progress},
};
</script>

<style>
</style>