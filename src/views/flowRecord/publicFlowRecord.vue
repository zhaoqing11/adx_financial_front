<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">公账收支明细</h4>
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
                    </div>
                  </div>
                </div>                    
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch">
                    <div class="card-body p-0">
                      <div class="d-flex justify-content-between align-items-center p-3">
                      </div>
                      <div class="table-responsive">
                        <el-table
                            :data="publicRemainSumList"
                            :summary-method="getSummaries"
                            show-summary
                            style="width: 100%"
                            :default-sort = "{prop: 'createTime', order: 'descending'}"
                            >
                            <el-table-column
                                type="selection"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="reasonApplication"
                                label="申请事由"
                                width="180">
                                <template slot-scope="scoped">
                                    {{scoped.row.reasonApplication ? scoped.row.reasonApplication : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="amount"
                                label="申请金额">
                                <template slot-scope="scoped">
                                    {{scoped.row.amount ? scoped.row.amount : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="paymentName"
                                label="付款名称"
                                width="180">
                                <template slot-scope="scoped">
                                    {{scoped.row.paymentName ? scoped.row.paymentName : '--'}}
                                </template>
                                </el-table-column>
                            <el-table-column
                                prop="paymentAccount"
                                label="付款账号"
                                width="180">
                                <template slot-scope="scoped">
                                    {{scoped.row.paymentAccount ? formatCardNum(scoped.row.paymentAccount) : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="code"
                                label="申请单编号"
                                sortable
                                width="150">
                                <template slot-scope="scoped">
                                    {{scoped.row.code ? scoped.row.code : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="approvalAmount"
                                label="审批金额">
                                <template slot-scope="scoped">
                                    {{scoped.row.approvalAmount ? scoped.row.approvalAmount : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="remittanceAmount"
                                label="汇款金额">
                                <template slot-scope="scoped">
                                    {{scoped.row.remittanceAmount ? scoped.row.remittanceAmount : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="serviceCharge"
                                label="手续费">
                                <template slot-scope="scoped">
                                    {{scoped.row.serviceCharge ? scoped.row.serviceCharge : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="idFlowType"
                                label="操作类型">
                                <template slot-scope="scoped">
                                    {{scoped.row.idFlowType === 1? '收入' : '支出'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="collectionAmount"
                                label="收款">
                                <template slot-scope="scoped">
                                    {{scoped.row.collectionAmount ? scoped.row.collectionAmount : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="remainingSum"
                                label="余额"
                                width="120">
                                <template slot-scope="scoped">
                                    {{scoped.row.remainingSum ? scoped.row.remainingSum : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注">
                                <template slot-scope="scoped">
                                    {{scoped.row.remark ? scoped.row.remark : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="汇款日期"
                                width="160"
                                :formatter="formatter">
                            </el-table-column>
                        </el-table>
                      </div>
                      <div class="pagination">
                        <Pagination 
                        v-show="publicTotalPage > 0" 
                        :total="publicTotalPage" 
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
  </div>
</template>

<script>
import * as API from '@/api/paymentForm';
import { getUserId, getRole } from '@/utils/auth';
import { formatDate } from '@/utils/validate';
import Pagination from '@/components/Pagination';
import { formatCardNum } from '@/utils/validate';

export default {
  components: { Pagination },
  data() {
    return {
      idUser: getUserId(),
      idRole: getRole(),
      showUser: false,
      pageNum: 1,
      pageSize: 10,
      publicTotalPage: 1,
      privateTotalPage: 1,
      code: '',
      publicRemainSumList: [],
      privateRemainSumList: [],
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
      tableData: [],
      currentDate: '',
      formatCardNum: formatCardNum
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 计算合计
    getSummaries(param) {
      const { columns, data } = param;

      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总计';
            return;
        }
        if (index === 1 || index === 3 
        || index === 4 || index === 5 
        || index === 9 || index === 11
        || index === 12) {
            sums[index] = '';
            return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
            }, 0);
            sums[index];
        } else {
            sums[index] = 'N/A';
        }
      });
      return sums;
    },
    formatter(row, column) {
      return row.createTime;
    },
    // 获取个人请款记录列表
    getTableData() {
      let startTime = ''
      let endTime = ''
      if (this.currentDate != '' && this.currentDate != null) {
        startTime = formatDate(this.currentDate[0])
        endTime = formatDate(this.currentDate[1])
      }
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        startTime: startTime,
        endTime: endTime
      }
      API.getFlowRecordDetail(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          this.tableData = tmpData.publicRemainSumList.datas
          this.changeToPage()
        }
      })
    },
    // 分页获取流水记录
    changeToPage() {
      this.publicTotalPage = this.tableData.length
      this.publicRemainSumList = JSON.parse(JSON.stringify(this.tableData))
      this.publicRemainSumList = this.publicRemainSumList.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
    }
  }
}
</script>

<style lang="scss" >
.el-icon-delete:before {
  color: #8f9fbc !important;
  font-weight: 500;
}
.orange-cell {
  color: orange;
  font-weight: bold;
}
.green-cell {
  color:green;
  font-weight: bold;
}
.pagination {
  float: right;
  margin: 20px 10px;
}
</style>
