import '../assets/styles/index.scss'
import { Form, Button, Space, message, Spin, Table, Tag } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import apis from '@/apis'
import { verificationDialog } from '@/utils/message'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibilityFieldName: 'visibilityOfImportSchool',
      modalProps: {
        width: 1300,
        footer: false,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      resultFile: [],
      defaultPage: true,
      columns: [
        {
          title: '学校名称',
          dataIndex: 'fullName'
        },
        {
          title: '办学类型',
          dataIndex: 'schoolType'
        },
        {
          title: '学校编号',
          dataIndex: 'schoolNo'
        },
        {
          title: '办别',
          align: 'center',
          dataIndex: 'category'
        },
        {
          title: '城乡类型',
          align: 'center',
          dataIndex: 'urbanRuralType'
        },
        {
          title: '是否寄宿制',
          align: 'center',
          dataIndex: 'isBoardingSchool'
        },
        {
          title: '是否分校',
          align: 'center',
          dataIndex: 'isBranchSchool'
        },
        {
          title: '是否校幼一体',
          align: 'center',
          dataIndex: 'isContainKindergarten'
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
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName)
        }
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
      const { status, data } = await apis.schoolImportFile(formData)

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
        const status = await apis.schoolImportSuccessData()

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
        fileName: '学校失败数据',
        customApiName: 'schoolDownFailExcel'
      })

      if (status) {
        message.success('导出成功')
      }
    },
    // 下载模板
    async downloadTemplate() {
      const { status, data } = await apis.schoolGetTemplateUrl()

      if (status) {
        this.download(data, '学生数据导入模板V7')
      }


    },
    download(url, name) {
      const a = document.createElement('a')

      a.href = url
      a.download = name
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
      message.success('下载成功')
    }
  },
  watch: {
    visible: {
      async handler(value) {
        if (value) {
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
                <Button type="primary" size="large" onClick={() => this.uploadFile()} loading={this.tablLoading}>上传数据文件</Button>
                <Button type="primary" size="large" onClick={() => this.downloadTemplate()} ghost>下载模板文件</Button>
              </Space>
              <div class="well" style="margin-top: 40px;">
                <p>1、请先下载模板文件，并在模板文件中编辑好数据后上传；</p>
                <p>2、上传的数据文件支持XLS、XLSX格式；</p>
                <p>3、Excel文件中的数据请勿添加任何格式；</p>
                <p>4、因数据文件需要验证，需持续一段时间，请耐心等待，不要关闭页面；</p>
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
                        <Button type="primary" size="large" disabled={this.tableData.successSize === 0} onClick={() => this.onSubmit()}>确认导入{this.tableData.successSize}条全部数据</Button>
                        <Button type="primary" size="large" ghost onClick={this.reUpload}>重新上传</Button>
                      </Space>
                    </div>
                  </Spin>
                ) : (
                  <div class="import-succeeded">
                    <h2 style={{ 'margin-bottom': '10px' }}>数据正在导入，请耐心等待几分钟后查看</h2>
                    <p>我们建议您核实校验失败数据并修正后再次导入</p>
                    <Button type="link" onClick={() => this.downloadErrorData()}>下载失败数据{this.tableData.failSize}条</Button>
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
