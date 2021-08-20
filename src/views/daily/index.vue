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
                          <input type="text" class="form-control" id="exampleInputText" v-model="state" placeholder="搜索年份或月份">
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
                        <h5 class="font-weight-bold">日报</h5>
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
                                label="操作"
                                width="120">
                                <template slot-scope="scope">
                                  <el-button  size="mini" icon="el-icon-edit" @click="routerLinkToReportDetail(scope.row)"></el-button>
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
  </div>
</template>

<script>
import * as API from '@/api/daily';
import { getUserId, getRole } from '@/utils/auth';
import { formatDate2 } from '@/utils/validate';
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
      state: null
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 路由至月报详情页
    routerLinkToReportDetail(data) {
      this.$router.push({
        path: '/report/reportDetail',
        query: {
          year: data.year,
          month: data.month
        }
      })
    },
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
    formatter(row, column) {
      return formatDate2(row.createTime);
    },
    // 获取个人请款记录列表
    getTableData() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        state: this.state
      }
      API.getDailyList(params)
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
.pagination {
  float: right;
  margin: 20px 10px;
}
</style>
