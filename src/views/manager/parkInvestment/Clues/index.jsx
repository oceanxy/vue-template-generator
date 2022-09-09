import './assets/styles/index.scss'
import { Card } from 'ant-design-vue'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import TGContainer from '@/layouts/components/TGContainer'
import ModalOfAssignLeads from './components/ModalOfAssignLeads'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'
import ModalOfRecoverClues from './components/ModalOfRecoverClues'
import ModalOfDetails from './components/ModalOfDetails'

export default {
  name: 'Clues',
  mixins: [dynamicState()],
  data() {
    return {
      cardList: [
        {
          color: '0,122,225',
          image: require('./assets/images/total-leads.png')
        },
        {
          color: '255,169,64',
          image: require('./assets/images/to-be-assigned.png')
        },
        {
          color: '54,207,201',
          image: require('./assets/images/following-up.png')
        },
        {
          color: '250,219,20',
          image: require('./assets/images/over.png')
        },
        {
          color: '160,217,27',
          image: require('./assets/images/under-contract.png')
        },
        {
          color: '89,126,247',
          image: require('./assets/images/signed.png')
        }
      ]
    }
  },
  async mounted() {
    await dispatch(this.moduleName, 'getCluesCountList', {})
  },
  computed: {
    cluesCountList() {
      return this.$store.state[this.moduleName].cluesCountList
    },
    getCardList() {
      return this.cluesCountList.map((item, index) => {
        const _data = this.cardList[index]

        return {
          ...item,
          ..._data
        }
      })
    }
  },
  render() {
    return (
      <div class={'bnm-park-investment-container'}>
        <div class={'card-container'}>
          {
            this.getCardList.map(item => (
              <Card>
                <div class={'card-label'}>{item.name}</div>
                <div
                  class={'card-value'}
                  style={{
                    '--theme-color': item.color,
                    '--image': `url(${item.image})`
                  }}
                >
                  {item.count}
                </div>
              </Card>
            ))
          }
        </div>
        <TGContainer class={'bnm-park-investment-content'}>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}线索'} />
            <ModalOfAssignLeads modalTitle={'分配线索'} />
            <ModalOfRecoverClues modalTitle={'收回线索'} />
            <ModalOfDetails modalTitle={'线索详情'} />
          </template>
        </TGContainer>
      </div>
    )
  }
}
