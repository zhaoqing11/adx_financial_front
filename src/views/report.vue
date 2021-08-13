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
                          <input type="text" class="form-control" id="exampleInputText" v-model="currentDate" placeholder="搜索年份或月份">
                          <a class="search-link" href="javaScript:void(0);" @click="getTableData">
                            <svg xmlns="http://www.w3.org/2000/svg" class="" width="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </a>
                          <p class="confirm-text">* 提示：年分格式（2019 / 2020...），月份格式（1/2/...）</p>
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
                                prop="year"
                                label="年份">
                            </el-table-column>
                            <el-table-column
                                prop="month"
                                label="月份">
                            </el-table-column>
                            <el-table-column
                                prop="collectionAmount"
                                label="本月收入">
                                <template slot-scope="scope">
                                    {{scope.row.collectionAmount ? scope.row.collectionAmount : '--'}}
                                </template>
                                </el-table-column>
                            <el-table-column
                                prop="payAmount"
                                label="本月支出">
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
                                prop="createTime"
                                label="创建日期"
                                width="160"
                                :formatter="formatter">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="120">
                                <template slot-scope="scope">
                                  <i class="el-icon-view"></i>&nbsp;&nbsp;
                                  <i class="el-icon-delete" @click="deleteReport(scope.row.idReport)"></i>
                                </template>
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
import * as API from '@/api/report';
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
      tableData: [],
      currentDate: null
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 删除月报
    deleteReport(idReport) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        API.deleteReport({
          idReport: idReport
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
    // 计算合计
    getSummaries(param) {
      const { columns, data } = param;

      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总计';
            return;
        }
        if (index === 1 || index === 2
        || index === 6 || index === 7) {
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
            sums[index] += '￥';
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
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        currentDate: this.currentDate
      }
      API.getReportList(params)
      .then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas;
          this.tableData = tmpData.list;
          this.totalPage = tmpData.totalPage;
          this.totalRecord = tmpData.totalRecord;
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
.confirm-text {
  color: red;
  font-size: 12px;
}
</style>
