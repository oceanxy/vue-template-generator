import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Tabs from './components/Tabs'

export default {
  name: 'HeightOfStatistical',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class={'fe-height-of-statistical-container'}>
        <Functions slot={'functions'} />
        <Tabs slot={'table'} />
      </TGContainer>
    )
  }
}
