<template>
  <div>
    <div class="wrapper">
      <div class="content-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="custom-tree-container">
                <div class="block">
                  <p>部门列表</p>
                  <el-button type="primary" size="mini" @click="dialogFormVisible = true">添加</el-button>
                  <el-tree
                    :data="tableData"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
                    :render-content="renderContent">
                  </el-tree>
                </div>
              </div>
              <el-dialog :title="title" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form" :rules="rules">
                  <el-form-item label="部门名称" :label-width="formLabelWidth" prop="departmentName">
                    <el-input v-model="form.departmentName" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="form.idDepartment ? update('form') : append('form')">确 定</el-button>
                </div>
              </el-dialog>
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
import * as API from '@/api/department';
import Pagination from '@/components/Pagination';

export default {
  components: { Pagination },
  data() {
    return {
      title: '创建部门',
      dialogFormVisible: false,
      formLabelWidth: '120',
      form: {
        idDepartment: null,
        departmentName: null
      },
      rules: {
        departmentName: [
          { required: true, message: '请填写部门名称', trigger: 'blur' },
        ]
      },
      tableData: []
    }
  },
  mounted() {
    this.getDepartmentList()
  },
  methods: {
    // 创建部门
    append(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          API.addDepartment({
            departmentName: this.form.departmentName
          }).then(res => {
            if (res.data.status === 200) {
              this.dialogFormVisible = false
              this.resetForm('form')
              this.$message.success('创建成功')
              this.getDepartmentList()
            }
          })
        }
      })
    },
    // 修改部门
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          API.updateDepartment({
            idDepartment: this.form.idDepartment,
            departmentName: this.form.departmentName
          }).then(res => {
            if (res.data.status === 200) {
              this.dialogFormVisible = false
              this.resetForm('form')
              this.$message.success('编辑成功')
              this.getDepartmentList()
            }
          })
        }
      })
    },
    clickUpdate(data) {
      this.title = '编辑部门'
      this.form.idDepartment = data.data.id
      this.form.departmentName = data.data.label
      this.dialogFormVisible = true
    },
    // 删除部门
    remove(node, data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        API.deletDepartment({
          idDepartment: data.id
        }).then(res => {
          if (res.data.status === 200) {
            this.$message.success('删除成功');
            this.getDepartmentList();
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    // 渲染视图
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.clickUpdate(node, data) }>&nbsp;&nbsp;修改</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>);
    },
    // 获取部门列表
    getDepartmentList() {
      API.getDepartmentList().then(res => {
        if (res.data.status === 200) {
          let tmpData = res.data.datas
          let data = []
          tmpData.forEach(ele => {
            const param = {
              id: ele.idDepartment,
              label: ele.departmentName
            }
            data.push(param)
          });
          this.tableData = JSON.parse(JSON.stringify(data))
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" >
.el-icon-delete:before,
.el-icon-edit:before {
  color: #8f9fbc !important;
  font-weight: 500;
}
.pagination {
  float: right;
  margin: 20px;
}
.el-icon-success:before {
  color: #67C23A;
  font-size: 20px;
}
.el-icon-error:before {
  color: red;
  font-size: 20px;
}
.el-tree {
  padding: 20px 10px;
}
</style>
