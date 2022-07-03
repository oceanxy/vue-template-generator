import './index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import { dispatch } from '@/utils/store'

export default {
  name: 'ContractReviewDetails',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {}
  },
  computed: {
    previewUrl() {
      return this.$store.state[this.moduleName].previewUrl
    }
  },
  mounted() {
    const { id } = this.$route.query
    dispatch(this.moduleName, 'getContractPreview', { id })
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
