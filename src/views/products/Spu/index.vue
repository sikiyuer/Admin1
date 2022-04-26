<template>
  <div>
    <!-- 顶部三级导航卡片区域 -->
    <el-card class="marg">
      <CategoryMenu
        :ShowTable="ShowTable && viewNow == 0"
        @getId="getId"
      ></CategoryMenu>
    </el-card>
    <!-- 底部内容展示区域，三个部分，数据展示，数据添加，数据修改S -->
    <el-card>
      <!-- 1数据展示部分 -->
      <div v-if="viewNow == 0">
        <!-- 1.1 添加SPU按钮 -->
        <el-button
          @click="AddSpu"
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <!-- 1.2 数据展示table -->
        <el-table border :data="records" style="width: 100%">
          <!-- 1.2.1 tabled第一列:序号列 -->
          <el-table-column
            type="index"
            align="center"
            prop="prop"
            label="序号"
            width="100px"
          >
          </el-table-column>
          <!-- 1.2.2 tabled第二列:SPU名称 -->
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <!-- 1.2.3 tabled第三列:SPU描述 -->
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <!-- 1.2.4 tabled第三列:SPU相关操作 -->
          <el-table-column prop="prop" label="SPU操作" width="width">
            <template slot-scope="{ row }">
              <HintButton
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="AddSku(row)"
              ></HintButton>
              <HintButton
                @click="UpdateSpu(row)"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
              ></HintButton>
              <HintButton
                type="info"
                icon="el-icon-info"
                size="mini"
                @click="findBySpuId(row)"
                title="查看当前spu全部的sku列表"
              ></HintButton>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  type="danger"
                  slot="reference"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 1.3 展示数据的分页器 -->
        <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 20]"
          :page-size="4"
          layout=" prev, pager, next, jumper,->,total, sizes"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 2 添加和修改spu -->
      <SpuForm
        v-show="viewNow == 1"
        @ChangeViewNow="ChangeViewNow"
        ref="spu"
      ></SpuForm>
      <!-- 3 添加sku部分 -->
      <SkuForm
        v-show="viewNow == 2"
        ref="sku"
        @ChangeVSku="ChangeVSku"
      ></SkuForm>
    </el-card>

    <!-- 点击展示所有sku和spu列表的按钮（第三个） -->
    <el-dialog :title="`${spuName}的sku列表`" :before-close="beforeClose" :visible.sync="showSkuSpuList">
      <el-table :data="spuAndskuList" 
       v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)" border>

        <el-table-column
          header-align="center"
          align="center"
          prop="skuName"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="price"
          label="价格"
        >
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="weight"
          label="重量"
        >
        
        </el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="prop"
          label="默认图片"
        >
        <template slot-scope="{row}">
         <img :src="row.skuDefaultImg" style="width:100px" alt="">
        </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: { SpuForm, SkuForm },
  data() {
    return {
      loading:true,
      showSkuSpuList: false,
      ShowTable: true, // 控制三级联动是否可操作
      category1Id: "", //一级分类id
      category2Id: "", //二级分类id
      category3Id: "", //三级分类id
      page: 1, // 当前展示的页码
      limit: 3, // 当前展示的页展示几条数据
      records: [], // 获取到的spu数据
      total: 0, // 存储返回的数据总数
      viewNow: 0, // 0 代表当前展示数据 1 表示当前展示添加或修改spu 2 表示添加sku属性
      spuAndskuList: [], //获取的sku列表
      spuName: "",
    };
  },
  methods: {
    getId({ categoryId, level }) {
      //三级联动的自定义事件，获取对应一二三级的id
      console.log(categoryId, "33333", level);
      switch (level) {
        case 1:
          this.category1Id = categoryId;
          this.category2Id = "";
          this.category3Id = "";
          break;
        case 2:
          this.category2Id = categoryId;
          this.category3Id = "";
          break;
        case 3:
          this.category3Id = categoryId;
          break;
      }
      if (this.category3Id) this.getSpuList();
    },
    async getSpuList() {
      // 获取spu列表的回调 携带当前页数，每页展示几条，category3Id
      let result = await this.$API.spu.reqSpuPage(
        this.page,
        this.limit,
        this.category3Id
      );
      if (result.code == 200) {
        console.log(result.data);
        this.records = result.data.records;
        this.total = result.data.total;
      } else {
        alert("获取spu信息失败");
      }
      // console.log(result);
    },
    handleCurrentChange(page) {
      // spu列表页码改变的回调
      this.page = page;
      this.getSpuList(this.page, this.limit, this.category3Id);
    },
    handleSizeChange(limit) {
      // 每页展示数据发生变化的回调
      this.limit = limit;
      this.getSpuList(this.page, this.limit, this.category3Id);
    },
    AddSpu() {
      //点击添加spu回调
      this.viewNow = 1; //
      // 点击添加spu通知子组件发请求，获取需要添加的数据，品牌，平台属性等
      this.$refs.spu.spuAddspuData(this.category3Id);
    },
    UpdateSpu(row) {
      // 点击编辑按钮的回调
      this.viewNow = 1;
      this.$refs.spu.initSpuData(row);
    },
    ChangeViewNow({ viewNow, flag }) {
      //子组件spu点击取消的回调
      this.viewNow = viewNow;
      if (flag == "修改") {
        this.getSpuList(this.psge);
      } else {
        this.page = 1;
        this.getSpuList();
      }
      // this.handleCurrentChange(this.page)
    },
    ChangeVSku(now) {
      this.viewNow = now;
    },
    // 点击删除按钮回调
    async deleteSpu(row) {
      //  alert(2)
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      if (result.code == 200) {
        // alert('删除成功')
        this.$message({
          message: "删除成功",
          type: "success",
        });
        // 默认删完停留当前页，如果当前页没有数据则停留上一页
        this.records.length > 1
          ? this.getSpuList(this.psge)
          : this.getSpuList(this.psge - 1);
      }
      console.log(result);
    },
    //********************************************* */
    // 点击右侧添加sku按钮
    AddSku(row) {
      this.viewNow = 2;
      this.$refs.sku.getInitData(this.category1Id, this.category2Id, row); //通知子组件获取初始数据
    },
    async findBySpuId(row) {
     
      // 查看spu和sku列表
      this.showSkuSpuList = true;
      let result = await this.$API.spu.findBySpuId(row.id);
      console.log(row, result);
      if (result.code == 200) {
        this.spuName = row.spuName;
        this.spuAndskuList = result.data;
        this.loading = false
        this.$message({ message: "获取列表成功", type: "success" });
      }
    },
    // 关闭dialog的sku列表的回调
    beforeClose(done){
      done()
      this.loading = true
      this.spuAndskuList = [];
      // 关闭对话框

    }
  },
};
</script>

<style scope>
.marg {
  margin: 20px 0;
}
</style>