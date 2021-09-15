<template>
  <div>
    <div class="wrapper">
      <van-notice-bar
        v-if="showPrompt"
        :scrollable="false"
        :text="promptText"
      />
      <van-divider contentPosition="left">基础信息（必填）</van-divider>
      <van-cell-group>
        <van-field
          :disabled="type == 'view'"
          v-model="paymentForm.cardTypeName"
          label="类型"
          placeholder="请选择类型"
          :border="false"
          @click="clickShowType"
        />
        <van-field
          :disabled="isDisabled"
          v-model="paymentForm.reasonApplication"
          label="事由"
          type="textarea"
          placeholder="请输入事由"
          :border="false"
        />
        <van-field
          :disabled="isDisabled"
          v-model="paymentForm.amount"
          label="申请金额"
          type="number"
          placeholder="请输入申请金额"
          :border="false"
        />
        <van-field
          :disabled="isDisabled"
          v-model="paymentForm.paymentName"
          label="付款名称"
          placeholder="请输入付款名称"
          :border="false"
        />
        <van-field
          :disabled="isDisabled"
          v-model="paymentForm.paymentAccount"
          type="digit"
          label="付款账号"
          placeholder="请输入付款账号"
          :border="false"
        />
      </van-cell-group>
      <van-divider contentPosition="left">上传附件</van-divider>
      <van-row>
        <van-col span="24">
          <van-uploader
          v-if="type == 'add' || type == 'edit'"
          v-model="fileList"
          :multiple="true"
          :deletable="true"
          :max-count="3"
          :after-read="afterRead"
          @delete="deleteFile"/>
          <van-uploader
          v-else
          :file-list="fileList"
          :capture="capture"
          :show-upload="false"
          :deletable="false"/>
        </van-col>
      </van-row>
      <br/>
      <div class="button_group" v-if="!isDisabled">
        <van-button type="info" size="large" @click="addPaymentForm(2)">提 交</van-button>
        <van-button type="warning" size="large" @click="addPaymentForm(1)">保 存</van-button>
        <van-button size="large" @click="goback">取 消</van-button>
      </div>
      <van-action-sheet
        v-model="show"
        :actions="cardTypeData"
        cancel-text="取消"
        @select="selectCardType"
      />
    </div>
    <div class="_approval" v-if="type == 'view' && isDisabled">
      <div v-if="paymentForm.state != 1">
        <van-divider contentPosition="left">汇款进度</van-divider>
        <van-steps
          :active="active"
          active-icon="success"
          active-color="#38f">
          <van-step v-for="(item,index) in processTable" :key="index">{{item.caseName}}</van-step>
        </van-steps>
      </div>
    </div>
    <van-button size="large" style="width:100%;" @click="goback" v-if="type == 'view'">返 回</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant';
import * as API from '@/api/paymentForm';
import * as APPROVAL from '@/api/approval';
import * as REMITTANCE from '@/api/paymentRemittance';
import * as CTYPE from '@/api/cardType';
import * as DAILY from '@/api/daily';
import { getUserId, getToken } from '@/utils/auth';
import Pagination from '@/components/Pagination';
import PreviewImage from "@/components/PreviewImage"
import { isEmpty } from '@/utils/validate';

export default {
  components: { PreviewImage, Pagination },
  data() {
    return {
      idUser: getUserId(),
      paymentForm: {
        idPaymentForm: null,
        idApproval: null,
        idCardType: null,
        cardTypeName: '',
        reasonApplication: null,
        amount: null,
        paymentName: null,
        paymentAccount: null,
        files: null,
        idUser: null,
        state: null
      },
      cardTypeData: [],
      isDisabled: false,
      promptText: '上日账单尚未通过审核，暂时无法创建请款申请',
      fileList: [],
      processTable: [],
      processName: null,
      show: false,
      showPrompt: false,
      type: null,
      state: null,
      idApproval: null,
      idPaymentForm: null,
      active: 0,

      capture: ['album'],
      imageUrl: [],
      baseURL: ''
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
    let query = this.$route.query
    this.type = query.type
    this.state = query.state
    this.idApproval = query.idApproval
    this.idPaymentForm = query.idPaymentForm

    this.getCardTypeList()
    if (this.type == 'view' || this.type == 'edit') {
      this.clickPreview(query.type, query.state, query.idApproval, query.idPaymentForm)
    }
    this.getPaymentFormByState()
  },
  methods: {
    // 删除文件
    deleteFile(file) {
      // let delIdx = this.fileList.findIndex(key => {
      //   return key.id === file.id
      // })
      // this.fileList.splice(delIdx, 1)
      let id = this.imageUrl.findIndex(key => {
        return key.fileId === file.id
      })
      this.imageUrl.splice(id, 1)
    },
    // 文件上传
    afterRead(event) {
      if (this.fileList.length >= 3) {
        Toast.fail('上传文件不得超过3个');
        return false;
      }
      Toast.loading({
        message: '上传中...',
        forbidClick: true,
      });
      const file = new FormData();
      if (event.length > 0) {
        for (const i in event) {
          if (event[i].file) {
            file.append("file", event[i].file);
          }
        }
      } else {
        file.append("file", event.file);
      }
      
      this.axios.post(process.env.VUE_APP_BASE_API + `/file/upload`, file) // this.baseURL
      .then(res => {
        let tmpData = res.data.datas;
        this.imageUrl.push(tmpData);
      })
    },
    clickShowType() {
      if (this.type != 'view') {
        this.show = true
      }
    },
    // 返回
    goback() {
      this.$router.go(-1)
    },
    // 获取选中账号类型
    selectCardType(event) {
      this.paymentForm.idCardType = event.idCardType
      this.paymentForm.cardTypeName = event.name
      this.show = false
      this.changeSelectOption()
    },
    changeSelectOption() {
      DAILY.selectIsExitUnApprovalDaily({
        idCardType: this.paymentForm.idCardType
      }).then(res => {
        if (res.data.status === 200) {
          if (res.data.datas >= 1) {
            this.isDisabled = true
            this.showPrompt = true
          } else {
            this.isDisabled = false
            this.showPrompt = false
          }
        }
      })
    },
    // 查看详情
    clickPreview(type, state, idApproval, idPaymentForm) {
      this.selectPaymentFormById(idPaymentForm)
      if (idApproval != null) {
        this.selectApprovalInfo(idApproval, idPaymentForm)
      }

      if (type === 'view') {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    // 查看申请详情
    selectPaymentFormById(id) {
      API.selectPaymentFormById({
        idPaymentForm: id
      }).then(res => {
        if (res.data.status === 200) {
          this.paymentForm = res.data.datas
          this.paymentForm.cardTypeName = this.cardTypeData[this.paymentForm.idCardType - 1].name
          this.fileList = this.paymentForm.files != null ? JSON.parse(this.paymentForm.files) : []
          this.imageUrl = JSON.parse(JSON.stringify(this.fileList))
          this.fileList.forEach((item, idx) => {
            let param = {
              id: item.fileId,
              url: process.env.VUE_APP_BASE_API + `/file/get/` + item.fileId,
              name: item.fileName
            }
            this.fileList[idx] = param
          })
        }
      })
    },
    checkFormValue() {
      let form = this.paymentForm
      if (!isEmpty(form.idCardType)) {
        Toast.fail('请选择账目类型')
        return false
      } else if (!isEmpty(form.reasonApplication)) {
        Toast.fail('请填写申请事由')
        return false
      } else if (!isEmpty(form.amount)) {
        Toast.fail('请填写申请金额')
        return false
      } else if (!isEmpty(form.paymentName)) {
        Toast.fail('请填写付款名称')
        return false
      } else if (!isEmpty(form.paymentAccount)) {
        Toast.fail('请填写付款账号')
        return false
      }
      return true
    },
    // 创建申请单
    addPaymentForm(state) {
      let valid  = this.checkFormValue()
      if (valid) {
        if (this.fileList.length > 0) {
          this.paymentForm.files = JSON.stringify(this.imageUrl)
        }
        this.paymentForm.paymentAccount = this.paymentForm.paymentAccount.replaceAll('-', '')
        let idPaymentForm = this.paymentForm.idPaymentForm != null ? this.paymentForm.idPaymentForm : null
        const param = {
          idPaymentForm: this.paymentForm.idPaymentForm,
          idApproval: this.paymentForm.idApproval,
          idCardType: this.paymentForm.idCardType,
          reasonApplication: this.paymentForm.reasonApplication,
          amount: this.paymentForm.amount,
          paymentName: this.paymentForm.paymentName,
          paymentAccount: this.paymentForm.paymentAccount,
          files: this.paymentForm.files,
          state: state,
          idUser: this.idUser
        }
        API.addPaymentForm(param).then(res => {
          if (res.data.status === 200) {
            Toast.success('操作成功')
            if (state == 2) {
              this.resetForm()
              this.fileList = []
              this.$router.push('/mobile/index')
            }
          } else {
            Toast.fail(res.data.cause)
          }
        })
      }
    },
    // 获取审批流信息
    selectApprovalInfo(idApproval, idPaymentForm) {
      this.processTable = []
      APPROVAL.selectApprovalInfo({
        idApproval: idApproval
      }).then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          let len = tmpData.list.length
          this.processTable.push(tmpData.list[len - 2])
          this.processTable.push(tmpData.list[len - 1])
          this.processName = tmpData.name

          this.processTable.forEach(item => {
            if (item.idCheckResult == 1) {
              this.active = this.active + 1
            }
          })
          this.getRemittanceByIdPamentForm(idPaymentForm)
        }
      })
    },
    // 根据请款id获取汇款记录
    getRemittanceByIdPamentForm(idPaymentForm) {
      REMITTANCE.getRemittanceByIdPamentForm({
        idPaymentForm: idPaymentForm
      }).then(res => {
        if (res.data.status === 200) {
          let idCheckResult = res.data.datas > 0 ? 1 : null
          let param = {
            caseName: '业务部门汇款',
            idCheckResult: idCheckResult
          }
          this.processTable.push(param)
        }
      })
    },
    // 获取草稿项目
    getPaymentFormByState() {
      API.getPaymentFormByState({
        idUser: this.idUser
      }).then(res => {
        if (res.data.status === 200) {
          if (res.data.datas != null) {
            this.paymentForm = res.data.datas
            this.paymentForm.cardTypeName = this.cardTypeData[this.paymentForm.idCardType - 1].name
          }
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
    resetForm() {
      this.paymentForm.idPaymentForm = null
      this.paymentForm.idApproval = null
      this.paymentForm.idCardType = null
      this.paymentForm.cardTypeName = null
      this.paymentForm.reasonApplication = null
      this.paymentForm.amount = null
      this.paymentForm.paymentName = null
      this.paymentForm.paymentAccount = null
      this.paymentForm.files = null
      this.paymentForm.idUser = null
      this.paymentForm.state = null
    },
    // 格式化卡号显示，每4位加-
    blurFormatCardNumber (cardNum) {
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

<style lang="scss" scoped>
.promptText {
  color: red;
  font-size: 22px;
}
.van-row {
  text-align: center;
  background-color:#fff;
}
.van-uploader {
  margin: 10px;
}
.van-button {
  width: 95%;
}
.button_group {
  text-align: center;
}
</style>