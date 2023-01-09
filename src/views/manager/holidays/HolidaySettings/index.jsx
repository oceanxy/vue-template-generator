import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfSettings from './components/ModalOfSettings'

export default {
  name: 'HolidaySettings',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer>
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'${action}假期'} />
          <ModalOfSettings modalTitle={'调休设置'} />
        </template>
      </TGContainer>
    )
  }
}
