import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import TableForItem from './components/TableForItem'
import Sider from './components/Sider'
import TableForType from './components/TableForType'

export default {
  name: 'IndicatorStatistics',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithSider
        siderOnLeft
        class={'bnm-indicator-statistics-container'}
      >
        <Sider slot={'sider'} />
        <template slot={'default'}>
          <TableForItem />
          <TableForType />
        </template>
      </TGContainerWithSider>
    )
  }
}
