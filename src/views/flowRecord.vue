<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">收支明细</h4>
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
                      <!-- <a href="javaScript:void(0);" class="btn btn-primary position-relative d-flex align-items-center justify-content-between" @click="dialogFormVisible = true">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                          添加申请
                      </a> -->
                    </div>
                  </div>
                </div>                    
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch">
                    <div class="card-body p-0">
                      <div class="d-flex justify-content-between align-items-center p-3">
                        <h5 class="font-weight-bold">收支明细</h5>
                        <!-- <button class="btn btn-secondary btn-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="mr-1" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                            导 出
                        </button> -->
                      </div>
                      <div class="table-responsive">
                        <!-- <table class="table data-table mb-0">
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
                              <th scope="col" class="dates">
                                <label class="text-muted mb-0" >申请事由</label>
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
                                <label class="text-muted mb-0" >申请单编号</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >审批金额</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >汇款金额</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >手续费</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >收入(元)</label>
                              </th>
                              <th scope="col">
                                <label class="text-muted mb-0" >余额(元)</label>
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
                              <td>{{item.reasonApplication ? item.reasonApplication : '--'}}</td>
                              <td>{{item.amount ? item.amount : '--'}}</td>
                              <td class="text-right">{{item.paymentName ? item.paymentName : '--'}}</td>
                              <td>{{item.paymentAccount ? item.paymentAccount : '--'}}</td>
                              <td>{{item.code ? item.code : '--'}}</td>
                              <td>{{item.approvalAmount ? item.approvalAmount : '--'}}</td>
                              <td>{{item.remittanceAmount ? item.remittanceAmount : '--'}}</td>
                              <td>{{item.serviceCharge ? item.serviceCharge : '--'}}</td>
                              <td>{{item.collectionAmount ? item.collectionAmount : '--'}}</td>
                              <td>{{item.remainingSum ? item.remainingSum : '--'}}</td>
                            </tr>
                          </tbody>
                        </table> -->
                        <el-table
                            :data="tableData"
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
                                    {{scoped.row.paymentAccount ? scoped.row.paymentAccount : '--'}}
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
                                label="余额">
                                <template slot-scope="scoped">
                                    {{scoped.row.remainingSum ? scoped.row.remainingSum : '--'}}
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
  </div>
</template>

<script>
import * as API from '@/api/paymentForm';
import { getUserId, getRole } from '@/utils/auth';

export default {
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
      tableData: []
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;

      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总价';
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
    //   const params = {
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize,
    //     code: this.code
    //   } 
      API.getFlowRecordDetail()
      .then(res => {
        if (res.data.status === 200) {
            this.tableData = res.data.datas;
        //   let tmpData = res.data.datas;
        //   this.tableData = tmpData.list;
        //   this.totalPage = tmpData.totalPage;
        //   this.totalRecord = tmpData.totalRecord;
        }
      })
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
</style>
