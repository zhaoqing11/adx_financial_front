<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">请款申请</h4>
                </div>  
                <div class="create-workform">
                  <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="modal-product-search d-flex">
                      <form class="mr-3 position-relative">
                        <div class="form-group mb-0">
                          <input type="text" class="form-control" id="exampleInputText" v-model="code" placeholder="搜索申请单编号">
                          <a class="search-link" href="javaScript:void(0);" @click="getTableData">
                            <svg xmlns="http://www.w3.org/2000/svg" class="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </a>
                        </div>
                      </form>
                      <a href="javaScript:void(0);" class="btn btn-primary position-relative d-flex align-items-center justify-content-between" @click="clickShowDialogForm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                          添加申请
                      </a>
                    </div>
                  </div>
                </div>                    
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch">
                    <div class="card-body p-0">
                      <div class="d-flex justify-content-between align-items-center p-3">
                        <h5 class="font-weight-bold">请款申请</h5>
                      </div>
                      <div class="table-responsive">
                        <table class="table data-table mb-0">
                          <thead class="table-color-heading">
                            <tr class="text-light">                                                
                              <th scope="col" class="w-01 pr-0">
                                <div class="d-flex justify-content-start align-items-end mb-1">
                                  <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input m-0" id="customCheck">
                                    <label class="custom-control-label" for="customCheck"></label>
                                  </div>
                                </div>
                              </th>
                              <th scope="col">
                                <label class="text-muted m-0" >ID</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >申请单编号</label>
                              </th>
                              <th scope="col" class="dates">
                                <label class="text-muted mb-0" >事由</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0">申请金额（元）</label>
                              </th>
                              <th scope="col" class="text-right">
                                <label class="text-muted mb-0">付款名称</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >付款账号</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >申请人</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >申请日期</label>
                              </th>
                              <th scope="col" class="text-right">
                                <span class="text-muted" >操作</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="white-space-no-wrap" v-for="(item,index) in tableData" :key="index">
                              <td class="pr-0">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                  <input type="checkbox" class="custom-control-input m-0" id="customCheck1">
                                  <label class="custom-control-label" for="customCheck1"></label>
                                </div>
                              </td>
                              <td>{{index + 1}}</td>
                              <td>{{item.code ? item.code : '--'}}</td>
                              <td>{{item.reasonApplication}}</td>
                              <td>{{item.amount}}</td>
                              <td class="text-right">{{item.paymentName}}</td>
                              <td>{{formatCardNum(item.paymentAccount)}}</td>
                              <td>{{item.userName}}</td>
                              <td>{{item.createTime}}</td>
                              <td>
                                <div class="d-flex justify-content-end align-items-center">
                                  <i class="el-icon-view" @click="clickPreview(item, 'view')"></i>&nbsp;&nbsp;
                                  <i class="el-icon-edit" @click="clickPreview(item, 'edit')"></i>&nbsp;&nbsp;
                                  <i class="el-icon-delete" @click="deletePaymentForm(item.idPaymentForm)"></i>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="pagination">
                        <Pagination 
                        v-show="totalPage > 0" 
                        :total="totalPage" 
                        :page.sync="pageNum" 
                        :limit.sync="pageSize" 
                        @pagination="getTableData" 
                        :page-sizes="[10, 15, 20,30]"
                        layout="total, sizes, prev, pager, next"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="iq-footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <ul class="list-inline mb-0">
            </ul>
          </div>
          <div class="col-lg-6 text-right">
            <span class="mr-1">财务管理平台系统 版权所有 | <a href="https://beian.miit.gov.cn/">粤ICP备12030444号</a></span>
          </div>
        </div>
      </div>
    </footer>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <span class="promptText" v-if="isDisabled">{{promptText}}</span>
      <el-form :model="paymentForm" ref="paymentForm" :rules="rules" :disabled="disabled">
        <el-form-item label="类型" :label-width="formLabelWidth" prop="idCardType">
          <el-select v-model="paymentForm.idCardType" placeholder="请选择" style="width:100%;" @change="changeSelectOption">
            <el-option
              v-for="item in cardTypeData"
              :key="item.idCardType"
              :label="item.name"
              :value="item.idCardType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事由" :label-width="formLabelWidth" prop="reasonApplication">
          <el-input type="textarea" v-model="paymentForm.reasonApplication" autocomplete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="申请金额" :label-width="formLabelWidth" prop="amount">
          <el-input v-model="paymentForm.amount" type="number" autocomplete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="付款名称" :label-width="formLabelWidth" prop="paymentName">
          <el-input v-model="paymentForm.paymentName" autocomplete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="付款账号" :label-width="formLabelWidth" prop="paymentAccount">
          <el-input v-model="paymentForm.paymentAccount" autocomplete="off" :disabled="isDisabled" ref="cardInput" @blur="blurFormatCardNumber(paymentForm.paymentAccount)"></el-input>
        </el-form-item>
        <el-form-item label="上传附件" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            v-if="!disabled"
            :action="uploadUrl"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            multiple
            :limit="3"
            accept=".jpg, .jpeg, .png, .JPG, .JPEG"
            :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <span style="color:red;">仅限上传3个文件，格式支持（.jpg/.jpeg/.png）</span>
          </el-upload>
          <el-tag v-for="(item,index) in fileList" 
          :key="index" 
          :closable="!disabled"
          @click="clickTag(fileList, index)"
          @close="closeTag(item)">{{item.fileName}}</el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="!disabled">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPaymentForm('paymentForm')">确 定</el-button>
      </div>
    </el-dialog>
    <PreviewImage ref="previewImage" />
  </div>
</template>

<script>
import * as API from '@/api/paymentForm';
import * as REMITTANCE from '@/api/paymentRemittance';
import * as CTYPE from '@/api/cardType';
import * as DAILY from '@/api/daily';
import { getUserId, getToken } from '@/utils/auth';
import Pagination from '@/components/Pagination';
import PreviewImage from "@/components/PreviewImage"
import { formatCardNum } from '@/utils/validate';
// import "@/utils/assets/js/demo.js";
// import "@/utils/js/backend-bundle.min.js";
// import "@/utils/js/sidebar.js";
// import "@/utils/js/flex-tree.min.js";
// import "@/utils/js/tree.js";
// import "@/utils/js/table-treeview.js";
// import "@/utils/js/slider.js";
// import "@/utils/js/app.js";

export default {
  components: { PreviewImage, Pagination },
  data() {
    return {
      title: '',
      idUser: getUserId(),
      showUser: false,
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 0,
      code: '',
      tableData: [],
      dialogFormVisible: false,
      paymentForm: {
        idPaymentForm: null,
        idCardType: null,
        reasonApplication: null,
        amount: null,
        paymentName: null,
        paymentAccount: null,
        files: null,
        idUser: null,
        state: null
      },
      formLabelWidth: '120',
      rules: {
        idCardType: [
          { required: true, message: '请选择账目类型', trigger: 'change' },
        ],
        reasonApplication: [
          { required: true, message: '请填写申请事由', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '请填写申请金额', trigger: 'blur' }
        ],
        paymentName: [
          { required: true, message: '请填写付款名称', trigger: 'blur' }
        ],
        paymentAccount: [
          { required: true, message: '请填写付款账号', trigger: 'blur' }
        ]
      },
      formatCardNum: formatCardNum,
      cardTypeData: [],
      isDisabled: false,
      promptText: '上日账单尚未通过审核，暂时无法创建请款申请',

      idDaily: null,
      idCardType: null,

      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: []
    }
  },
  computed: {
    uploadUrl() {
      return (
        process.env.VUE_APP_BASE_API +
        "/file/upload" +
        "?AccessToken=" +
        getToken()
      )
    }
  },
  mounted() {
    this.getCardTypeList()
    this.getTableData()
  },
  methods: {
    clickTag(file, index) {
      this.$refs.previewImage.show(file, index)
    },
    // 文件上传
    uploadSuccess(response, file, fileList) {
      const { status, datas } = response
      if (status === 200) {
        this.fileList.push(datas)
      }
    },
    closeTag(item) {
      this.fileList.splice(this.fileList.indexOf(item), 1)
    },
    beforeUpload(file) {
      if (this.fileList.length > 3) {
        this.$message.warning('仅限上传3个文件')
        return false;
      }

      if (file.type == 'image/jpeg' ||
        file.type == 'image/jpg' ||
        file.type == 'image/png') {
        return true;
      }

      this.$message.warning('只能上传jpg/jpeg/png文件')
      return false;
    },
    // 删除文件
    handleRemove(file) {
      let id = this.fileList.findIndex(key => {
        return key.fileId == file.fileId
      })
      this.fileList.splice(id, 1)
    },
    changeSelectOption() {
      // if (this.idDaily != null && this.idDaily != undefined && this.idDaily != '') {
      //   return true;
      // }
      DAILY.selectIsExitUnApprovalDaily({
        idCardType: this.paymentForm.idCardType
      }).then(res => {
        if (res.data.status === 200) {
          if (res.data.datas >= 1) {
            this.isDisabled = true
          } else {
            this.isDisabled = false
          }
        }
      })
    },
    // 删除请款单
    deletePaymentForm(id) {
      REMITTANCE.getRemittanceByIdPamentForm({
        idPaymentForm: id
      }).then(res => {
        if (res.data.status === 200) {
          if (res.data.datas > 0) {
            this.$message.warning('此申请已完成汇款，无法删除请款记录');
          } else {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              API.delPaymentForm({
                idPaymentForm: id
              }).then(res => {
                if (res.data.status === 200) {
                  this.$message.success('删除成功');
                  this.getTableData();
                }
              })
            }).catch(() => {
              this.$message.info('已取消删除');
            });
          }
        }
      })
    },
    // 查看详情
    clickPreview(data, type) {
      console.log(data)
      API.selectPaymentFormById({
        idPaymentForm: data.idPaymentForm
      }).then(res => {
        if (res.data.status === 200) {
          this.paymentForm = res.data.datas
          this.fileList = this.paymentForm.files != null ? JSON.parse(this.paymentForm.files) : []
        }
      })

      if (type === 'view') {
        this.title = '查看申请单'
        this.disabled = true
        this.dialogFormVisible = true
      } else {
        if (data.state === 2) {
          this.$message.warning('无法编辑，数据正在审核中')
        } else if (data.state === 3) {
          this.$message.warning('无法编辑，申请已通过审核')
        } else {
          this.title = '编辑申请单'
          this.disabled = false
          this.dialogFormVisible = true
        }
      }
    },
    // 创建申请单
    addPaymentForm(formName) {
      if (this.fileList.length > 0) {
        this.paymentForm.files = JSON.stringify(this.fileList)
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.paymentForm.paymentAccount = this.paymentForm.paymentAccount.replaceAll('-', '')
          const param = {
            idCardType: this.paymentForm.idCardType,
            reasonApplication: this.paymentForm.reasonApplication,
            amount: this.paymentForm.amount,
            paymentName: this.paymentForm.paymentName,
            paymentAccount: this.paymentForm.paymentAccount,
            files: this.paymentForm.files,
            state: 2,
            idUser: this.idUser
          }
          API.addPaymentForm(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('创建成功')
              this.dialogFormVisible = false
              this.resetForm(formName)
              this.fileList = []
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    clickShowDialogForm() {
      this.paymentForm.idCardType = null
      this.paymentForm.reasonApplication = null
      this.paymentForm.amount = null
      this.paymentForm.paymentName = null
      this.paymentForm.paymentAccount = null
      this.paymentForm.files = null
      this.paymentForm.idUser = null
      this.fileList = []

      this.title = '创建申请单'
      this.disabled = false
      this.dialogFormVisible = true
    },
    // 获取个人请款记录列表
    getTableData() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        code: this.code,
        idUser: this.idUser
      } 
      API.selectPaymentFormList(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas;
          this.tableData = tmpData.list;
          this.totalPage = tmpData.totalRecord;
        }
      })
    },
    // 获取账目类型
    getCardTypeList() {
      CTYPE.getCardType().then(res => {
        if (res.data.status === 200) {
          this.cardTypeData = res.data.datas
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 格式化卡号显示，每4位加-
    blurFormatCardNumber (cardNum) {
      // cardNum = cardNum.replaceAll('-', '')
      // if (cardNum.length < 16 || cardNum.length > 22) {
      //   this.$message.warning('请输入正确卡号')
      //   return false
      // }
      // 获取input的dom对象，这里因为用的是element ui的input，所以需要这样拿到
      const input = this.$refs.cardInput.$el.getElementsByTagName('input')[0]
      // 获取当前光标的位置
      const cursorIndex = input.selectionStart
      // 字符串中光标之前-的个数
      const lineNumOfCursorLeft = (cardNum.slice(0, cursorIndex).match(/-/g) || []).length
      // 去掉所有-的字符串
      const noLine = cardNum.replace(/-/g, '')
      // 去除格式不对的字符并重新插入-的字符串
      const newCardNum = noLine.replace(/\D+/g, '').replace(/(\d{4})/g, '$1-').replace(/-$/, '')
      // 改后字符串中原光标之前-的个数
      const newLineNumOfCursorLeft = (newCardNum.slice(0, cursorIndex).match(/-/g) || []).length
      // 光标在改后字符串中应在的位置
      const newCursorIndex = cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft
      // 赋新值，nextTick保证-不能手动输入或删除，只能按照规则自动填入
      this.$nextTick(() => {
        this.paymentForm.paymentAccount = newCardNum
        // 修正光标位置，nextTick保证在渲染新值后定位光标
        this.$nextTick(() => {
          // selectionStart、selectionEnd分别代表选择一段文本时的开头和结尾位置
          input.selectionStart = newCursorIndex
          input.selectionEnd = newCursorIndex
        })
      })
    }
  }
}
</script>

<style lang="scss" >
.el-icon-delete:before,
.el-icon-edit:before,
.el-icon-view:before {
  color: #8f9fbc !important;
  font-weight: 500;
}
.pagination {
  float: right;
  margin: 20px;
}
.promptText {
  color: red;
  font-size: 22px;
}
.el-tag {
  margin: 0 5px;
}
</style>
