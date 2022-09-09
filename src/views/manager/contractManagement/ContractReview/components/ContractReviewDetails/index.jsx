import './index.scss'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'

export default {
  name: 'ContractReviewDetails',
  mixins: [dynamicState()],
  data() {
    return {}
  },
  computed: {
    previewUrl() {
      return this.$store.state[this.moduleName].previewUrl
    }
  },
  async mounted() {
    const { cid } = this.$route.query

    await dispatch(this.moduleName, 'getContractPreview', { id: cid })
  },
  render() {
    return (
      <iframe
        src={this.previewUrl}
        frameBorder="0"
        height="100%"
        scrolling="yes"
        width="100%"
      />
    )
  }
}
