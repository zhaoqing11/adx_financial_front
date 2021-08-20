<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">{{year}}年{{month}}月份收支明细</h4>
                </div>  
                <div class="create-workform">
                  <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="modal-product-search d-flex">
                      <a href="javaScript:void(0);" class="btn btn-primary position-relative d-flex align-items-center justify-content-between" @click="goback()">
                        返回
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
                        <h5 class="font-weight-bold"></h5>
                        <el-button type="success" icon="el-icon-download" circle @click="exportToExcel"></el-button>
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
                                type="index"
                                prop="day"
                                label="日期"
                                width="100">
                                <template slot-scope="scope">
                                  {{(scope.$index + 1) >= tableData.length ? '合计：' : scope.row.day }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="report.lastRemainingSum"
                                label="上日余额">
                            </el-table-column>
                            <el-table-column
                                prop="report.collectionAmount"
                                label="本月收入 ↑">
                            </el-table-column>
                            <el-table-column
                                prop="report.payAmount"
                                label="本月支出 ↓">
                                <template slot-scope="scope">
                                    {{scope.row.report.payAmount ? scope.row.report.payAmount : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="report.serviceCharge"
                                label="手续费"
                                sortable>
                                <template slot-scope="scope">
                                    {{scope.row.report.serviceCharge ? scope.row.report.serviceCharge : '--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                width="120">
                                <template slot-scope="scope">
                                  <span v-if="(scope.$index + 1) < tableData.length">
                                    <i class="el-icon-delete" @click="deleteReport(scope.row.idReport)"></i>
                                  </span>
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
      year: null,
      month: null,
      totalPage: 1,
      totalRecord: 0,
      code: '',
      tableData: [],
      currentDate: null
    }
  },
  mounted() {
    let query = this.$route.query
    this.year = query.year
    this.month = query.month

    this.getTableData()
  },
  methods: {
    // 导出excel
    exportToExcel() {
      API.exportToExcel(this.year, this.month)
    },
    // 删除流水明细
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
    // 获取个人请款记录列表
    getTableData() {
      const params = {
        year: this.year,
        month: this.month
      }
      API.getReportDetailByDay(params)
      .then(res => {
        if (res.data.status === 200) {
          this.tableData = res.data.datas
        }
      })
    },
    goback() {
      this.$router.go(-1)
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