import './assets/styles/index.scss'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import Form from '@/views/client/properties/Complaints/components/Form'
import PropertyRecords from '@/components/PropertyRecords'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/client'
import { mapState, mapAction } from '@/utils/store'
export default {
  name: 'Complaints',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {
      complaintsTypeEnum: { 1: '园区管理', 2: '服务态度', 3: '服务质量', 4: '服务效率' }
    }
  },
  provide() {
    return {
      complaintsTypeEnum: this.complaintsTypeEnum
    }
  },
  computed: {
    ...mapState(['loading', 'list', 'pagination']),
    // 列表是通用的，这里转换字段
    listEffect() {
      return this.list.map(item => {
        item.disposeStatus = item.acceptStatus === 2 ? 1 : 2
        item.applyProject = this.complaintsTypeEnum[item.complaintsType]
        item.applyDescription = item.content
        item.imgList = item.descriptionImgList || []
        // item.disposeName=item.disposeName
        // item.disposeTimeStr = item.disposeTimeStr
        // item.disposeResult = item.disposeResult
        item.disposeImgList = item.disposeResultImgsList || []
        item.applyTimeStr = item.complaintsTimeStr

        return item
      })
    }
  },
  mounted() {
    this.getComplaintsPageList()
  },
  methods: {
    onSetStatus(value) {
      this.$store.commit('setSearch', { payload: { disposeStatus: value }, moduleName: this.moduleName })
      this.getComplaintsPageList()
    },
    onPagerChange(value) {
      this.$store.commit('setPagination', { value: { pageIndex: value }, moduleName: this.moduleName })
      this.getComplaintsPageList()
    },
    ...mapAction(['getComplaintsPageList'])
  },
  render() {
    return (
      <TGContainerWithSider class="tg-suggestions">
        <Form slot="default" />
        <PropertyRecords
          title="我的投诉建议"
          loading={this.loading}
          list={this.listEffect}
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
