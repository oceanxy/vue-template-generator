import '../../assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import Table from './Table'
import TGPagination from '@/components/TGPagination'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search() {
      return this.getState('search', this.moduleName)
    }
  },
  methods: {
    async onExport() {
      await this.$store.dispatch('downExcel', {
        moduleName: this.moduleName,
        queryParameters: this.search,
        fileName: '考核指标明细'
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
            <span>考核指标明细</span>
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
