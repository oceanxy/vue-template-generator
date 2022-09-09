import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import ModalOfEdit from './components/ModalOfEdit'
import TGPagination from '@/components/TGPagination'

export default {
  name: 'Units',
  mixins: [dynamicState()],
  render () {
    return (
      <TGContainer class="bnm-units-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} modalTitle={'{action}单位'} />
      </TGContainer>
    )
  }
}
