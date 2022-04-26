<template>
  <div>
    <h3>{{ unSelectSale }} ------</h3>
    <el-form ref="form" :model="spuInfos" label-width="80px">
      <!--1 SPU名称 -->
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuInfos.spuName"
          placeholder="请输入spu名称"
        ></el-input>
      </el-form-item>
      <!--2 品牌选择框 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuInfos.tmId">
          <el-option
            v-for="mark in marks"
            :key="mark.id"
            :label="mark.tmName"
            :value="mark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!--3 SPU描述 -->
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuInfos.description"
          type="textarea"
          placeholder="请输入spu描述"
          rows="4"
        ></el-input>
      </el-form-item>
      <!--4 SPU图片 -->
      <el-form-item label="SPU图片">
        <!--4.1 照片墙 -->

        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="icons"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="upLoadSuccess"
        >
          <!--4.2 提示信息 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!--5 销售属性 -->
      <el-form-item label="销售属性">
        <!--5.1 销售属性选择框 收集选择的id和属性 -->
        <el-select
          :placeholder="`请再选择${unSelectSale.length}个`"
          :disabled="!unSelectSale"
          v-model="attrIds"
        >
          <el-option
            v-for="list in unSelectSale"
            :key="list.id"
            :label="list.name"
            :value="`${list.id}:${list.name} `"
          ></el-option>
        </el-select>
        <!--5.2 销售属性按钮 -->
        <el-button type="primary" :disabled="!attrIds" @click="aaddNewSale"
          >添加销售属性</el-button
        >

        <!--5.3 销售属性展示的table -->
        <el-table style="width: 100%" border :data="spuInfos.spuSaleAttrList">
          <!-- #第一列 -->
          <el-table-column
            align="center"
            type="index"
            prop="prop"
            label="序号"
            width="50px"
          >
          </el-table-column>
          <!-- #第二列 -->
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="100px"
          ></el-table-column>
          <!-- #第三列 -->
          <el-table-column prop="prop" label="属性值的列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <!-- #第四列 -->
          <el-table-column prop="saleAttrName" label="操作" width="100px">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="spuInfos.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 6 保存取消按钮 -->
      <el-form-item label="label">
        <el-button type="primary" @click="cancelSave"
          >取消</el-button
        >
        <el-button type="primary" @click="AddOrUpdateSpu">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      attrIds: "", // 收集未选择的属性
      // inputVisible: false, 不能直接写在这里，要每个销售属性有单独的添加
      // inputValue: '',
      dialogImageUrl: "",
      dialogVisible: false,
      // 收集的spu信息
      spuInfos: {
        category3Id: 0, // 三级分类id
        tmId: "", //平台id
        spuName: "", // spu名称
        description: "", // 描述
        spuImageList: [
          // spu图片列表
          // {
          //   // imgName: "string",
          //   // imgUrl: "string",
          //   // spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          // 平台属性和属性值
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       // baseSaleAttrId: 0,
          //       // id: 0,
          //       // isChecked: "",
          //       // saleAttrName: "",
          //       // saleAttrValueName: "",
          //       // spuId: 0,
          //     },
          //   ],
          // },
        ],
      }, // spu数据
      marks: [], // 品牌数据
      icons: [], // 图标数据
      saleAttrs: [], // 平台销售数据
    };
  },
  methods: {
  async  spuAddspuData(tmId) {  // 父组件点击添加spu触发回调
      // 获取品牌信息
      this.spuInfos.category3Id = tmId
      let result2 = await this.$API.spu.reqGetSpuMark();
      if (result2.code == 200) {
        this.marks = result2.data;
      }
      // 获取平台销售属性
      let result4 = await this.$API.spu.reqGetSpuSaleArr();
      if (result4.code == 200) {
        this.saleAttrs = result4.data;
      }
    },
    async initSpuData(row) {
      // 初始化spuForm的数据 ,父组件调用，传来修改的那个属性数据
      // 获取spu信息
      let result = await this.$API.spu.reqGetSpuById(row.id);
      if (result.code == 200) {
        this.spuInfos = result.data;
      }
      // 获取品牌信息
      let result2 = await this.$API.spu.reqGetSpuMark();
      if (result2.code == 200) {
        this.marks = result2.data;
      }
      // 获取图标信息
      let result3 = await this.$API.spu.reqGetSpuIcon(row.id);
      if (result3.code == 200) {
        let arrs = result3.data; // 照片墙需要图片对象有name和url属性才能显示
        arrs.forEach((list) => {
          list.name = list.imgName;
          list.url = list.imgUrl;
        });
        this.icons = arrs; // 照片墙需要图片对象有name和url属性才能显示
      }
      // 获取平台销售属性
      let result4 = await this.$API.spu.reqGetSpuSaleArr();
      if (result4.code == 200) {
        this.saleAttrs = result4.data;
      }
    },
    get() {
      // 保存新增或更改
    },
    // 图片上传相关回调
    upLoadSuccess(response, file, fileList) {
      // 图片上传的回调
      this.icons = fileList;
    },
    handleRemove(file, fileList) {
      // 参数为删除的那个图片 和 剩下的图片
      // 收集照片墙图片数据
      this.icons = fileList;
      // 把不需要的name和url字段去除
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      // file.url是图片路径
      this.dialogImageUrl = file.url;
      // 对话框显示
      this.dialogVisible = true;
    },
    // 属性tag相关回调

    showInput(row) {
      console.log(row);
      // row.inputVisible =true
      this.$set(row, "inputVisible", 1);
      this.$set(row, "inputValue", "");
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(row) {
      // 点击添加tag的回调
      if (row.inputValue.trim() == "") {
        this.$message("输入不能为空");
        row.inputVisible = false;
      } else {
        const { baseSaleAttrId, inputValue } = row;
        // 输入值不能重复
        if (
          !row.spuSaleAttrValueList.every(
            (list) => list.saleAttrValueName != inputValue
          )
        ) {
          this.$message("输入不能重复！");
        } else {
          let newSaleValue = { baseSaleAttrId, saleAttrValueName: inputValue };
          row.spuSaleAttrValueList.push(newSaleValue);
          row.inputVisible = false;
          row.inputValue = "";
        }
      }
    },
    // 添加属性的下拉框右边添加按钮回调
    aaddNewSale() {
      // 将收集到的id和属性名添加到spuInfos里面
      const [baseSaleAttrId, saleAttrName] = this.attrIds.split(":");
      let newSale = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spuInfos.spuSaleAttrList.push(newSale);
      this.attrIds = "";
    },
    async AddOrUpdateSpu() { // 点击保存的回调
      // 整理参数
      this.spuInfos.spuImageList = this.icons.map((list) => {
        // console.log(list);
        return {
          imgName: list.name,
          imgUrl: (list.response && list.response.data) || list.url,
        };
      });
      //  发送请求
      let result = await this.$API.spu.AddOrUpdateSpu(this.spuInfos);
      if (result.code == 200) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        // console.log('成功');
        this.$emit("ChangeViewNow", {viewNow:0,flag:this.spuInfos.id?'修改':'更新'});
      }
      // console.log(result);
      // 清理数据
    Object.assign(this._data,this.$options.data())

    },
    cancelSave(){ // 点击取消的回调，清空数据
    this.$emit('ChangeViewNow', {viewNow:0})
    // 清理数据 初始化data中的数据 object.assign 方法能合并对象
    // this._data 是组件实例的数据（理解为代理） $options 是当前组件的配置对象（data的数据）
    // 将当前组件的配置对象（为空） 跟当前组件代理数据进行合并，就完成了清空数据，可以理解为初始化当前组件的数据
    Object.assign(this._data,this.$options.data())

    }
  },
  computed: {
    // 计算出未选择的销售属性
    unSelectSale() {
      // saleAttrs  平台所有的销售属性
      // spuInfos.spuSaleAttrList 已有的销售属性
      // 过滤返回一个新数组
      let result = this.saleAttrs.filter((list) => {
        // 遍历所有的平台属性
        return this.spuInfos.spuSaleAttrList.every((list2) => {
          // 遍历当前已有的属性，返回跟遍历所有平台属性中每一个都不一样的，即为未选择
          return list.id != list2.baseSaleAttrId;
        });
      });
      return result;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>