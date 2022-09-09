import './index.scss'
import { Button, Form, Space } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import BNContainer from '@/components/BNContainer'
import Table from './Table'
import forModuleName from '@/mixins/forModuleName'
import ModalOfChooseContractTemplate from './ModalOfChooseContractTemplate'
import ModalOfPreviewContract from './ModalOfPreviewContract'
import details from '@/views/manager/basis/Businesses/Details'
import BNUploadFile from '@/components/BNUploadFile'
import apis from '@/apis'

export default Form.create({})({
  name: 'SigningProcess-Contract',
  mixins: [forModuleName(true)],
  data() {
    return {
      // 用户上传的补充条款数据
      supplementaryTermObjs: [],
      // 用户上传的考核报表数据
      checkReportObjs: []
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    },
    data() {
      return this.getState('data', this.moduleName, this.submoduleName)
    },
    contractTemplateSelected: {
      get() {
        return this.getState('selectedRows', this.moduleName, this.submoduleName) || []
      },
      async set(contractTemplate) {
        await this.$store.dispatch('setRowSelected', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          payload: {
            selectedRowKeys: [contractTemplate.id],
            selectedRows: [contractTemplate]
          }
        })
      }
    },
    templateId() {
      return this.getState('selectedRowKeys', this.moduleName, this.submoduleName)[0]
    }
  },
  methods: {
    goBack() {
      this.$store.commit('setDetails', {
        moduleName: this.moduleName,
        merge: true,
        value: { signingStage: 2 }
      })
    },
    async onPreviewContract() {
      if (this.templateId) {
        await this._setVisibleOfModal(
          {},
          'visibleOfPreviewContract',
          this.submoduleName
        )
      }
    },
    getParameters() {
      return {
        id: this.details.id,
        templateId: this.templateId,
        checkReportObjs: this.checkReportObjs.map(item => ({
          fileName: item.name,
          fileSize: item.size,
          fileSuffix: item.name.substring(item.name.indexOf('.')),
          key: item.response?.data[0].key ?? item.key
        })),
        supplementaryTermObjs: this.supplementaryTermObjs.map(item => ({
          fileName: item.name,
          fileSize: item.size,
          fileSuffix: item.name.substring(item.name.indexOf('.')),
          key: item.response?.data[0].key ?? item.key
        }))
      }
    },
    async onPreview() {
      return await apis.getContractPreview(this.getParameters())
    },
    async onSubmit() {
      const response = await apis.step3OfSubmitContract(this.getParameters())

      if (response.status) {
        await this.$store.dispatch('setModalVisible', {
          statusField: 'visibleOfPreviewContract',
          statusValue: false,
          moduleName: this.moduleName,
          submoduleName: this.submoduleName
        })
        await this.$store.dispatch('getDetails', {
          moduleName: this.moduleName,
          payload: { id: this.details.id }
        })
      }
    }
  },
  created() {
    // 回填合同模版ID
    if (this.details.contractTemplateId) {
      this.contractTemplateSelected = {
        id: this.details.contractTemplateId,
        templateName: this.details.contractTemplateName
      }
    }

    // 回填补充条款数据
    if (this.details.supplementaryTermObjs) {
      this.supplementaryTermObjs = this.details.supplementaryTermObjs.map((item, index) => ({
        uid: `supplementaryTerms${index}`,
        url: '',
        key: item.key,
        status: 'done',
        name: item.fileName
      }))
    }

    // 回填考核报表数据
    if (this.details.checkReportObjs) {
      this.checkReportObjs = this.details.checkReportObjs.map((item, index) => ({
        uid: `checkReports${index}`,
        url: '',
        key: item.key,
        status: 'done',
        name: item.fileName
      }))
    }
  },
  render() {
    return (
      <div class={'bnm-contract-confirmation-container'}>
        <BNContainer
          width={'100%'}
          showBoxShadow={false}
          contentClass={'bnm-contract-confirmation-table-wrapper'}
          modalTitle={
            <div class={'bnm-contract-confirmation-title'}>
              {this.data.billName}
              <span>{this.data.roomName}</span>
            </div>
          }
        >
          <Table class={'bnm-contract-confirmation-table'} />
        </BNContainer>
        <BNContainer
          width={'100%'}
          showBoxShadow={false}
          modalTitle={'上传文件'}
        >
          <div class={'bnm-contract-upload-files'}>
            <div class={'item'}>
              考核报表：
              <BNUploadFile
                vModel={this.checkReportObjs}
                limit={1}
                accept={'.pdf'}
                placeholder={'请上传PDF格式文件'}
              />
            </div>
            <div class={'item'}>
              补充条款：
              <BNUploadFile
                vModel={this.supplementaryTermObjs}
                limit={1}
                accept={'.pdf'}
                placeholder={'请上传PDF格式文件'}
              />
            </div>
          </div>
        </BNContainer>
        <BNContainer
          width={'100%'}
          showBoxShadow={false}
          modalTitle={'合同模版'}
        >
          合同模版：
          <span>
            {
              this.contractTemplateSelected.length
                ? this.contractTemplateSelected[0].templateName
                : ''
            }
          </span>
          <Button
            ghost
            type={'primary'}
            onClick={() => this._setVisibleOfModal({}, 'visibleOfChooseContractTemplate', this.submoduleName)}
          >
            {
              this.contractTemplateSelected.length ? '重新选择' : '选择'
            }
          </Button>
        </BNContainer>
        <Space class={'bnm-contract-step-btns'}>
          <Button onClick={this.goBack}>上一步</Button>
          <Button
            type={'primary'}
            onClick={this.onPreviewContract}
            disabled={!this.templateId}
          >
            提交审核
          </Button>
        </Space>
        <ModalOfChooseContractTemplate modalTitle={'选择合同模版'} />
        <ModalOfPreviewContract
          submit={this.onSubmit}
          preview={this.onPreview}
          modalTitle={'合同预览'}
        />
      </div>
    )
  }
})
