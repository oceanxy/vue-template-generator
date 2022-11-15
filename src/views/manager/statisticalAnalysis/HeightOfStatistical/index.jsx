import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Tabs from './components/Tabs'
import Inquiry from '../components/Inquiry'

export default {
  name: 'HeightOfStatistical',
  mixins: [dynamicState()],
  data: () => ({ by: 1 }),
  render() {
    return (
      <TGContainer class={'fe-height-of-statistical-container'}>
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} by={this.by} type={1} />
        <Tabs slot={'table'} vModel={this.by} />
      </TGContainer>
    )
  }
}
