import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'

export default {
  name: 'TaskStatistics',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-task-statistics-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
      </TGContainer>
    )
  }
}
