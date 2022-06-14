import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Functions from '@/views/manager/basis/Businesses/components/Functions'
import Table from '@/views/manager/basis/Businesses/components/Table'
import Inquiry from '@/views/manager/basis/Businesses/components/Inquiry'
import Pagination from '@/views/manager/basis/Businesses/components/Pagination'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import ModalOfEdit from '@/views/manager/basis/Businesses/components/ModalOfEdit'

export default {
  name: 'Businesses',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {
      loading: false,
      imageUrl: '',
      currentItem: {
        name: ''
      },
      data: [
        {
          title: '0-0',
          key: '0-0',
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' }
              ]
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' }
              ]
            },
            {
              title: '0-0-2',
              key: '0-0-2'
            }
          ]
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' }
          ]
        },
        {
          title: '0-2',
          key: '0-2'
        }
      ]
    }
  },
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-businesses-container">
        <TGContainer>
          <Inquiry slot="inquiry" />
          <Functions slot="functions" />
          <Table slot="table" />
          <Pagination slot="pagination" />
          <ModalOfEdit slot={'modals'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
