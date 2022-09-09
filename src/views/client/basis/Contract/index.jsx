import './index.scss'
import BNContainer from '@/components/BNContainer'
import preview from './assets/images/preview.svg'
import download from './assets/images/download.svg'
import renew from './assets/images/renew.svg'
import terminateContract from './assets/images/terminateContract.svg'
import { Button, Descriptions, Icon, Space, Spin, Alert } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'
import ApplySigningDialog from './components/ApplySigningDialog'

export default {
  name: 'Contract',
  mixins: [dynamicState()],
  computed: {
    loading () {
      return this.$store.state[this.moduleName].loading
    },
    list () {
      return this.$store.state[this.moduleName].list
    },
    applyType () {
      return this.$store.state[this.moduleName].applyType
    }
  },
  created () {
    dispatch(this.moduleName, 'getContracts')
  },
  methods: {
    getContractPreview (item) {
      window.open(item.contractUrl)
    },
    setVisibleOfModal (item, value) {
      this.$store.commit(`${this.moduleName}/setApplyType`, value)
      this._setVisibleOfModal(item, 'visibleOfSigning')
    },
    async onDownload (item) {
      const buffer = await dispatch(this.moduleName, 'getContractPreview', { id: item.id })
      const blob = new Blob([buffer], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      window.open(url)
      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 1000)
    }
  },
  watch: {},
  render () {
    const previewBtn = item => (
      <Button type="primary" ghost class="preview" onclick={() => this.getContractPreview(item)}>
        <Icon component={preview} />
        合同预览
      </Button>
    )
    const downloadBtn = item => (
      <Button type="primary" ghost class="preview" onclick={() => this.onDownload(item)}>
        <Icon component={download} />
        合同下载
      </Button>
    )
    const renewBtn = item => (
      <Button type="primary" ghost class="preview" onclick={() => this.setVisibleOfModal(item, 1)}>
        <Icon component={renew} />
        我要续约
      </Button>
    )
    const terminateContractBtn = item => (
      <Button type="primary" ghost class="preview" onclick={() => this.setVisibleOfModal(item, 2)}>
        <Icon component={terminateContract} width="0.5em" />
        申请解约
      </Button>
    )
    const addBtns = item => {
      let result = []

      switch (item.signingStatus) {
        case 2: //待审核
          result = [previewBtn(item), downloadBtn(item)]
          break
        case 3: //已签约
          result = [previewBtn(item), downloadBtn(item), renewBtn(item), terminateContractBtn(item)]
          break
        case 4: //审核驳回
          result = [previewBtn(item), downloadBtn(item)]
          break
        case 5: //解约申请
          result = [previewBtn(item), downloadBtn(item), terminateContractBtn(item)]
          break
        case 6: //已解约
          result = [previewBtn(item), downloadBtn(item)]
          break
        case 7: //待签约
          result = [previewBtn(item), downloadBtn(item)]
          break
        case 8: //续约申请中
          result = [previewBtn(item), downloadBtn(item)]
          break
        case 9: //已到期
          result = [previewBtn(item), downloadBtn(item), terminateContractBtn(item)]
          break
        case 10: //已签约
          result = [previewBtn(item), downloadBtn(item), renewBtn(item), terminateContractBtn(item)]
          break
        default:
          break
      }

      return result
    }

    return (
      <BNContainer width="100%" modalTitle="我的合同" contentClass="bn-contract-content">
        <Spin spinning={this.loading}></Spin>
        {this.list.map(item => (
          <BNContainer
            modalTitle={item.companyName}
            class="contract-item"
            titleClass="contract-item-title"
            contentClass="contract-item-content">
            <Descriptions column={1}>
              {item.list.map(item2 => (
                <Descriptions.Item label={item2.name}>{item2.value}</Descriptions.Item>
              ))}
              <Descriptions.Item class="contract-iten-tip">
                <Alert message={item.specialTip} type="warning" show-icon >
                  <Icon slot='icon' type="hourglass" />
                </Alert>
              </Descriptions.Item>
              <Descriptions.Item>
                <Space>{addBtns(item)}</Space>
              </Descriptions.Item>
            </Descriptions>
          </BNContainer>
        ))}
        <ApplySigningDialog
          modalTitle={`我要${this.applyType === 1 ? '续约' : '解约'}`}
          applyType={this.applyType}></ApplySigningDialog>
      </BNContainer>
    )
  }
}
