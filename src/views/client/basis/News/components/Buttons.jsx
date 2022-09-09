import { Button, Space, Radio } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import '../assets/styles/index.scss'
import { mapState, mapAction } from '@/utils/store'

export default {
  mixins: [forFunction()],
  computed: {...mapState(['readLoading'])},
  methods: {...mapAction(['updateIsReadAll', 'delNews'])},
  render() {
    return (
      <div class="bnc-news-button">
        <Space>
          <Button loading={this.readLoading} onClick={() => this.updateIsReadAll()}>
            全部已读
          </Button>
          <Button type="danger" onClick={() => this.delNews(this.moduleName)}>
            删除
          </Button>
        </Space>
        {/* <div>
          <Radio>只看未读</Radio>
        </div> */}
      </div>
    )
  }
}
