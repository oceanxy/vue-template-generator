import './index.scss'
import dynamicState from '@/mixins/dynamicState'
import UnitDetails from './components/UnitDetails'
import ParkDetails from './components/ParkDetails'

export default {
  name: 'UnitInformation',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'bnm-unit-information-container'}>
        <UnitDetails />
        <ParkDetails />
      </div>
    )
  }
}
