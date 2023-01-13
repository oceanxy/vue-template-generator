import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { getSchoolTreeIcon } from '@/utils/projectHelpers'
import TGContainerWithSider from '@/components/TGContainerWithSider'

export default {
  name: 'InfectiousDiseaseStatistics',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入学校名称'}
        getCustomIcon={getSchoolTreeIcon}
        getFieldNameForTreeId={() => 'orgId'}
        injectSearchParamsOfTable={dataSource => ({ orgType: dataSource.type })}
        apiOptions={{
          apiName: 'getSchoolTree',
          stateName: 'schoolTree',
          moduleName: 'schools'
        }}
      >
        <TGContainer class={'noncommunicable-disease-statistics-container'}>
          <Functions slot="functions" />
          <Inquiry slot="inquiry" />
          <TGContainerWithSider
            slot={'table'}
            class={'noncommunicable-disease-statistics-content'}
            contentClass={'content'}
            siderClass={'sider'}
          >
            <div slot={'default'} class={'chart-content'}>
              <LineChart />
              <PieChart />
            </div>
            <Table slot="sider" />
          </TGContainerWithSider>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
