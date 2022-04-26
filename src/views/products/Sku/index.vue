<template>
  <div>
    <el-table :data="records" style="width: 100%" border>
      <el-table-column type="index" align="center" label="序号" width="80px">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column label="默认图片" width="140px">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" style="max-width: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量（kg）" width="110px">
      </el-table-column>
      <el-table-column prop="price" label="价格（元）" width="110px">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="info"
            v-if="row.isSale == 1"
            title="下架该sku"
            @click="reqCancelSale(row)"
            size="mini"
            icon="el-icon-download"
          ></el-button>
          <el-button
            type="success"
            v-else
            size="mini"
            title="上架该sku"
            @click="reqOnSale(row)"
            icon="el-icon-upload2"
          ></el-button>

          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editInfo"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            @click="reqGetSkuDetail(row)"
            icon="el-icon-info"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
       -->
    <el-pagination
      style="text-align: center; margin-top: 30px"
      :current-page="page"
      @current-change="reqGetSkuList"
      :page-sizes="[3, 5, 10]"
      @size-change="handleSizeChange"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer :show-close="false" size="50%" :visible.sync="show">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuDetail.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuDetail.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuDetail.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="tag in skuDetail.skuAttrValueList"
            :key="tag.id"
            style="margin-right: 10px"
            >{{ tag.attrId }}--{{ tag.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuDetail.skuImageList" :key="item.id">
             <img :src="item.imgUrl" alt=""></el-carousel-item>
          </el-carousel>
          </el-col> </el-row
      ><el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuDetail.price }}</el-col> </el-row
      ><el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuDetail.price }}</el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  methods: {
    async reqGetSkuList(page = 1) {
      this.page = page;
      let result = await this.$API.sku.reqGetSkuList(this.page, this.limit);
      if (result.code ==200) {
        this.total = result.data.total;
        this.records = result.data.records;
        this.$message({
          message: "获取sku列表成功",
          type: "success",
        });
      } else {
        this.$message({
          message: "获取sku列表失败" + result.data,
          type: "fail",
        });
      }
      console.log(result);
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.reqGetSkuList();
    },
    // 上架
    async reqOnSale(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code == 200) {
        this.$message({
          message: "上架成功",
          type: "success",
        });
        row.isSale = 1;
        // this.reqGetSkuList(this.page);
      } else {
        this.$message({
          message: "上架失败" + result.data,
          type: "fail",
        });
      }
      console.log(result);
    },
    // 下架
    async reqCancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        this.$message({
          message: "下架成功",
          type: "success",
        });
        // this.reqGetSkuList(this.page);
        row.isSale = 0;
      } else {
        this.$message({
          message: "下架失败" + result.data,
          type: "fail",
        });
      }
      console.log(result);
    },
    editInfo() {
      // 编辑
      this.$message("没给接口，不写了");
    },
    async reqGetSkuDetail(row) {
      // //详情
      this.show = true;
      let result = await this.$API.sku.reqGetSkuDetail(row.id);
      if (result.code == 200) {
        this.$message({ message: "获取详情成功", type: "success" });
        this.skuDetail = result.data;
      }
    },
  },
  mounted() {
    this.reqGetSkuList();
  },
  data() {
    return {
      skuDetail: {},
      page: 1,
      limit: 4,
      records: [{ price: 11 }],
      total: 0,
      show: false,
    };
  },
};
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
   
</style>
<style scoped >
.el-row .el-col-5 {
  font-size: 18px;
  font-weight: bold;
  padding-right: 1em;
  text-align: right;
}
.el-col {
  margin: 10px 0;
}
>>>.el-carousel__item>img{
  width:100%;
  height:100%;
  object-fit: cover;
  object-position: center;
}
>>>.el-carousel__container{
  height:300px!important
}
>>>.el-carousel__button{
     width:10px;
     height: 10px;
     background: skyblue;
     border-radius: 50%;
   }
</style>