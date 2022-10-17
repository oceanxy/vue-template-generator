import '../../assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import forModuleName from '@/mixins/forModuleName'
import Table from './Table'
import TGPagination from '@/components/TGPagination'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionnaireStatistics-Results',
  mixins: [forModuleName(true)],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    itemId() {
      return this.getState('itemId', this.moduleName)
    },
    questionnaireId() {
      return this.getState('questionnaireId', this.moduleName)
    }
  },
  methods: {
    async onExport() {
      await this.$store.dispatch('downExcel', {
        moduleName: this.moduleName,
        queryParameters: {
          itemId: this.itemId,
          reportId: this.questionnaireId
        },
        fileName: '问卷统计'
      })
    }
  },
  render() {
    return (
      <BNContainer
        class={'main-container'}
        contentClass={'table-content'}
        modalTitle={
          <div class={'table-content-title'}>
            <span>按类型统计</span>
            <Button
              class={'custom-button'}
              ghost
              type={'primary'}
              onClick={this.onExport}
            >
              导出结果
            </Button>
          </div>
        }
        width={'100%'}
        showBoxShadow={false}
      >
        <Table />
        <TGPagination />
      </BNContainer>
    )
  }
}
