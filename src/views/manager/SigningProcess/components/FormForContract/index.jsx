import './index.scss'
import { Button, Form, Radio, Space } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import BNContainer from '@/components/BNContainer'
import Table from './Table'
import forModuleName from '@/mixins/forModuleName'
import ModalOfChooseContractTemplate from './ModalOfChooseContractTemplate'
import ModalOfPreviewContract from './ModalOfPreviewContract'
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
      checkReportObjs: [],
      // 用户上传的合同模板
      customContractTemplate: [],
      // 当前选择的用于提交的合同模版类型 1：选择自定义上传的合同 2：选择系统合同模版
      currentContractTemplateType: 2,
      submitLoading: false
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
    },
    submitDisabled() {
      return !(this.templateId && this.currentContractTemplateType === 2) &&
        !(
          this.customContractTemplate.length &&
          this.customContractTemplate[0].status === 'done' &&
          this.currentContractTemplateType === 1
        )
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

    // 回填自定义上传的合同
    if (this.details.freeTemplateInfo) {
      this.customContractTemplate = [
        {
          uid: 'customContractTemplate',
          url: this.details.freeTemplateInfo.path,
          status: 'done',
          name: this.details.freeTemplateInfo.fileName,
          echo: this.details.freeTemplateInfo
        }
      ]
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
  methods: {
    goBack() {
      this.$store.commit('setDetails', {
        moduleName: this.moduleName,
        merge: true,
        value: { signingStage: 2 }
      })
    },
    async onPreviewContract() {
      if (this.templateId && this.currentContractTemplateType === 2) {
        await this._setVisibleOfModal(
          {},
          'visibleOfPreviewContract',
          this.submoduleName
        )
      }

      if (
        this.customContractTemplate.length &&
        this.customContractTemplate[0].status === 'done' &&
        this.currentContractTemplateType === 1
      ) {
        this.submitLoading = true

        const status = await this.$store.dispatch('custom', {
          payload: this.getParameters(),
          customApiName: 'step3OfSubmitContract',
          closeModalAfterFetched: false
        })

        if (status) {
          await this.$store.dispatch('getDetails', {
            moduleName: this.moduleName,
            payload: { id: this.details.id }
          })
        }

        this.submitLoading = false
      }
    },
    getParameters() {
      const parameters = {
        id: this.details.id,
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

      if (this.currentContractTemplateType === 2) {
        parameters.templateId = this.templateId
      }

      if (this.currentContractTemplateType === 1) {
        parameters.freeTemplateInfo = this.customContractTemplate[0]?.response?.data[0] ??
          this.customContractTemplate[0]?.echo
      }

      return parameters
    },
    async onPreview() {
      return await apis.getContractPreview(this.getParameters())
    },
    async onSubmit() {
      this.submitLoading = true

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

      this.submitLoading = false
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
          <Radio.Group
            class={'bnm-contract-select-template'}
            vModel={this.currentContractTemplateType}
          >
            <Radio
              class={'item'}
              value={2}
            >
              选择系统模版：
              {
                this.contractTemplateSelected.length
                  ? this.contractTemplateSelected[0].templateName
                  : ''
              }
              <Button
                icon={'select'}
                onClick={
                  () => this._setVisibleOfModal(
                    {},
                    'visibleOfChooseContractTemplate',
                    this.submoduleName
                  )
                }
              >
                {this.contractTemplateSelected.length ? '重新选择' : '选 择'}
              </Button>
            </Radio>
            <Radio
              class={'item'}
              value={1}
            >
              上传本地合同：
              <BNUploadFile
                vModel={this.customContractTemplate}
                placeholder={'上传（PDF格式）'}
                limit={1}
                accept={'.pdf'}
              >
                上传自定义合同模版
              </BNUploadFile>
            </Radio>
          </Radio.Group>
        </BNContainer>
        <Space class={'bnm-contract-step-btns'}>
          <Button onClick={this.goBack}>上一步</Button>
          <Button
            loading={this.submitLoading}
            type={'primary'}
            onClick={this.onPreviewContract}
            disabled={this.submitDisabled}
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
