import './assets/styles/index.scss'
import BNContainerWithCountentSider from '@/components/BNContainerWithCountentSider'
import InformationTypeTree from '@/components/BNContainerWithCountentSider/components/InformationTypeTree'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'ContentReleaseInformationType',
  mixins: [dynamicState()],
  methods: {
    onChangeTree(value) {
      const [parentCatId] = value

      this.$store.dispatch('setSearch', {
        payload: { parentCatId: parentCatId ?? '' },
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
        <TGContainer class="bnm-contentrelease-informationtype-container">
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}资讯类别'} />
          </template>
        </TGContainer>
        <template slot="tree">
          <InformationTypeTree onchange={this.onChangeTree} onloaded={this.onLoadedTree}></InformationTypeTree>
        </template>
      </BNContainerWithCountentSider>
    )
  }
}
