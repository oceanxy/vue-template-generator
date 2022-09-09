import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  methods: {
    async export() {
      await this.$store.dispatch('downExcel', {
        moduleName: this.moduleName,
        fileName: '签约历史'
      })
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          icon="export"
          onClick={() => this.export()}
        >
          导出
        </Button>
        {/*<Button*/}
        {/*  type="primary"*/}
        {/*  icon="plus"*/}
        {/*  onClick={() => this._setVisibleOfModal({}, 'visibleOfContractReview')}*/}
        {/*>*/}
        {/*  历史数据导入*/}
        {/*</Button>*/}
      </Space>
    )
  }
}
