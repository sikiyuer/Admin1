<template>
  <!--eslint-disable-->

  <div>
    <!-- 按钮 -->
    <el-button
      @click="showDialog"
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      >添加</el-button
    >
    <!-- 表格 
    data是展示的数据，为数组类型
    border:边框
    labelb:标题
    width:宽度（column）
    align:对其方式
    
    -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column
        prop="prop"
        type="index"
        label="序号"
        width="100px"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌图片" width="width">
        <template slot-scope="{ row, $index }">
          <!-- {{row}} -->
          <img :src="row.logoUrl" style="width: 50px; height: 50px" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="进行操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            @click="updateTradeMark(row)"
            type="warning"
            icon="el-icon-edit"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 
      :current-page=当前第几页
      :total=所有的数据的数量
      :page-size=每一页展示几条数据
      :page-sizes=设置每一页展示多少条数据
      :page-count=分页长度
      layout=实现分页器布局

    -->
    <el-pagination
      style="margin-top: 25px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3, 5, 10]"
      :page-count="9"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,->,sizes,total"
    >
    </el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :title="tradeForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="tradeForm" :rules="rules" ref='tmForm'>
        <!-- :model="form" -->
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input autocomplete="off" v-model="tradeForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌图片" prop="logoUrl" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tradeForm.logoUrl"
              :src="tradeForm.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddorUpdateMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
   var  validatetmName = (rule,value,callback)=>{ // 自定义校验
        if(value.length<2||value.length>10){
          callback(new Error('长度2-10'))}
          else{

          }
   }
    return {
      page: 1,
      limit: 4,
      total: 0,
      list: [],
      dialogFormVisible: false, // 控制对话框显示隐藏
      imageUrl: "",
      tradeForm: {
        // 收集品牌信息
        id: "",
        logoUrl: "",
        tmName: "",
      },
      // 表单验证的规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // {
          //   min: 3,
          //   max: 5,
          //   message: "长度在 3 到 5 个字符",
          //   trigger: "change",
          // },
           { validator: validatetmName, trigger: 'blur' } /// 自定义校验规则
        ],
        logoUrl: [{ required: true, message: "请上传品牌图片" }],
      },
    };
  },
  name: "TradeMark",
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMark(page, limit);
      if (result.code == 200) {
        this.total = result.data.total; // 展示的总数
        this.list = result.data.records; // 所有数据
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getPageList();
    },
    showDialog() {
      // 点击添加或者编辑的回调，显示dialog
      this.dialogFormVisible = !this.dialogFormVisible;
      this.tradeForm.logoUrl = "";
      this.tradeForm.tmName = "";
    },
    updateTradeMark(row) {
      // 修改品牌
      this.dialogFormVisible = !this.dialogFormVisible; // 展示dialog
      this.tradeForm = { ...row };
    },

    // 图片上传相关回调
    handleAvatarSuccess(res, file) {
      //  console.log(res);
      this.tradeForm.logoUrl = res.data; // 将返回的图片路径报存
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击确认时 添加品牌或者修改品牌
    AddorUpdateMark() {
      this.$refs.tmForm.validate(async (valid) => {
        if (valid) {
          // 验证通过时
          let result = await this.$API.trademark.reqAddOrUpdateMark(
            this.tradeForm
          );
          if (result.code == 200) {
            const msg = this.tradeForm.id ? "修改品牌成功" : "添加品牌成功";
            this.$message.success(msg); //
            // 判断是添加还是修改，若是修改则留在修改的那一页
            this.getPageList(this.tradeForm.id ? this.page : 1);
            this.tradeForm.id = "";
            this.dialogFormVisible = false; // 关闭对话框
          } else {
            this.$message(this.tradeForm.id ? "添加品牌失败" : "修改品牌失败"); // 判断是否带id弹出添加或者修改成功
          }
        } else {
          // 验证失败时
          console.log("error submit!!");
          return false;
        }
      });
    },
  deleteTradeMark(row){ // 点击删除的回调
        this.$confirm(`是否删除,${row.tmName}?`, '删除品牌', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
         let result= await  this.$API.trademark.reqDelTradeMark(row.id)
         if(result.code == 200){
           this.getPageList(this.list.length>1?this.page:this.page-1) // 判断当前页的数据有几个
          this.$message({
            type: 'success',
            message: '删除成功!'
          });}
          else{
            this.$message({
            type: 'fail',
            message: '删除失败!'
          });

          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    }
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;

  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>