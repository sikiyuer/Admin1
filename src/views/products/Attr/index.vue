<template>
  <div style="margin: 20px 0">
    <CategoryMenu :ShowTable='ShowTable' @getId="getId"></CategoryMenu>
    <div v-show="ShowTable">
      <el-button
        type="primary"
        :disabled="!category3Id"
        icon="el-icon-plus"
        @click="AddAttr1"
        >添加属性</el-button
      >
      <el-table :data="list" style="width: 100%" border>
        <el-table-column type="index" prop="prop" label="序号" width="80px">
        </el-table-column>
        <el-table-column prop="attrName" labe label="属性名" width="150px">
        </el-table-column>
        <el-table-column prop="prop" label="属性值列表" width="width">
          <template slot-scope="{ row }">
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
          <template slot-scope="{ row }">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="updateAttr(row)"
            ></el-button>
            <el-button
            @click="reqDelAttr(row)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加属性部分 -->
    <div v-show="!ShowTable">
      <!-- <el-dialog title="添加属性" :visible.sync="dialogFormVisible">
  <el-form :model="temp">
    <el-form-item label="请输入添加的属性名" width="300px">
      <el-input v-model="temp.valueName" autocomplete="off"></el-input>
    </el-form-item>
   
  </el-form>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="AddAttr">确 定</el-button>
  </div>
</el-dialog> -->

      <el-form
        :inline="true"
        label="属性名"
        ref="form"
        :model="attrInfos"
        label-width="80px"
      >
        <el-input
          placeholder="请输入属性"
          style="width: 300px"
          v-model="attrInfos.attrName"
        ></el-input>
      </el-form>
      <el-button
        @click="AddAttr"
        type="primary"
        :disabled="isEmpty"
        icon="el-icon-plus"
        style="margin: 20px 0 0"
        >添加属性值</el-button
      >
      <el-button @click="ShowTable = true">取消</el-button>

      <el-table
        border
        style="width: 100%; margin: 20px 0"
        :data="attrInfos.attrValueList"
      >
        <!-- 添加属性的序号 -->
        <el-table-column
          prop="prop"
          type="index"
          align="center"
          label="序号"
          width="100px"
        ></el-table-column>
        <!-- 属性的名称列 -->
        <el-table-column prop="prop" label="属性值名称" width="width">
          <template slot-scope="{ row, $index }">
            <el-input
              v-model="row.valueName"
              placeholder="请输入属性值名称"
              :ref="$index"
              v-if="row.flag"
              @blur="toLook(row)"
            >
              {{ row.valueName }}
            </el-input>
            <span v-else @click="toEdit(row, $index)" style="display: block">{{
              row.valueName
            }}</span>
          </template>
        </el-table-column>
        <!-- 对属性的操作 -->
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{ row, $index }">
            <!-- 删除弹出框 -->

            <el-popconfirm
              :title="`确定删除${row.valueName}吗？`"
              @onConfirm="deleteAttrValue($index)"
            >
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="primary" :disabled="isEmpty" @click="reqAddOrUpdateAttr">保存</el-button>
      <el-button @click="ShowTable = true">取消</el-button>
    </div>
  </div>
</template>

<script>
// import { nanoid } from "nanoid";
// 引入lodash的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      ShowTable: true, // 控制列表 和添加修改的显示隐藏
      dialogFormVisible: false, //控制添加属性值的对话框显示隐藏
      list: [], //存储数据
      category1Id: "", //一级分类id
      category2Id: "", //二级分类id
      category3Id: "", //三级分类id
      attrInfos: {
        //新增属性和修改属性的属性名
        attrName: "", //属性名
        attrValueList: [],
        categoryId: 0, // 三级分类id
        categoryLevel: 0, //用于给服务器区分传过去的是几级id
      },
    };
  },
  computed: {
    isEmpty(){
      
      return this.attrInfos.attrName&&this.attrInfos.attrValueList.some(list=>{
          return list.valueName.trim() == ''
      })
    } 
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
    AddAttr1() {
      // 点击添加属性的回调，进入添加属性的页面
      this.ShowTable = false;
      this.attrInfos.attrValueList = []; // 清空添加的属性
      this.attrInfos.attrName = "";
      this.attrInfos.categoryId = ""; // 清空获取的三级id
      this.attrInfos.categoryLevel = "";
    },
    AddAttr() {
      // 点击添加属性值的回调，push一个新的对象到属性里面
      this.attrInfos.attrValueList.push({
        // 将添加的属性push到数组里
        attrId: undefined, //属性名的id 新增不需要id
        valueName: "",
        flag: true,
      });
      this.attrInfos.categoryId = this.category3Id; // 获取三级id
      this.attrInfos.categoryLevel = 3; // 告诉服务器是三级的id

      this.$nextTick(() => {
        this.$refs[this.attrInfos.attrValueList.length - 1].focus();
      });
    },
    DelAttr(row) {
      //新添加属性的删除按钮回调
      // console.log(row);
      this.attrInfos.attrValueList.forEach((list, index) => {
        if (list.attrId == row.attrId) {
          this.attrInfos.attrValueList.splice(index, 1);
        }
      });
    },
    updateAttr(row) {
      this.ShowTable = false;
      this.flag = true;
      // this.attrInfos = {...row} // 浅拷贝不好使
      this.attrInfos = cloneDeep(row); // 使用深拷贝展示
      // 给获取到的属性添加flag实现查看视图和编辑视图的切换
      this.attrInfos.attrValueList.forEach((list) => {
        //  list.flag = false 直接添加不好使，因为不是响应式的添加
        this.$set(list, "flag", false); // 添加为vue响应式的数据
      });
    },
    toLook(row) {
      // 新增属性输入框失去焦点的回调
      // 如果属性为空
      if (row.valueName.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }
      // 如果输入的属性重复了
      let isRepeat = this.attrInfos.attrValueList.some((list) => {
        if (row != list) {
          // 当row是新的数据时（跟之前的所有list都不一样）、row是最新的,数组最后一个元素s
          return row.valueName == list.valueName; // 返回新的属性名是否和旧的重复
        }
      });
      if (isRepeat) {
        this.$message("当前属性已经存在");
        return;
      }

      row.flag = false;
    },
    toEdit(row, index) {
      // 点击span的回调，变为编辑模式
      row.flag = true;
      this.$nextTick(() => {
        // console.log(index);
        this.$refs[index].focus();
      });
    },
    deleteAttrValue(index) {
      this.attrInfos.attrValueList.splice(index, 1);
      // alert(111);
    },
    async reqAddOrUpdateAttr() {
      // 提交添加或修改，参数不能为空，不能有flag属性
      this.attrInfos.attrValueList = this.attrInfos.attrValueList.filter(
        (list) => {
          // 过滤掉为空的 并将不为空的删除flag属性
          if (list.valueName != "") {
            delete list.flag;
            return true;
          }
        }
      );
      // 发送请求
      try {
        let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfos);
        // console.log("修改或添加成功",result);
        this.ShowTable = true;
        this.$message({
          type:'success',
          message: "保存成功",
        });
        this.getAttrList(); // 再次获取数据
      } catch (error) {
        this.$message({
          message: "保存失败",
          type: "faild",
        });
        // console.log(error.message);
      }
    },
    async reqDelAttr(row){
      console.log(row);
      let result = await this.$API.attr.reqDelAttr(row.id)
      if (result.code == 200) {
        this.$message('删除成功')
        this.getAttrList()
      }
    }
  },
};
</script>

<style>
</style>