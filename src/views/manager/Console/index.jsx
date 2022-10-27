import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import Sider from './components/Sider'
import Summary from './components/Summary'
import Overview from './components/Overview'
import Subtotals from './components/Subtotals'

export default {
  name: 'Console',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithSider class={'pe-console'} siderClass={'pe-console-sider'}>
        <div class={'pe-console-main'} slot="default">
          <Summary />
          <div class={'pe-console-statistics'}>
            <Overview />
            <Subtotals />
          </div>
        </div>
        <Sider slot="sider" />
      </TGContainerWithSider>
    )
  }
}
