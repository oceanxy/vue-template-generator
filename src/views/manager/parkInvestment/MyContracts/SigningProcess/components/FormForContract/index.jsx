import './index.scss'
import { Button, Form, Space } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import BNContainer from '@/components/BNContainer'
import Table from './Table'
import forModuleName from '@/mixins/forModuleName'
import ModalOfChooseContractTemplate from './ModalOfChooseContractTemplate'
import ModalOfPreviewContract from './ModalOfPreviewContract'
import details from '@/views/manager/basis/Businesses/Details'

export default Form.create({})({
  name: 'SigningProcess-Contract',
  inject: ['moduleName'],
  mixins: [forModuleName(true)],
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getState: 'getState'
    }),
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
        value: {
          signingStage: 2
        }
      })
    },
    async onPreviewContract() {
      if (this.templateId) {
        await this._setVisibleOfModal({}, 'visibleOfPreviewContract', this.submoduleName)
      }
    }
  },
  created() {
    if (this.details.contractTemplateId) {
      this.contractTemplateSelected = {
        id: this.details.contractTemplateId,
        templateName: this.details.contractTemplateName
      }
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
          modalTitle={
            <div>合同模版</div>
          }
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
            预览合同
          </Button>
        </Space>
        <ModalOfChooseContractTemplate modalTitle={'选择合同模版'} />
        <ModalOfPreviewContract modalTitle={'合同预览'} />
      </div>
    )
  }
})
