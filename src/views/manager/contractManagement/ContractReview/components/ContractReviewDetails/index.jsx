import './index.scss'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'
import { Icon, Space, Spin } from 'ant-design-vue'

export default {
  name: 'ContractReviewDetails',
  mixins: [dynamicState()],
  computed: {
    previewUrl() {
      return this.$store.state[this.moduleName].previewUrl
    },
    message() {
      return this.$store.state[this.moduleName].message
    }
  },
  async mounted() {
    const { cid } = this.$route.query

    await dispatch(this.moduleName, 'getContractPreview', { id: cid })
  },
  destroyed() {
    this.$store.commit('setDetails', {
      value: '',
      moduleName: this.moduleName,
      stateName: 'previewUrl'
    })

    this.$store.commit('setDetails', {
      value: '',
      moduleName: this.moduleName,
      stateName: 'message'
    })
  },
  render() {
    return this.previewUrl
      ? (
        <iframe
          src={this.previewUrl}
          frameBorder="0"
          height="100%"
          scrolling="yes"
          width="100%"
        />
      )
      : (
        <Spin
          spinning={!this.previewUrl && !this.message}
          class={'contract-preview-container'}
        >
          {
            !this.previewUrl && this.message ? (
              <Space class={'contract-preview-hint'}>
                <Icon type={'info-circle'} />
                {this.message || '暂未获取到合同信息'}
              </Space>
            ) : null
          }
        </Spin>
      )
  }
}
