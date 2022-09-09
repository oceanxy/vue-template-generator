import '../../assets/css/details.scss'
import BNContainer from '@/components/BNContainer'
import dynamicState from '@/mixins/dynamicState'
import { Spin, Space } from 'ant-design-vue'
import { mapState } from '@/utils/store'

export default {
  name: 'ParkNewsDetail',
  mixins: [dynamicState()],
  data () {
    return {}
  },
  computed: { ...mapState(['loading', 'details']) },
  mounted () {
    const { id } = this.$route.query

    this.getDetail(id)
  },
  methods: {
    async getDetail (id) {
      await this.$store.dispatch('getDetails', {
        moduleName: this.moduleName,
        payload: { id }
      })

      this.getHtml()
    },
    getHtml () {
      this.$refs['bn-park-news-detail-html'].innerHTML = this.showHtml(this.details.htmlContent)
    },
    showHtml (str) {
      return str
        .replace(str ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '\"')
        .replace(/&#39;/g, "\'")
        .replace(/&amp;nbsp;/g, '\u3000')
    }
  },
  render () {
    return (
      <BNContainer
        width="100%"
        modalTitle={`园区新闻详情 > ${this.details.articleTitle}`}
        class="bn-park-news-detail-content">
        <Spin spinning={this.loading}>
          <div class="bn-park-news-detail-title">
            <Space>
              <span> 作者：{this.details.author}</span>
              <span>发布时间：{this.details.publishTimeStr}</span>
            </Space>
          </div>
          <div class="bn-park-news-detail-html" ref="bn-park-news-detail-html"></div>
        </Spin>
      </BNContainer>
    )
  }
}
