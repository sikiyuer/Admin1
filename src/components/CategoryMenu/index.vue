<template>
  <div>
    <el-form :inline="true" :model="listInfos" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="listInfos.yijiId"
          placeholder="请选择"
          @change="handler1"
        >
          <el-option
            v-for="yiji in list1"
            :key="yiji.id"
            :label="yiji.name"
            :value="yiji.id"
          ></el-option>
        </el-select>
      </el-form-item>

       <el-form-item label="二级分类">
        <el-select
          v-model="listInfos.erjiId"
          placeholder="请选择"
          @change="handler2"
        >
          <el-option
            v-for="erji in list2"
            :key="erji.id"
            :label="erji.name"
            :value="erji.id"
          ></el-option>
        </el-select>
      </el-form-item>

       <el-form-item label="三级分类">
        <el-select
          v-model="listInfos.sanjiId"
          placeholder="请选择"
          @change="handler3"
        >
          <el-option
            v-for="sanji in list3"
            :key="sanji.id"
            :label="sanji.name"
            :value="sanji.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryMenu",
  data() {
    return {
      list1: [], //一级分类数据
      list2: [], //二级分类数据
      list3: [], //三级分类数据
      listAll:[], // 展示三级选择之后的数据
      listInfos: {
        // 表单收集的信息
        yijiId: "",
        erjiId: "",
        sanjiId: "",
      },
    };
  },
  mounted() {
    this.getYiji();
  },
  methods: {
        
    async getYiji() {
      let result = await this.$API.attr.reqCateFirst();
      if (result.code == 200) {
        this.list1 = result.data;
        // console.log("获取一级导航",result);
      }
    },
    async handler1() {
      // 一级分类数据改变的回调 获取对应的二级数据
      const {yijiId} = this.listInfos
      this.$emit('getId',{categoryId:yijiId,level:1}) // 将id的对象传给父组件
      this.list2=[]
      this.list3=[]
      this.listInfos.erjiId= ''
      this.listInfos.sanjiId = ''
      let result = await this.$API.attr.reqCateSecond(yijiId);
      if (result.code == 200) {
        this.list2 = result.data;
        console.log("获取二级导航", result);
      }
    },
    async handler2() {
      let {erjiId} = this.listInfos
      this.$emit('getId',{categoryId:erjiId,level:2}) // 将id的对象传给父组件

      this.list3=[]
      this.listInfos.sanjiId = ''
      // 二级分类数据改变的回调 获取对应的三级数据
      let result = await this.$API.attr.reqCateThree(erjiId);
      if (result.code == 200) {
        this.list3 = result.data;
        console.log("获取三级导航", result);
      }
    },
     async handler3() {
      let {sanjiId} = this.listInfos

      this.$emit('getId',{categoryId:sanjiId,level:3}) // 将id的对象传给父组件

    },
  },
};
</script>

<style>
</style>