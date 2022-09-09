import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import Table from './components/Table'

export default {
  name: 'Parks',
  mixins: [dynamicState()],
  render () {
    return (
      <TGContainer class="bnm-parks-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} modalTitle={'{action}中心'} />
      </TGContainer>
    )
  }
}
