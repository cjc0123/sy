<template>
  <div class="app-container">
    <!-- <div class="head-container">
      <el-button type="primary" icon="el-icon-plus" @click="add"
        >申请经销商</el-button
      >
    </div> -->
    <!-- <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="name"> </el-table-column>
      <el-table-column prop="code" label="统一社会信用代码"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="legalPerson" label="法定代表人"> </el-table-column>
      <el-table-column prop="capital" label="注册资本"> </el-table-column>
      <el-table-column prop="establishDate" label="成立日期"> </el-table-column>
      <el-table-column prop="busiTrem" label="营业期限"> </el-table-column>
      <el-table-column prop="address" label="住所"> </el-table-column>
      <el-table-column prop="contacts" label="联系人"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-tag effect="dark" v-show="scope.row.status == 0">审核中</el-tag>
            <el-tag type="success" effect="dark" v-show="scope.row.status == 1"
              >审核通过</el-tag
            >
            <el-tag type="danger" effect="dark" v-show="scope.row.status == 2"
              >审核未通过</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="grade" label="等级"> </el-table-column>
      <el-table-column prop="source" label="渠道来源"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row)">修改</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table> -->

    <!-- <div style="padding: 0 100px">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="名字">
          <span>{{formDatas.name}}</span>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <span>{{formDatas.code}}</span>
        </el-form-item>
        <el-form-item label="类型">
          <span>{{formDatas.type}}</span>
        </el-form-item>
        <el-form-item label="法定代表人">
          <span>{{formDatas.legalPerson}}</span>
        </el-form-item>
        <el-form-item label="注册资本">
          <span>{{formDatas.capital}}</span>
        </el-form-item>
        <el-form-item label="成立日期">
          <span>{{formDatas.establishDate}}</span>
        </el-form-item>
        <el-form-item label="营业期限">
          <span>{{formDatas.busiTrem}}</span>
        </el-form-item>
        <el-form-item label="住所">
          <span>{{formDatas.address}}</span>
        </el-form-item>
        <el-form-item label="联系人">
          <span>{{formDatas.contacts}}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{formDatas.mobile}}</span>
        </el-form-item>
        <el-form-item label="状态">
          <span>{{formDatas.status}}</span>
        </el-form-item>
        <el-form-item label="等级">
          <span>{{formDatas.grade}}</span>
        </el-form-item>
        <el-form-item label="渠道来源">
          <span>{{formDatas.source}}</span>
        </el-form-item>
      </el-form>
    </div> -->
    <div style="padding-left: 202px" v-loading="formLoading">
      <el-form :model="form" label-position="left" :rules="rules" ref="form">
        <el-upload
          style="margin-bottom: 15px"
          class="upload-demo"
          action="
            https://store.twinsel.com/mall/api/yxDistributorRegister/uploadOcrFile
          "
          :on-success="ocrSuccess"
          name="imgFile"
          :show-file-list="false"
          :file-list="fileList"
          :before-upload="beforeUpload"
        >
          <el-button size="small" type="primary"
            >上传营业执照自动填写</el-button
          >
        </el-upload>
        <el-row>
          <el-col :span="24"
            ><el-form-item label="企业名称:" prop="name" label-width="211px">
              <el-input
                class="inp"
                v-model="form.name"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><el-form-item
              label="统一社会信用代码:"
              prop="code"
              label-width="211px"
            >
              <el-input
                class="inp"
                v-model="form.code"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><el-form-item label="类型:" prop="type" label-width="211px">
              <el-input
                class="inp"
                v-model="form.type"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><el-form-item
              label="法定代表人:"
              prop="legalPerson"
              label-width="211px"
            >
              <el-input
                class="inp"
                v-model="form.legalPerson"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><el-form-item label="注册资本:" prop="capital" label-width="211px">
              <el-input
                class="inp"
                v-model="form.capital"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><el-form-item
              label="成立日期:"
              prop="establishDate"
              label-width="211px"
            >
              <el-date-picker
                class="inp"
                v-model="form.establishDate"
                type="date"
                placeholder="选择日期"
                format="yyyy年MM月dd"
                value-format="yyyy年MM月dd"
                size="large"
              >
              </el-date-picker> </el-form-item
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><el-form-item
              label="营业期限:"
              prop="busiTrem"
              label-width="211px"
            >
              <el-input
                class="inp"
                v-model="form.busiTrem"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><el-form-item label="住所:" prop="address" label-width="211px">
              <el-input
                class="inp"
                v-model="form.address"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><el-form-item label="联系人:" prop="contacts" label-width="211px">
              <el-input
                class="inp"
                v-model="form.contacts"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"
            ><el-form-item label="手机号:" prop="mobile" label-width="211px">
              <el-input
                class="inp"
                v-model="form.mobile"
                size="large"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="等级:" prop="grade" label-width="211px">
              <el-select class="inp" v-model="form.grade" placeholder="" size="large">
                <el-option
                  size="small"
                  v-for="item in gradeOpt"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="渠道来源:" prop="source" label-width="211px">
              <el-select class="inp" v-model="form.source" placeholder="" size="large">
                <el-option
                  
                  v-for="item in sourcesOpt"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="营业执照:" label-width="211px">
              <el-upload
                class="avatar-uploader"
                action="
                  
                    https://store.twinsel.com/system/upload
                "
                :show-file-list="false"
                :on-success="YyZzSuccess"
                :file-list="fileList_YyZz"
              >
                <img v-if="form.ocrFile" :src="form.ocrFile" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          
        </el-row>
        <!-- NODE_ENV == 'development'
                    ? 'http://192.168.1.15:8081/system/upload'
                    : 'https://store.twinsel.com/system/upload' -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="合同章:" label-width="211px">
              <el-upload
                class="avatar-uploader"
                action="
                 https://store.twinsel.com/system/upload
                "
                :show-file-list="false"
                :on-success="HtzSuccess"
                :file-list="fileList_Htz"
              >
                <img v-if="form.htzFile" :src="form.htzFile" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        

      </el-form>
    </div>
    <div slot="footer" style="padding-left: 414px">
      <!-- <el-button @click="showApply = false">取 消</el-button> -->
      <!-- <el-button type="success" @click="submitApply">{{
        formType == 0 ? "修改" : "申请"
      }}</el-button> -->
      <div @click="submitApply" class="applyJxs-btn">
        {{ formType == 0 ? "修改" : "申请" }}
      </div>
    </div>
    <!-- <el-dialog
      :title="formType == 0 ? '修改申请' : '申请经销商'"
      :visible.sync="showApply"
      width="750px"
      :close-on-click-modal="false"
    >
    </el-dialog> -->
  </div>
</template>

<script>
//?导入接口
import { list1, editJxs, addJxs, findDj, batchSee } from "@/api/applyJxs";
export default {
  computed: {
    //?从仓库获取当前登录人的id
    upmsUserId() {
      return this.$store.state.user.user.id;
    },
    NODE_ENV() {
      return process.env.NODE_ENV;
    },
  },
  data() {
    return {
      //?是否显示添加经销商申请
      showAdd: false,
      //?等级选项源
      gradeOpt: [],
      //?渠道选项源
      sourcesOpt: [],
      //?营业执照上传列表
      fileList_YyZz: [],
      //?合同章上传列表
      fileList_Htz: [],
      //?ocr上传列表
      fileList: [],
      //?动态载入动画绑定值
      loading: false,
      //?0修改，1新增
      formType: 1,
      //?表格数据
      tableData: [],
      //?经销商表单绑定值
      showApply: false,
      //?表单数据
      form: {},
      formLoading: false,
      formDatas: {}, //表单数据只做显示
      //?表单验证规则
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        code: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请输入类型",
            trigger: "blur",
          },
        ],
        legalPerson: [
          {
            required: true,
            message: "请输入法定代表人",
            trigger: "blur",
          },
        ],
        capital: [
          {
            required: true,
            message: "请输入注册资本",
            trigger: "blur",
          },
        ],
        establishDate: [
          {
            required: true,
            message: "请选择成立日期",
            trigger: "blur",
          },
        ],
        busiTrem: [
          {
            required: true,
            message: "请输入营业期限",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入住所",
            trigger: "blur",
          },
        ],
        contacts: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    beforeUpload(file){
      this.formLoading=true;
    },
    //!合同章上传成功后勾子
    HtzSuccess(res, file, fileList) {
      this.form.htzFile = res.link;
    },
    //!营业执照上传成功后勾子
    YyZzSuccess(res, file, fileList) {
      this.form.ocrFile = res.link;
      console.log(this.form.ocrFile);
    },
    //!ocr上传成功后勾子
    ocrSuccess(res, file, fileList) {
      this.form = res;
      this.formLoading=false;
    },
    //!提交申请
    submitApply() {
      //?表单验证
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.formType == 0) {
            //   ?修改
            this.form.status = 0;
            editJxs(this.form)
              .then((res) => {
                //?提示修改成功
                this.$message.success("修改成功!");
                //?关闭dia
                this.showApply = false;
                //?刷新表格数据
                this.getTable();
              })
              .catch((err) => {
                this.$message.error(err);
              });
          } else if (this.formType == 1) {
            //   ?新增
            this.form.upmsUserId = this.upmsUserId;
            addJxs(this.form)
              .then((res) => {
                //?提示申请成功
                this.$message.success("申请成功!");
                //?关闭dia
                this.showApply = false;
                //?刷新表格数据
                this.getTable();
              })
              .catch((err) => {
                this.$message.error(err);
              });
          }
        } else {
          return false;
        }
      });
    },
    //!点修改按钮
    edit(row) {
      console.log(row);
      //?清空ocr上传列表
      this.fileList = [];
      //?修改表单类型
      this.formType = 0;
      //?显示dia
      this.showApply = true;
      //?数据深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    //!点击申请经销商按钮
    add() {
      //?清空ocr上传列表
      this.fileList = [];
      //?点击申请时清空表单
      this.clearForm();
      
      //?显示dia
      this.showApply = true;
    },
    //!查询经销商等级、渠道
    findGrade() {
      batchSee()
        .then((res) => {
          this.gradeOpt = res.grades;
          this.sourcesOpt = res.sources;
        })
        .catch((err) => {});
    },
    //!清空表单
    clearForm() {
      this.form = {};
    },
    //!获取表格数据
    getTable() {
      //?开始载入
      this.loading = true;
      list1({ upmsUserId: this.upmsUserId })
        .then((res) => {
          //?接口返回数据复制表格数据
          this.tableData = res.content;
          console.log(this.tableData);

          this.formDatas = res.content[0];

          //?判断是否需要再申请经销商
          if (res.content.length > 0) {
            this.showAdd = false;
          } else {
            this.showAdd = true;
          }
          //?结束载入
          this.loading = false;
        })
        .catch((err) => {});
    },
  },
  created() {
    //?页面created勾子时载入表格数据
    this.getTable();
    // this.findJxsGrade();
    //?修改表单类型
      this.formType = 1;
      //?赋值等级渠道下拉选项
      this.findGrade();
  },
};
</script>

<style scoped>
.inp {
  width: 300px;
  height: 48px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 220px;
  line-height: 220px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
::v-deep .el-icon-plus,
::v-deep .avatar-uploader-icon {
  border: 1px solid #dcdfe6;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.applyJxs-btn{
  width: 300px;
  height: 40px;
  border-radius:5px ;
  background: #409eff;
  color:#fff;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
/deep/.el-form-item__label{
  font-size:19px;
  font-weight: normal;
}
.upload-demo{
  padding-left: 211px;
}
/deep/.el-button--small{
  font-size: 18px;
}
/deep/.el-button--primary{
  background-color: #21B8CE;
  border-color: #21B8CE;
}
</style>