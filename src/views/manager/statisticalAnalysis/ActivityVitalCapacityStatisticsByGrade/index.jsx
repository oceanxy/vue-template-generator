import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from '../components/InquiryByGrade'
import Table from './components/Table'
import Functions from './components/Functions'
import { getFieldNameForSchoolGroupType } from '@/utils/projectHelpers'

export default {
  name: 'ActivityVitalCapacityStatisticsByGrade',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入街道名称'}
        getFieldNameForTreeId={getFieldNameForSchoolGroupType}
        optionsOfGetList={{ isFetchList: false }}
        apiOptions={{
          apiName: 'getSchoolTree',
          stateName: 'streetTree',
          moduleName: 'streets'
        }}
      >
        <TGContainer>
          <Functions slot={'functions'} />
          <Inquiry slot="inquiry" />
          <Table slot="table" />
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}