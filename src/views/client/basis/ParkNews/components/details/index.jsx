import '../../assets/css/details.scss'
import BNContainer from '@/components/BNContainer'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'
import { Spin, Space } from 'ant-design-vue'
import { mapState } from '@/utils/store'

export default {
  name: 'ParknewsDetail',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {}
  },
  computed: {
    ...mapState(['loading', 'details'])
  },
  mounted() {
    const { id } = this.$route.query

    this.getDetail(id)
  },
  methods: {
    async getDetail(id) {
      this.$store.dispatch('getDetails', { moduleName: this.moduleName, payload: { id } })
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        modalTitle={`园区新闻详情 > ${this.details.articleTitle}`}
        class="bn-parknews-detail-content">
        <Spin spinning={this.loading}>
          <div class="bn-parknews-detail-title">
            <Space>
              <span> 作者：{this.details.author}</span>
              <span>发布时间：{this.details.publishTimeStr}</span>
            </Space>
          </div>
          <div class="bn-parknews-detail-html">{this.details.htmlContent}</div>
        </Spin>
      </BNContainer>
    )
  }
}
