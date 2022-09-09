import './assets/styles/index.scss'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import Form from '@/views/client/properties/Repair/components/Form'
import PropertyRecords from '@/components/PropertyRecords'
import dynamicState from '@/mixins/dynamicState'
import { mapAction, mapState } from '@/utils/store'

export default {
  name: 'Repair',
  mixins: [dynamicState()],
  computed: { ...mapState(['loading', 'list', 'pagination']) },
  mounted() {
    this.getRepair()
  },
  methods: {
    onSetStatus(value) {
      this.$store.commit('setSearch', { payload: { acceptStatus: value }, moduleName: this.moduleName })
      this.getRepair()
    },
    onPagerChange(value) {
      this.$store.commit('setPagination', {
        value: { pageIndex: value }, moduleName: this.moduleName
      })
      this.getRepair()
    },
    ...mapAction(['getRepair'])
  },
  render() {
    return (
      <TGContainerWithSider class="tg-repair">
        <Form slot="default" />
        <PropertyRecords
          title="我的报修记录"
          loading={this.loading}
          list={this.list}
          pageIndex={this.pagination.pageIndex}
          pageTotal={this.pagination.total}
          slot="sider"
          onsetStatus={this.onSetStatus}
          onpagerChange={this.onPagerChange}
        />
      </TGContainerWithSider>
    )
  }
}
