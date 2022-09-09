import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'

export default {
  name: 'WorkOrderStatistics',
  mixins: [dynamicState()],
  methods: {},
  render() {
    return (
      <TGContainer class="bnm-workorder-statistics-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
      </TGContainer>
    )
  }
}
