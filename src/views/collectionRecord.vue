<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">收款列表</h4>
                </div>  
                <div class="create-workform">
                  <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="modal-product-search d-flex">
                      <form class="mr-3 position-relative">
                        <div class="form-group mb-0">
                          <el-date-picker
                            v-model="currentDate"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                          </el-date-picker>
                          <el-button type="primary" icon="el-icon-search" @click="getTableData"></el-button>
                        </div>
                      </form>
                      <a href="javaScript:void(0);" class="btn btn-primary position-relative d-flex align-items-center justify-content-between" @click="clickAddCollectionRecord()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                          新增收款
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
                        <h5 class="font-weight-bold">收款列表</h5>
                        <!-- <button class="btn btn-secondary btn-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                            导 出
                        </button> -->
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
                                <label class="text-muted mb-0">账户类型</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0">收款金额（元）</label>
                              </th>
                              <th scope="col" class="text-right">
                                <label class="text-muted mb-0">收款日期</label>
                              </th>
                              <th scope="col" class="text-right">
                                <label class="text-muted mb-0">备注</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >操作人</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >创建日期</label>
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
                              <td>
                                <div v-for="(itm,index) in configData" :key="index">
                                  <span v-if="item.idConfig === itm.idConfig">{{itm.code}}</span>
                                </div>
                              </td>
                              <td>{{item.amount}}</td>
                              <td class="text-right">{{item.collectionDate}}</td>
                              <td>{{item.remark}}</td>
                              <td>{{item.userName}}</td>
                              <td>{{item.createTime}}</td>
                              <!-- <td>
                                <div class="d-flex justify-content-end align-items-center">
                                  <a class="" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="javaScript:void(0);" @click="clickEditCollectionRecord(item)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="text-secondary" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                  </a>&nbsp;&nbsp;
                                  <i class="el-icon-delete" @click="deleteCollectionRecord(item.idCollectionRecord)"></i>
                                </div>
                              </td> -->
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
      <el-form :model="collectionRecordForm" ref="collectionRecordForm" :rules="rules">
        <el-form-item label="账目类型" :label-width="formLabelWidth" prop="idCardType">
          <el-select v-model="collectionRecordForm.idCardType" placeholder="请选择" style="width:100%;" @change="changeSelectOption(1)">
            <el-option
              v-for="item in cardTypeData"
              :key="item.idCardType"
              :label="item.name"
              :value="item.idCardType">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账户" :label-width="formLabelWidth" prop="idCardType" v-if="collectionRecordForm.idCardType === 1">
          <el-select v-model="collectionRecordForm.idConfig" placeholder="请选择" style="width:100%;" @change="changeSelectOption(2)">
            <el-option
              v-for="item in pubData"
              :key="item.idConfig"
              :label="item.name"
              :value="item.idConfig">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收款金额" :label-width="formLabelWidth" prop="amount">
          <el-input v-model="collectionRecordForm.amount" type="number" autocomplete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="收款日期" :label-width="formLabelWidth" prop="collectionDate">
          <el-date-picker
            :disabled="isDisabled"
            v-model="collectionRecordForm.collectionDate"
            type="datetime"
            placeholder="选择日期"
            style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
          <el-input type="textarea" v-model="collectionRecordForm.remark" autocomplete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="!isDisabled">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="type == 'insert' ? addCollectionRecord('collectionRecordForm') : editCollectionRecord('collectionRecordForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/api/collectionRecord';
import * as DAILY from '@/api/daily';
import * as CONFIG from '@/api/config';
import * as CTYPE from '@/api/cardType';
import { getUserId, getRole } from '@/utils/auth';
import { formatDate, formatCardNum } from '@/utils/validate';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data() {
    return {
      idRole: getRole(),
      idUser: getUserId(),
      showUser: false,
      title: '新增收款',
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 0,
      currentDate: '',
      tableData: [],
      dialogFormVisible: false,
      collectionRecordForm: {
        idConfig: null,
        idCardType: null,
        idCollectionRecord: null,
        amount: null,
        collectionDate: '',
        remark: null,
        idUser: null
      },
      formLabelWidth: '120',
      rules: {
        idCardType: [
          { required: true, message: '请选择账目类型', trigger: 'change' }
        ],
        amount: [
          { required: true, message: '请填写收款金额', trigger: 'blur' }
        ],
        collectionDate: [
          { required: true, message: '请选择收款日期', trigger: 'change' }
        ],
        collectionAccount: [
          { required: true, message: '请填写收款账号', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      type: null,
      formatCardNum: formatCardNum,
      cardTypeData: [],
      isDisabled: false,
      promptText: '上日账单尚未通过审核，暂时无法收款操作',
      pubData: [],
      configData: []
    }
  },
  mounted() {
    this.getCardTypeList()
    this.getTableData()
    this.getConfigList()
  },
  methods: {
    // 获取账户配置列表
    getConfigList() {
      CONFIG.selectAll().then(res => {
        if (res.data.status === 200) {
          this.configData = res.data.datas
        }
      })
    },
    getConfigById() {
      CONFIG.selectByIdCardType({
        idCardType: this.collectionRecordForm.idCardType
      }).then(res => {
        if (res.data.status === 200) {
          this.pubData = res.data.datas
        }
      })
    },
    changeSelectOption(type) {
      if (type === 2) {
        DAILY.selectIsExitUnApprovalDaily({
          idCardType: this.collectionRecordForm.idCardType
        }).then(res => {
          if (res.data.status === 200) {
            if (res.data.datas >= 1) {
              this.isDisabled = true
            } else {
              this.isDisabled = false
              this.getConfigById()
            }
          }
        })
      } else {
        if (this.collectionRecordForm.idCardType == 2) {
          this.collectionRecordForm.idConfig = this.collectionRecordForm.idCardType
        } else {
          this.collectionRecordForm.idConfig = null
          this.getConfigById()
        }
      }
    },
    // 获取账目类型列表
    getCardTypeList() {
      CTYPE.getCardType().then(res => {
        if (res.data.status === 200) {
          this.cardTypeData = res.data.datas
        }
      })
    },
    // 编辑收款记录
    editCollectionRecord(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let collectionDate = formatDate(this.collectionRecordForm.collectionDate)
          const param = {
            idCollectionRecord: this.collectionRecordForm.idCollectionRecord,
            amount: this.collectionRecordForm.amount,
            collectionDate: collectionDate,
            remark: this.collectionRecordForm.remark,
            collectionAccount: this.collectionRecordForm.collectionAccount
          }
          API.updateCollectionRecord(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('编辑成功')
              this.dialogFormVisible = false
              this.resetForm()
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    clickAddCollectionRecord() {
      this.$forceUpdate()
      this.type = 'insert'
      this.title = '新增收款'
      this.collectionRecordForm.amount = null
      this.collectionRecordForm.idCollectionRecord = null
      this.collectionRecordForm.collectionDate = null
      this.collectionRecordForm.collectionAccount = null
      this.collectionRecordForm.idUser = null
      this.dialogFormVisible = true
    },
    clickEditCollectionRecord(data) {
      this.type = 'edit'
      this.title = '编辑收款记录'
      this.collectionRecordForm = JSON.parse(JSON.stringify(data))
      this.dialogFormVisible = true
    },
    // 删除收款记录
    deleteCollectionRecord(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        API.delCollectionRecord({
          idCollectionRecord: id
        }).then(res => {
          if (res.data.status === 200) {
            this.$message.success('删除成功');
            this.getTableData();
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    // 新增收款记录
    addCollectionRecord(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let collectionDate = formatDate(this.collectionRecordForm.collectionDate)
          const param = {
            idConfig: this.collectionRecordForm.idConfig,
            idCardType: this.collectionRecordForm.idConfig,
            amount: this.collectionRecordForm.amount,
            collectionDate: collectionDate,
            remark: this.collectionRecordForm.remark,
            idUser: this.idUser
          }
          API.addCollectionRecord(param).then(res => {
            if (res.data.status === 200) {
              this.$message.success('创建成功')
              this.dialogFormVisible = false
              this.resetForm()
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    // 获取收款记录列表
    getTableData() {
      let startTime = ''
      let endTime = ''
      if (this.currentDate != '' && this.currentDate != null) {
        startTime = formatDate(this.currentDate[0]);
        endTime = formatDate(this.currentDate[1]);
      }
      
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: startTime,
        endTime: endTime
      } 
      API.selectCollectionRecord(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas;
          this.tableData = tmpData.list;
          this.totalPage = tmpData.totalRecord;
        }
      })
    },
    // 重置
    resetForm() {
      this.$refs['collectionRecordForm'].resetFields();
    }
  }
}
</script>

<style lang="scss" >
.el-icon-delete:before {
  color: #8f9fbc !important;
  font-weight: 500;
}
.el-button--primary {
  background-color: #3378ff;
  border-color: #3378ff;
}
.pagination {
  float: right;
  margin: 20px 10px;
}
.promptText {
  color: red;
  font-size: 22px;
}
</style>
