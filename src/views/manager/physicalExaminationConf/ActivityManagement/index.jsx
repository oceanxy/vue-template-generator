import './assets/styles/index.scss'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'ActivityManagement',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer>
        <Functions slot="functions" />
        <Inquiry slot="inquiry" />
        <Table slot="table" />
        <TGPagination slot="pagination" />
      </TGContainer>
    )
  }
}
