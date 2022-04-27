<template>
  <div>
    <el-card>
      <div class="top">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content">
        <el-row>
          <el-col :span="12"><LineChart></LineChart></el-col>
          <el-col :span="12"><LineChart></LineChart></el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
        border
          :data="tableData"
          style="width: 100%"
         
        > 
         <!-- :formatter="formatter" -->
          <el-table-column prop="date" label="排名"  width="80" type="index" align="center">
          </el-table-column>
          <el-table-column prop="name" label="搜索关键字" width="180">
          </el-table-column>
          <el-table-column prop="address" label="用户数" sortable>
          </el-table-column>
           <el-table-column prop="address" label="周涨幅" sortable >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        class="pagination"
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import LineChart from "./lineChart";
export default {
  name: "Search",
  data() {
    return {
      tableData:[{}]
    }
  },
  components: { LineChart },
};
</script>

<style scoped>
>>> .top {
  display: flex;
  /* line-height: 40px; */
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
.content {
  margin-top: 1em;
}
.pagination{
  float: right;
}
</style>