import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'

export default {
  name: 'ReportOverview',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer>
        <Functions slot={'functions'} />
        <Inquiry slot={'others'} />
        <Table slot={'table'} />
      </TGContainer>
    )
  }
}
