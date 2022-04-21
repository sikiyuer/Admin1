<template>
  <div style="margin: 20px 0">
    <CategoryMenu @getId="getId"></CategoryMenu>
    <div v-show="ShowTable">
      <el-button
        type="primary"
        :disabled="!category3Id"
        icon="el-icon-plus"
        @click="ShowTable = false"
        >添加属性</el-button
      >
      <el-table :data="list" style="width: 100%" border>
        <el-table-column type="index" prop="prop" label="序号" width="80px">
        </el-table-column>
        <el-table-column prop="attrName" labe label="属性名" width="150px">
        </el-table-column>
        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{ row, $index }">
            <!-- {{row}} -->
            <el-tag
              type="success"
              v-for="list in row.attrValueList"
              :key="list.id"
              >{{ list.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150px">
          <template slot-scope="{ row, $index }">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="ShowTable = false"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="!ShowTable">
      <el-form :inline="true" label="属性名" ref="form" label-width="80px">
        <el-input placeholder="请输入属性" style="width: 300px"></el-input>
      </el-form>
      <el-button type="primary" icon="el-icon-plus" style="margin:20px 0 0">添加属性值</el-button>
      <el-button @click="ShowTable=true">取消</el-button>
  <el-table
    border
    style="width: 100%;margin:20px 0">
    <el-table-column
      prop="prop"
      type="index"
      label="序号"
      width="100px">
    </el-table-column>
    <el-table-column
      prop="prop"
      label="属性值名称"
      width="width">
    </el-table-column>
    <el-table-column
      prop="prop"
      label="操作"
      width="width">
    </el-table-column>
  </el-table>
  
<el-button type="primary">保存</el-button>
<el-button @click="ShowTable=true">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      ShowTable: false, // 控制显示隐藏
      list: [], //存储数据
      category1Id: "", //一级分类id
      category2Id: "", //二级分类id
      category3Id: "", //三级分类id
    };
  },
  methods: {
    getId({ categoryId, level }) {
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
      if (this.category3Id) this.getAttrList();
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrsInfo(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.list = result.data;
        console.log("获取数据", result);
      }
    },
  },
};
</script>

<style>
</style>