<template>
  <div>
    <!-- form开始 -->
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="SPU名称">
        <el-input placeholder="输入spu名称" v-model="sku.skuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU价格">
        <el-input
          type="number"
          v-model="sku.price"
          placeholder="输入spu价格(元)"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU重量">
        <el-input placeholder="输入spu重量(kg)" v-model="sku.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="规格描述"
          v-model="sku.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <!-- 平台属性内部form 开始-->
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in skuAttrList"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdandValueId">
              <el-option
                :label="val.valueName"
                :value="`${attr.id}:${val.id}`"
                v-for="val in attr.attrValueList"
                :key="val.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 平台属性内部form 结束-->
      </el-form-item>
      <el-form-item label="销售属性">
        <!-- 销售属性内部form 开始-->
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item
            :label="sale.saleAttrName"
            v-for="sale in skuSaleList"
            :key="sale.id"
          >
            <el-select placeholder="请选择" v-model="sale.saleAndsaleValue">
              <el-option
                :label="salVal.saleAttrValueName"
                :value="`${sale.id}:${salVal.id}`"
                v-for="salVal in sale.spuSaleAttrValueList"
                :key="salVal.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 销售属性内部form 结束-->
      </el-form-item>
      <el-form-item label="图片列表">
        <!-- 图片列表内部table开始 -->
        <el-table
          style="width: 100%"
          border
          :data="skuImgsList"
          @selection-change="selectImgs"
        >
          <el-table-column
            prop="prop"
            type="selection"
            label="label"
            width="100px"
          >
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 200px" alt="" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                v-if="!row.isDefault"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 图片列表内部table结束 -->
      </el-form-item>
      <el-form-item label="">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- form结束 -->
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      skuImgsList: [], // 图片信息
      skuSaleList: [], // 销售属性
      skuAttrList: [], // 平台属性
      sku: {
        // -----------收集的sku实例属性
        // 父组件给的属性
        category3Id: 0, // 三级分类的id
        spuId: 0,
        tmId: 0, //品牌的id
        // 动态绑定获取的属性
        price: 0,
        weight: "",
        skuDesc: "",
        skuName: "",
        // 通过写代码回调获取的属性
        skuDefaultImg: "string", // 默认图片
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0, // 平台id
          //   skuId: 0, // 平台属性值的id
          // },
        ],
        // sku图片列表
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        //销售属性列表
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: "",
      imgList: [],
    };
  },
  methods: {
    async getInitData(category1Id, category2Id, spu) {
      this.sku.category3Id = spu.category3Id;
      this.sku.spuId = spu.id;
      this.sku.tmId = spu.tmId;
      this.spu = spu;
      let result = await this.$API.spu.getSpuImageList(spu.id); // 获取spu图片
      if (result.code == 200) {
        let imgs = result.data;
        imgs.forEach((img) => {
          img.isDefault = 0;
        });
        this.skuImgsList = imgs;
      } else {
        this.$message("获取图片失败");
      }

      let result2 = await this.$API.spu.getSpuSaleAttrList(spu.id); // 获取spu销售属性
      result2.code == 200
        ? (this.skuSaleList = result2.data)
        : this.$message("获取销售属性失败");
      console.log(result2);

      let result3 = await this.$API.spu.attrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      ); // 获取spu平台分类
      result3.code == 200
        ? (this.skuAttrList = result3.data)
        : this.$message("获取平台分类失败");
      console.log(result3);
    },
    // 选中图片的回调
    selectImgs(imgs) {
      console.log(imgs);
      this.imgList = imgs; // 暂时保存在imgList 里面，还缺少一个isDefault属性
    },
    // 设置默认图片的回调
    changeDefault(row) {
      // alert(1)
      this.skuImgsList.forEach((list) => {
        list.isDefault = 0;
      });
      row.isDefault = 1;
      // 收集默认图片路径
      this.sku.skuDefaultImg = row.imgUrl;
    },
    cancel() {
      this.$emit("ChangeVSku", 0);
      Object.assign(this._data, this.$options.data());
    },
  async  save() {
      // 点击保存
      // 整理数据
      const { sku, skuAttrList, skuSaleList,imgList } = this;
      //整理skuattrList

      // let attrArr = []
      // skuAttrList.forEach(list=>{
      //   if(list.attrIdandValueId){
      //     const [attrId,skuId] = list.attrIdandValueId.split(':')
      //     let obj ={attrId,valueId}
      //     attrArr.push(obj)
      //   }
      // })
      // sku.skuAttrValueList = attrArr
      sku.skuAttrValueList = skuAttrList.reduce((prev, list) => {
        // 给prev初始为数组
        if (list.attrIdandValueId) {
          // 如果当前为被选择的元素
          const [attrId,valueId] = list.attrIdandValueId.split(":");
          prev.push({ attrId, valueId });
        }
        return prev; // 返回作为下一次的对象继续push
      }, []);
      // 整理销售属性
      sku.skuSaleAttrValueList = skuSaleList.reduce((prev, list) => {
        // 给prev初始为数组
        if (list.saleAndsaleValue) {
          // 如果当前为被选择的元素
          const [saleAttrId, saleAttrValueId] = list.saleAndsaleValue.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev; // 返回作为下一次的对象继续push
      }, []);
//整理图片的数据
        sku.skuImageList = imgList.map(list=>{
          return {
            imgName:list.imgName,
            imgUrl:list.imgUrl,
            isDefault:list.isDefault,
            spuImgId:list.spuId,
          }
        })


        // 发请求保存
        let skuInfo = sku
        // console.log(skuInfo);
        let result = await this.$API.spu.addsku(skuInfo)
        console.log(result);
        if (result.code==200) {
          this.$message({
            message:'保存sku成功'
            ,type:'success'
          });

          this.cancel()
        }

    },
  },
};
</script>

<style>
</style>