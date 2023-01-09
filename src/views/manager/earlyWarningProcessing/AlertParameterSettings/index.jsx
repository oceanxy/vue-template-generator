import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'AlertParameterSettings',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer>
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} />
      </TGContainer>
    )
  }
}
