<template>
    <div class="statistics">
        <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="d-flex flex-wrap align-items-center justify-content-between my-schedule mb-4">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="font-weight-bold">统计分析</h4>
                </div>  
                <div class="create-workform">
                  <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="modal-product-search d-flex">
                      <form class="mr-3 position-relative">
                        <div class="form-group mb-0">
                          <div class="block">
                            <span class="demonstration">年</span>
                            <el-date-picker
                              v-model="year"
                              type="year"
                              value-format="yyyy"
                              placeholder="选择年">
                            </el-date-picker>
                          </div>
                        </div>
                      </form>
                      <el-button type="primary" icon="el-icon-search" @click="initData"></el-button>
                    </div>
                  </div>
                </div>                    
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="card card-block card-stretch" id="card_body">
                    <div class="card-body p-0">
                      <el-row :gutter="12">
                        <el-col :span="8">
                          <el-card shadow="hover">
                            <span>{{collectionAmountTotal}} 元</span>
                            <span>总收入</span>
                          </el-card>
                        </el-col>
                        <el-col :span="8">
                          <el-card shadow="hover">
                            <span>{{payAmountTotal}} 元</span>
                            <span>总支出</span>
                          </el-card>
                        </el-col>
                        <el-col :span="8">
                          <el-card shadow="hover">
                            <span>{{serviceChargeTotal}} 元</span>
                            <span>手续费</span>
                          </el-card>
                        </el-col>
                      </el-row>
                      <div class="chart_card">
                        <div class="_left">
                          <h5>部门年度支出统计</h5>
                          <PayCountChart v-if="paymentChartData.length > 0" :chart-data="paymentChartData" :color-data="colorData"/>
                        </div>
                        <div class="_right">
                          <h5>月收入统计</h5>
                          <CollectionChart v-if="collectionChartData.length > 0" :chart-data="collectionChartData" :color-data="colorData"/>
                        </div>
                      </div>
                      <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                        fixed
                        prop="department"
                        label="部门">
                        </el-table-column>
                        <el-table-column label="（月）收支明细">
                            <el-table-column
                            prop="m1.month"
                            label="1">
                                <el-table-column
                                prop="m1.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m1.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m2.month"
                            label="2">
                                <el-table-column
                                prop="m2.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m2.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m3.month"
                            label="3">
                                <el-table-column
                                prop="m3.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m3.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m4.month"
                            label="4">
                                <el-table-column
                                prop="m4.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m4.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m5.month"
                            label="5">
                                <el-table-column
                                prop="m5.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m5.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m6.month"
                            label="6">
                                <el-table-column
                                prop="m6.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m6.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m7.month"
                            label="7">
                                <el-table-column
                                prop="m7.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m7.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m8.month"
                            label="8">
                                <el-table-column
                                prop="m8.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m8.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m9.month"
                            label="9">
                                <el-table-column
                                prop="m9.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m9.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m10.month"
                            label="10">
                                <el-table-column
                                prop="m10.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m10.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m11.month"
                            label="11">
                                <el-table-column
                                prop="m11.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m11.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
                            <el-table-column
                            prop="m12.month"
                            label="12">
                                <el-table-column
                                prop="m12.amount"
                                label="支出（元）">
                                </el-table-column>
                                <el-table-column
                                prop="m12.serviceCharge"
                                label="手续费（元）">
                                </el-table-column>
                            </el-table-column>
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
</template>

<script>
import * as API from '@/api/flowRecordStatistics';
import PayCountChart from './components/PayCountChart.vue';
import CollectionChart from './components/CollectionChart.vue';

export default {
    components: {
      PayCountChart,
      CollectionChart
    },
    data() {
      return {
        year: '2021',
        idCardType: 3,
        payAmountTotal: 0,
        serviceChargeTotal: 0,
        collectionAmountTotal: 0,
        paymentChartData: [],
        collectionChartData: [],
        colorData: ["#06C7CF", "#3E7EFB", "#987EE2", "#CD5C70", "#E09B6F"],

        tableData: []
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      // 初始化获取统计数据
      initData() {
        this.getDataInfo()
        this.getCollectionRecordByMonth()
        this.getFlowRecordByDepartment()
        this.getPublicFlowRecordDetails()
      },
      // 获取支出流水明细列表
      getPublicFlowRecordDetails() {
        API.getGeneralRecordDetails({
          year: this.year
        }).then(res => {
          if (res.data.status === 200) {
            let tmpData = res.data.datas
            let data = []
            tmpData.forEach(item => {
              const param = {
                department: item.department,
                m1: null,
                m2: null,
                m3: null,
                m4: null,
                m5: null,
                m6: null,
                m7: null,
                m8: null,
                m9: null,
                m10: null,
                m11: null,
                m12: null
              }
              item.data.forEach((_, idx) => {
                switch(idx) {
                  case 0:
                    param.m1 = _
                    break;
                  case 1:
                    param.m2 = _
                    break;
                  case 2:
                    param.m3 = _
                    break;
                  case 3:
                    param.m4 = _
                    break;
                  case 4:
                    param.m5 = _
                    break;
                    case 5:
                    param.m6 = _
                    break;
                    case 6:
                    param.m7 = _
                    break;
                    case 7:
                    param.m8 = _
                    break;
                    case 8:
                    param.m9 = _
                    break;
                    case 9:
                    param.m10 = _
                    break;
                    case 10:
                    param.m11 = _
                    break;
                    case 11:
                    param.m12 = _
                    break;
                }
              })
              data.push(param)
            })
            this.tableData = data
          }
        })
      },
      // 部门支出统计
      getFlowRecordByDepartment() {
        API.getGeneralRecordByDepartment({
          year: this.year
        }).then(res => {
            if (res.data.status === 200) {
            let tmpData = res.data.datas
            const tmpArray = []
            tmpData.forEach(item => {
                const tmpObj = {
                    value: 0,
                    name: ""
                };
                tmpObj.value = item.num
                tmpObj.name = item.department
                tmpArray.push(tmpObj)
            })
            this.paymentChartData = tmpArray
            }
        })
      },
      // 获取年度每月收入统计
      getCollectionRecordByMonth() {
        API.getCollectionRecordByMonth({
          idCardType: this.idCardType,
          year: this.year
        }).then(res => {
          if (res.data.status === 200) {
            let tmpData = res.data.datas
            let array = []
            tmpData.forEach(item => {
              array.push(item.amount)
            })
            let data = {
              name: '收入',
              array: array
            }
            let charData = []
            charData.push(data)
            this.collectionChartData = charData
          }
        })
      },
      // 获取总收支数据
      getDataInfo() {
        API.getDataInfo({
          idCardType: this.idCardType,
          year: this.year
        }).then(res => {
          if (res.data.status === 200) {
            let tmpData = res.data.datas
            this.payAmountTotal = tmpData.payAmount
            this.serviceChargeTotal = tmpData.serviceCharge
            this.collectionAmountTotal = tmpData.collectionAmount
          }
        })
      }
    }
}
</script>

<style scoped>
.el-card span {
  display: block;
}
.el-card span:nth-child(1) {
  color: #606266;
  font-size: 22px;
  font-weight: 600;
}
.chart_card {
  width: 100%;
  height: 280px;
  margin: 10px 0;
  text-align: center;
}
.chart_card ._left,
.chart_card ._right {
  width: 50%;
  height: 280px;
  /* height: calc(100vh - 700px); */
  float: left;
  background-color: #fff;
  box-shadow: 0 10px 30px 0 rgb(0 60 179 / 5%)
}
#card_body {
  background: none;
}
.table_view .el-table {
  padding: 10px 0;
}
h5 {
  color: #213446;
  text-align: left;
  padding: 10px;
}
</style>
