import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from '../components/InquiryByHierarchy'
import Table from './components/Table'
import Functions from './components/Functions'
import { getSchoolTreeIcon } from '@/utils/projectHelpers'

export default {
  name: 'ActivityVisionStatisticsByGrade',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入街道名称'}
        getCustomIcon={getSchoolTreeIcon}
        getFieldNameForTreeId={() => 'orgId'}
        injectSearchParamsOfTable={dataSource => ({ orgType: dataSource.type })}
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
