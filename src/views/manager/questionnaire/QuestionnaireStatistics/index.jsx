import './assets/styles/index.scss'
import { Button, Select } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import BNContainer from '@/components/BNContainer'
import TableForItem from './components/TableForItem'
import TableForType from './components/TableForType'
import Chart from './components/Chart'

export default {
  name: 'QuestionnaireStatistics',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainerWithSider
        siderOnLeft
        class={'bnm-questionnaire-statistics-container'}
      >
        <template slot={'sider'}>
          <Select placeholder={'请选择问卷'} class={'list-select'}>
            <Select.Option value={1}>11</Select.Option>
          </Select>
          <div class={'list'}>
            <div class={'list-item'}>
              <span>01</span>
              <span>您是否接种过新冠疫苗</span>
            </div>
            <div class={'list-item'}>
              <span>01</span>
              <span>您是否接种过新冠疫苗</span>
            </div>
            <div class={'list-item'}>
              <span>01</span>
              <span>您是否接种过新冠疫苗</span>
            </div>
          </div>
        </template>
        <template slot={'default'}>
          <BNContainer
            modalTitle={'您是否接种过新冠疫苗'}
            width={'100%'}
            class={'main-container chart-container'}
            contentClass={'chart-content'}
            showBoxShadow={false}
          >
            <div class={'completed-quantity'}>已完成问卷数：96</div>
            <TableForItem />
            <Chart />
          </BNContainer>
          <BNContainer
            class={'main-container'}
            contentClass={'table-content'}
            modalTitle={
              <div class={'table-content-title'}>
                <span>按类型统计</span>
                <Button class={'custom-button'} ghost type={'primary'}>导出结果</Button>
              </div>
            }
            width={'100%'}
            showBoxShadow={false}
          >
            <TableForType />
          </BNContainer>
        </template>
      </TGContainerWithSider>
    )
  }
}
