import '../assets/styles/index.scss'
import { Form, Button, Space, message, Spin, Table } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import apis from '@/apis'
import { verificationDialog } from '@/utils/message'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibilityFieldName: 'visibilityOfImport',
      modalProps: {
        width: 1300,
        footer: false,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      resultFile: [],
      defaultPage: true,
      columns: [
        {
          title: '姓名',
          align: 'center',
          dataIndex: 'fullName'
        },
        {
          title: '身份证号',
          dataIndex: 'idNumber'
        },
        {
          title: '就读学校',
          dataIndex: 'schoolName'
        },
        {
          title: '年级',
          dataIndex: 'gradeId'
        },
        {
          title: '班级',
          align: 'center',
          dataIndex: 'classNumber'
        },
        {
          title: '民族',
          dataIndex: 'nation'
        },
        {
          title: '籍贯',
          dataIndex: 'nativePlace'
        },
        {
          title: '学籍号',
          dataIndex: 'studentNumber'
        },
        {
          title: '学籍所在学校',
          dataIndex: 'originalSchoolId'
        },
        {
          title: '家长姓名',
          dataIndex: 'parentName'
        },
        {
          title: '家长电话',
          dataIndex: 'parentPhone'
        },
        {
          title: '失败信息',
          scopedSlots: { customRender: 'errRemark' }
        }
      ],
      tablLoading: false,
      importSucceeded: true,
      tableData: [],
      newTableData: []
    }
  },

  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: { cancel: () => this.onCancel(this.visibilityFieldName) }
      }
    }
  },
  methods: {
    // 上传文件
    async uploadFile() {
      const imFile = this.$refs.imFile

      imFile.click()

    },
    async importFile(info) {
      if (!info.target.files || info.target.files.length === 0) {
        return
      }

      const flie = info.target.files[0]
      const suffix = flie.name.split('.')[1]

      if (suffix !== 'xls' && suffix !== 'xlsx') {
        message.warning('导入的文件可是不正确')

        return
      }

      this.tablLoading = true
      const formData = new FormData()

      formData.append('file', flie)
      const { status, data } = await apis.studentImportFile(formData)

      if (status) {
        this.tableData = data
        this.newTableData = data.allData.map((item, index) => {
          item.id = index

          return item
        })

        this.tablLoading = false
        this.defaultPage = false
      }

      this.$refs.imFile.value = ''

    },
    // 确认无误，提交
    onSubmit() {
      verificationDialog(async () => {
        let status = false

        if (this.currentItem && this.currentItem.type === 'whole') {
          status = await apis.importSuccessData()
        } else if (this.currentItem && this.currentItem.type === 'local') {
          status = await apis.importSuccessSingeData()
        }

        if (status) {
          this.tablLoading = true
          setTimeout(() => {
            this.tablLoading = false
            this.importSucceeded = false
          }, 3000)
        }

        return status
      }, `成功${this.tableData.successSize}条，失败${this.tableData.failSize}条，是否导入？`)
    },
    reUpload() {
      this.defaultPage = true
      this.newTableData = []
    },
    // 下载错误数据
    async downloadErrorData() {
      const { status } = await this.$store.dispatch('export', {
        moduleName: this.moduleName,
        fileName: '学生失败数据',
        customApiName: 'exportDownErrorFailExcel'
      })

      if (status) {
        message.success('导出成功')
      }
    },
    // 下载模板
    async downloadTemplate() {
      const { status, data } = await apis.getTemplateUrl()

      if (status) {
        const a = document.createElement('a')

        a.href = data
        a.download = '学生数据导入模板V7'
        a.style.display = 'none'
        document.body.appendChild(a)
        a.click()
        a.remove()
        message.success('下载成功')
      }
    }
    // async downloadTemplate() {
    //   const { status, data } = await apis.getTemplateUrl()

    //   if (status) {
    //     const link = new XMLHttpRequest()

    //     link.open('GET', data, true)
    //     link.responseType = 'blob'
    //     link.onload = function (e) {
    //       const url = window.URL.createObjectURL(link.response)
    //       const a = document.createElement('a')

    //       a.href = url
    //       a.download = '学生数据导入模板V7'
    //       a.style.display = 'none'
    //       document.body.appendChild(a)
    //       a.click()
    //       a.remove()
    //       message.success('下载成功')

    //     }
    //     link.send()
    //   }
    // }
  },
  watch: {
    visible: {
      async handler(value) {
        if (value) {
          this.modalProps.title = (this.$parent.$attrs.modalTitle || this.modalTitle).replace(
            '{action}', this.currentItem.type === 'whole' ? '全局' : '局部'
          )
          this.reUpload()
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        {
          this.defaultPage ? (
            <div class='school-upload-file'>
              <Space>
                <input type="file" ref="imFile" style="display: none" onChange={this.importFile} accept="xlsx" />
                <Button type="primary" size="large" onClick={() => this.uploadFile()} loading={this.tablLoading}>
                  上传数据文件</Button>
                <Button type="primary" size="large" onClick={() => this.downloadTemplate()} ghost>下载模板文件</Button>
              </Space>
              <div class="well" style="margin-top: 40px;">
                <p>1、请先下载模板文件，并在模板文件中编辑好数据后上传；</p>
                <p>2、上传的数据文件支持XLS、XLSX格式；</p>
                <p>3、Excel文件中的数据请勿添加任何格式；</p>
                <p>4、因数据文件需要验证，需持续一段时间，请耐心等待，不要关闭页面；</p>
                {
                  this.currentItem?.type === 'whole' ? (
                    <p><span style="color: red">5、警告：此为全量导入！！会覆盖所有数据，请确认数据完整性
                      与正确性，保证每个班级的学生信息完整，确认是整班导入，如有错误数据，请把错误数据改正后选择局部导入</span></p>
                  ) : (
                    <p><span style="color: red">5、此为局部导入：只用于局部学生信息变更和新增，上传修正后的错误数据等局部功能</span></p>
                  )
                }

              </div>
            </div>
          ) : (
            <div class="school-upload-file">
              {
                this.importSucceeded ? (
                  <Spin spinning={this.tablLoading}>
                    <h3>
                      <Space>
                        数据共
                        <span>{this.tableData.allData.length}</span>条，成功
                        <span class="success">{this.tableData.successSize}</span> 条，失败
                        <span class="fail">{this.tableData.failSize}</span>
                        条！
                      </Space>
                      <Button onClick={() => this.downloadErrorData()}>下载失败数据{this.tableData.failSize}条</Button>
                    </h3>
                    <Table
                      dataSource={this.newTableData}
                      columns={this.columns}
                      rowKey={'id'}
                      bordered
                      {...{
                        scopedSlots: {
                          errRemark: (text, record) => {
                            return (
                              <div style={{ color: 'red' }}>{record.errRemark}</div>
                            )
                          }
                        }
                      }}
                    />
                    <br />
                    <div style={{ 'text-align': 'right' }}>
                      <Space>
                        <Button
                          type="primary"
                          size="large"
                          disabled={this.tableData.successSize === 0}
                          onClick={() => this.onSubmit()}>
                          确认导入{this.tableData.successSize}条全部数据
                        </Button>
                        <Button type="primary" size="large" ghost onClick={this.reUpload}>重新上传</Button>
                      </Space>
                    </div>
                  </Spin>
                ) : (
                  <div class="import-succeeded">
                    <h2 style={{ 'margin-bottom': '10px' }}>数据正在导入，请耐心等待几分钟后查看</h2>
                    <p>我们建议您核实校验失败数据并修正后再次导入</p>
                    <Button type="link" onClick={() => this.downloadErrorData()}>
                      下载失败数据{this.tableData.failSize}条
                    </Button>
                    <br />
                    <br />
                    <Button type="primary" ghost onClick={() => this.onCancel(this.visibilityFieldName)}>关闭</Button>
                  </div>
                )
              }

            </div>
          )
        }


      </DragModal >
    )
  }
})
