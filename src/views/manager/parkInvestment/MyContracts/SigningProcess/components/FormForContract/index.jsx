import './index.scss'
import { Button, Form, Space } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import BNContainer from '@/components/BNContainer'
import Table from './Table'
import forModuleName from '@/mixins/forModuleName'
import ModalOfChooseContractTemplate from './ModalOfChooseContractTemplate'

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
    data() {
      return this.getState('data', this.moduleName, this.submoduleName)
    },
    contractTemplateSelected() {
      return this.getState('selectedRows', this.moduleName, this.submoduleName) || []
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
    }
  },
  render() {
    console.log(this.contractTemplateSelected)

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
          <span>{this.contractTemplateSelected.length ? this.contractTemplateSelected[0].templateName : ''}</span>
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
        <Space class={'bnm-contract-confirmation-btns'}>
          <Button onClick={this.goBack}>上一步</Button>
          <Button type={'primary'}>预览合同</Button>
        </Space>
        <ModalOfChooseContractTemplate modalTitle={'选择合同模版'} />
      </div>
    )
  }
})
