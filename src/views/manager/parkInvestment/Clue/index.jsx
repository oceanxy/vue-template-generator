import './assets/styles/index.scss'
import { Card } from 'ant-design-vue'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'
import TGContainer from '@/layouts/components/TGContainer'
import ModalOfAssignLeads from './components/ModalOfAssignLeads'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import ModalOfRecoverClues from '@/views/manager/parkInvestment/Clue/components/ModalOfRecoverClues'
import ModalOfDetails from '@/views/manager/parkInvestment/Clue/components/ModalOfDetails'

export default {
  name: 'Clue',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <div class={'bnm-park-investment-container'}>
        <div class={'card-container'}>
          <Card>
            <div class={'card-label'}>线索总数</div>
            <div
              class={'card-value'}
              style={{
                '--theme-color': '0,122,225',
                '--image': `url(${require('./assets/images/total-leads.png')})`
              }}
            >
              34534634
            </div>
          </Card>
          <Card>
            <div class={'card-label'}>待分配</div>
            <div
              class={'card-value'}
              style={{
                '--theme-color': '255,169,64',
                '--image': `url(${require('./assets/images/to-be-assigned.png')})`
              }}
            >
              34534634
            </div>
          </Card>
          <Card>
            <div class={'card-label'}>跟进中</div>
            <div
              class={'card-value'}
              style={{
                '--theme-color': '54,207,201',
                '--image': `url(${require('./assets/images/following-up.png')})`
              }}
            >
              34534634
            </div>
          </Card>
          <Card>
            <div class={'card-label'}>已结束</div>
            <div
              class={'card-value'}
              style={{
                '--theme-color': '250,219,20',
                '--image': `url(${require('./assets/images/over.png')})`
              }}
            >
              34534634
            </div>
          </Card>
          <Card>
            <div class={'card-label'}>签约中</div>
            <div
              class={'card-value'}
              style={{
                '--theme-color': '160,217,27',
                '--image': `url(${require('./assets/images/under-contract.png')})`
              }}
            >
              34534634
            </div>
          </Card>
          <Card>
            <div class={'card-label'}>已签约</div>
            <div
              class={'card-value'}
              style={{
                '--theme-color': '89,126,247',
                '--image': `url(${require('./assets/images/signed.png')})`
              }}
            >
              34534634
            </div>
          </Card>
        </div>
        <TGContainer class={'bnm-park-investment-content'}>
          <Inquiry slot={'inquiry'} />
          <Functions slot={'functions'} />
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit title={'{action}线索'} />
            <ModalOfAssignLeads title={'分配线索'} />
            <ModalOfRecoverClues title={'收回线索'} />
            <ModalOfDetails title={'线索详情'} />
          </template>
        </TGContainer>
      </div>
    )
  }
}
