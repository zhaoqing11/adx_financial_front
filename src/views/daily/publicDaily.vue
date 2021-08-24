<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">日报</h4>
                </div>
                <div class="create-workform">
                  <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="modal-product-search d-flex">
                      <form class="mr-3 position-relative">
                        <div class="form-group mb-0">
                          <el-date-picker
                            v-model="currentDate"
                            type="date"
                            placeholder="选择日期"
                            >
                          </el-date-picker>
                          <el-button type="primary" icon="el-icon-search" @click="getTableData"></el-button>
                          <p class="confirm-text">* 提示：日期格式（2021-08-01）</p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>                    
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch">
                    <div class="card-body p-0">
                      <div class="d-flex justify-content-between align-items-center p-3">
                        <!-- <h5 class="font-weight-bold">日报</h5> -->
                      </div>
                      <div class="table-responsive">
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            :default-sort = "{prop: 'createTime', order: 'descending'}"
                            >
                            <el-table-column
                                type="selection"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="日期"
                                :formatter="formatter">
                            </el-table-column>
                            <el-table-column
                                prop="collectionAmount"
                                label="日收入">
                                <template slot-scope="scope">
                                    {{scope.row.collectionAmount ? scope.row.collectionAmount : '--'}}
                                </template>
                                </el-table-column>
                            <el-table-column
                                prop="payAmount"
                                label="日支出">
                                <template slot-scope="scope">
                                    {{scope.row.payAmount ? scope.row.payAmount : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="serviceCharge"
                                label="手续费"
                                sortable>
                                <template slot-scope="scope">
                                    {{scope.row.serviceCharge ? scope.row.serviceCharge : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="remainingSum"
                                label="余额"
                                sortable>
                                <template slot-scope="scope">
                                    {{scope.row.remainingSum ? scope.row.remainingSum : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="120">
                                <template slot-scope="scope">
                                  <span v-if="scope.row.state === 1"><i class="el-icon-success"></i></span>
                                  <span v-else-if="scope.row.state === 2"><i class="el-icon-error"></i></span>
                                  <span v-else><i class="el-icon-edit" @click="showApprovalDaily(scope.row)"></i></span>
                                </template>
                            </el-table-column>
                        </el-table>
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
            <span class="mr-1">Copyright © 2021.</span>
          </div>
        </div>
      </div>
    </footer>
    <el-dialog title="收支明细" :visible.sync="dialogFormVisible">
      <el-table
        :data="flowRecordDta"
        style="width: 100%"
        :default-sort = "{prop: 'createTime', order: 'descending'}"
        >
        <el-table-column
          type="index"
          label="序号"
          width="80">
          《<template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="reasonApplication"
          label="事由">
          <template slot-scope="scope">
            {{scope.row.reasonApplication ? scope.row.reasonApplication : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="申请金额">
          <template slot-scope="scope">
            {{scope.row.amount ? scope.row.amount : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="paymentName"
          label="付款名称">
          <template slot-scope="scope">
            {{scope.row.paymentName ? scope.row.paymentName : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="paymentAccount"
          label="付款账号"
          width="260">
          <template slot-scope="scope">
            {{scope.row.paymentAccount ? formatCardNum(scope.row.paymentAccount) : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="approvalAmount"
          label="审批金额">
          <template slot-scope="scope">
            {{scope.row.approvalAmount ? scope.row.approvalAmount : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="remittanceAmount"
          label="汇款金额">
          <template slot-scope="scope">
            {{scope.row.remittanceAmount ? scope.row.remittanceAmount : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="serviceCharge"
          label="手续费"
          sortable>
          <template slot-scope="scope">
            {{scope.row.serviceCharge ? scope.row.serviceCharge : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="collectionAmount"
          label="收款金额"
          sortable>
          <template slot-scope="scope">
            {{scope.row.collectionAmount ? scope.row.collectionAmount : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="remainingSum"
          label="余额"
          width="100"
          sortable>
          <template slot-scope="scope">
            {{scope.row.remainingSum ? scope.row.remainingSum : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="操作日期"
          width="180"
          sortable>
        </el-table-column>
      </el-table>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="审核结果：" :label-width="formLabelWidth" prop="idResultType">
          <el-radio-group v-model="form.idResultType" style="width:100%;">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth" prop="remark">
          <el-input type="textarea" v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="approvalDaily('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/api/daily';
import * as APPROVAL from '@/api/approvalPublicDaily';
import { getUserId, getRole } from '@/utils/auth';
import { formatDate2, formatCardNum } from '@/utils/validate';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data() {
    return {
      idUser: getUserId(),
      idRole: getRole(),
      showUser: false,
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 0,
      code: '',
      tableData: [],
      state: null,
      formLabelWidth: '120',
      dialogFormVisible: false,
      form: {
        idPublicDaily: null,
        idResultType: 2,
        remark: null,
        idUser: null
      },
      rules: {
        idResultType: [
          { required: true, message: '请选择审核结果', trigger: 'blur' },
        ]
      },
      flowRecordDta: [],
      formatCardNum: formatCardNum,
      currentDate: null
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 审批
    approvalDaily(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = {
            idPublicDaily: this.form.idPublicDaily,
            idResultType: this.form.idResultType,
            remark: this.form.remark,
            idUser: getUserId()
          }
          APPROVAL.approvalPublicDaily(param)
          .then(res => {
            if (res.data.status === 200) {
              this.$message.success('审批成功')
              this.dialogFormVisible = false
              this.resetForm('form')
              this.getTableData()
            } else {
              this.$message.error(res.data.cause)
            }
          })
        }
      })
    },
    showApprovalDaily(data) {
      API.getPublicDailyByDate({
        date: formatDate2(data.createTime)
      }).then(res => {
        if (res.data.status === 200) {
          this.flowRecordDta = res.data.datas
          this.form.idPublicDaily = data.idPublicDaily
          this.dialogFormVisible = true
        }
      })
    },
    formatter(row, column) {
      return formatDate2(row.createTime);
    },
    // 获取个人请款记录列表
    getTableData() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        createTime: formatDate2(this.currentDate)
      }
      API.getPublicDailyByPage(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas;
          this.tableData = tmpData.list;
          this.totalPage = tmpData.totalPage;
          this.totalRecord = tmpData.totalRecord;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" >
.el-icon-delete:before {
  color: #8f9fbc !important;
  font-weight: 500;
}
.el-icon-success:before {
  color: #67C23A;
  font-size: 20px;
}
.el-icon-error:before {
  color: red;
  font-size: 20px;
}
.orange-cell {
  color: orange;
  font-weight: bold;
}
.green-cell {
  color:green;
  font-weight: bold;
}
.confirm-text {
  color: red;
  font-size: 12px;
}
.pagination {
  float: right;
  margin: 20px 10px;
}
</style>
