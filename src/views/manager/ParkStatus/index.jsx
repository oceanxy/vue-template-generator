import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import Sider from './components/Sider'

export default {
  name: 'ParkStatus',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithSider class={'bnm-park-status'} siderClass={'bnm-park-status-sider'}>
        <div class={'park-status-main'} slot="default">
          main
        </div>
        <Sider slot="sider" />
      </TGContainerWithSider>
    )
  }
}
