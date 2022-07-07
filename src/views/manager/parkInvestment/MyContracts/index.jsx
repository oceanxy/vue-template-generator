import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Functions from './components/Functions'

export default {
  name: 'MyContracts',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-my-contracts-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
      </TGContainer>
    )
  }
}
