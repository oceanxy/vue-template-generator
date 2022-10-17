import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import BNContainerWithCountentSider from '@/components/BNContainerWithCountentSider'
import InformationTypeTree from '@/components/BNContainerWithCountentSider/components/InformationTypeTree'

export default {
  name: 'ContentReleaseInformation',
  mixins: [dynamicState()],
  methods: {
    onChangeTree(value) {
      this.$store.dispatch('setSearch', {
        payload: { catId: value?.[0] ?? '' },
        moduleName: this.moduleName
      })
    },
    onLoadedTree(treeList, value) {
      this.onChangeTree(value)
    }
  },
  render() {
    return (
      <BNContainerWithCountentSider>
        <TGContainer class="bnm-contentrelease-information-container">
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot="modals">
            <ModalOfEdit modalTitle={'{action}资讯'} />
          </template>
        </TGContainer>
        <template slot="tree">
          <InformationTypeTree
            onChange={this.onChangeTree}
            onLoaded={this.onLoadedTree}
          />
        </template>
      </BNContainerWithCountentSider>
    )
  }
}
