<template>
  <div>
    <div class="wrapper">
      <van-search v-model="code" placeholder="搜索申请单编号" @search="getTableData"/>
      <van-cell-group>
        <van-cell :title="item.code" is-link v-for="(item,index) in tableData" :key="index" @click="clickItemValue(item)"/>
      </van-cell-group>
      <van-popup
        v-model="show"
        round
        position="bottom"
        custom-style="height: 20%"
      >
        <div class="form_action" @click="routerLinkToAddPaymentForm('view')">
          <span id="view-btn"><van-icon name="eye-o"/></span>
          <span>查看</span>
        </div>
        <div class="form_action"  @click="routerLinkToAddPaymentForm('edit')">
          <span id="edit-btn"><van-icon name="edit"/></span>
          <span>编辑</span>
        </div>
        <div class="form_action" @click="clickReset">
          <span id="revoke-btn"><van-icon name="revoke"/></span>
          <span>撤回</span>
        </div>
        <div class="form_action" @click="deletePaymentForm">
          <span id="del-btn"><van-icon name="delete-o"/></span>
          <span>删除</span>
        </div>
        <van-button type="info" size="large" @click="show = false">取 消</van-button>
      </van-popup>
      <van-button class="create_pay_form" icon="plus" type="info" size="large" @click="routerLinkToAddPaymentForm('add')">创建申请</van-button>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import * as API from '@/api/paymentForm';
import * as REMITTANCE from '@/api/paymentRemittance';
import { getUserId } from '@/utils/auth';
import Pagination from '@/components/Pagination';
import PreviewImage from "@/components/PreviewImage"

export default {
  components: { PreviewImage, Pagination, Dialog },
  data() {
    return {
      idUser: getUserId(),
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      totalRecord: 0,
      code: '',
      tableData: [],
      paymentForm: {
        idPaymentForm: null,
        idApproval: null,
        idCardType: null,
        reasonApplication: null,
        amount: null,
        paymentName: null,
        paymentAccount: null,
        files: null,
        idUser: null,
        state: null
      },
      show: false
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 路由至创建请款页面
    routerLinkToAddPaymentForm(type) {
      if (type == 'edit') {
        if (this.paymentForm.state == 2) {
          this.show = false
          Toast('无法编辑，数据正在审核中')
          return false
        } else if (this.paymentForm.state == 3) {
          this.show = false
          Toast('无法编辑，申请已通过审核')
          return false
        }
      }
      this.$router.push({
        path: '/mobile/addPaymentForm',
        query: {
          type: type,
          state: this.paymentForm.state,
          idApproval: this.paymentForm.idApproval,
          idPaymentForm: this.paymentForm.idPaymentForm
        }
      })
    },
    clickItemValue(data) {
      this.paymentForm = data
      this.show = true
    }, 
    // 删除请款单
    deletePaymentForm() {
      this.show = false
      REMITTANCE.getRemittanceByIdPamentForm({
        idPaymentForm: this.paymentForm.idPaymentForm
      }).then(res => {
        if (res.data.status === 200) {
          if (res.data.datas > 0) {
            Toast.fail('此申请已完成汇款，无法删除请款记录')
          } else {
            Dialog.confirm({
              title: '提示',
              message: '此操作将永久删除该数据, 是否继续?',
            }).then(() => {
              API.delPaymentForm({
                idPaymentForm: this.paymentForm.idPaymentForm
              }).then(res => {
                if (res.data.status === 200) {
                  Toast.success('删除成功')
                  this.getTableData()
                }
              })
            }).catch(() => {
              Toast('已取消删除')
            });
          }
        }
      })
    },
    // 撤回
    clickReset() {
      this.show = false
      let form = this.paymentForm
      if (form.state != 2) {
        Toast('无法撤回，申请已进入审核阶段')
        return false
      }

      Dialog.confirm({
        title: '提示',
        message: '是否确定撤回该申请？',
      }).then(() => {
        let param = {
          idPaymentForm: form.idPaymentForm,
          state: 1
        }
        API.updatePaymentForm(param).then(res => {
          if (res.data.status === 200) {
            Toast.success('撤回成功')
            this.getTableData()
          }
        })
      }).catch(() => {
        Toast('已取消撤回')
      });
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
#green-cell {
  color:green;
  font-weight: bold;
}
#red-cell {
  color: red;
  font-weight: bold;
}
</style>

<style scoped>
.van-popup {
  height: 200px;
  text-align: center;
}
.form_action {
  float: left;
  width: 25%;
}
.form_action span {
  display: block;
  color: #646566;
}
.form_action span:nth-child(1) {
  display: inline-block;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 30px 10px 5px 10px;
  background-color: #f2f3f5;
}
.form_action span:nth-child(2) {
  margin-bottom: 32px;
}
.form_action span i {
  color: #fff;
  line-height: 60px;
  font-size: 26px;
}
.van-button {
  color: #646566;
  border: none;
  box-shadow: 10px 2px 5px 10px #f7f8fa;
}
.van-popup .van-button {
  background-color: #fff;
}
.create_pay_form {
  position: fixed;
  bottom: 0;
  color: #fff;
}
#view-btn {
  background-color: #409EFF;
}
#edit-btn {
  background-color: #E6A23C;
}
#revoke-btn {
  background-color: #DCDFE6;
}
#del-btn {
  background-color: #F56C6C;
}
</style>