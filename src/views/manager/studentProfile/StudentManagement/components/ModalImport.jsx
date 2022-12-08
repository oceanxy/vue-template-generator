import '../assets/styles/index.scss'
import { Form, Button, Space, message, Spin, Table, Upload } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import apis from '@/apis'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfImport',
      modalProps: {
        width: 880,
        footer: false,
        title: '全局',
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      resultFile: [],
      defaultPage: true,
      columns: [
        {
          title: '姓名',
          align: 'center',
          scopedSlots: { customRender: 'parameterName' }
        },
        {
          title: '性别',
          align: 'center',
          scopedSlots: { customRender: 'gender' }
        },
        {
          title: '年龄判断条件',
          align: 'center',
          scopedSlots: { customRender: 'ageJudgmentConditions' }
        },
        {
          title: '参数判断条件',
          align: 'center',
          scopedSlots: { customRender: 'paramsJudgmentConditions' },
        }
      ],
    }
  },

  computed: {
    ...mapGetters({ getState: 'getState' }),
    // currentItem() {
    //   return this.getState('currentItem', this.moduleName)
    // },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibleField)
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
    importFile(info) {
      console.log(info)

      if (!info.target.files || info.target.files.length === 0) {
        console.log(1)

        return
      }

      const flie = info.target.files[0]
      const suffix = flie.name.split('.')[1]

      if (suffix !== 'xls' && suffix !== 'xlsx') {
        message.warning('导入的文件可是不正确')

        return
      }

      const reader = new FileReader()

      reader.onload = function (e) {
        const bytes = new Uint8Array(e.target.result)
        const length = bytes.byteLength
        let binary = ''

        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        console.log(binary)
      }
      reader.readAsArrayBuffer(flie)
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
  },
  watch: {
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        {
          this.defaultPage ? (
            <div class='school-upload-file'>
              <Space>
                <input type="file" ref="imFile" style="display: none" onChange={this.importFile} accept="xlsx" />
                <Button type="primary" size="large" onClick={() => this.uploadFile()}>下载模板文件</Button>
                <Button type="primary" size="large" onClick={() => this.downloadTemplate()} ghost>下载模板文件</Button>
              </Space>
              <div class="well" style="margin-top: 40px;">
                <p>1、请先下载模板文件，并在模板文件中编辑好数据后上传；</p>
                <p>2、上传的数据文件支持XLS、XLSX格式；</p>
                <p>3、Excel文件中的数据请勿添加任何格式；</p>
                <p>4、因数据文件需要验证，需持续一段时间，请耐心等待，不要关闭页面；</p>
                <p><span style="color: red">5、警告：此为全量导入！！会覆盖所有数据，请确认数据完整性与正确性，保证每个班级的学生信息完整，确认是整班导入，如有错误数据，请把错误数据改正后选择局部导入</span></p>
              </div>
            </div>
          ) : (
            <div class="school-upload-file">
              <h3>数据共 9 条，成功9 条，失败 0 条！</h3>
              <Spin spinning={this.detailsStatus = false}>
                <Table
                  dataSource={this.infoList}
                  columns={this.columns}
                  rowKey={'id'}
                  bordered
                  {...{
                    scopedSlots: {
                      parameterName: (text, record) => {
                        return (
                          <div>{record.paramName}</div>
                        )
                      },
                      gender: (text, record) => {
                        return (
                          <div>{record.genderStr}</div>
                        )
                      },
                      ageJudgmentConditions: (text, record) => {
                        return (
                          <div>
                            {record.ageLeftValue}&nbsp;
                            {record.ageLeftSymbol === 1 ? '≦' : '<'}&nbsp;
                            年龄&nbsp;
                            {record.ageRightSymbol === 1 ? '≦' : '<'}&nbsp;
                            {record.ageRightValue}
                          </div>
                        )
                      },
                      paramsJudgmentConditions: (text, record) => (
                        <div>
                          {record.conditionLeftValue}&nbsp;
                          {record.conditionLeftSymbol === 1 ? '≦' : '<'}&nbsp;
                          参数&nbsp;
                          {record.conditionRightSymbol === 1 ? '≦' : '<'}&nbsp;
                          {record.conditionRightValue}
                        </div>
                      )
                    }
                  }}
                />
              </Spin>
            </div>
          )
        }


      </DragModal >
    )
  }
})
