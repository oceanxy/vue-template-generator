import './index.scss'
import forTable from '@/mixins/forTable'
import { Button, Table } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import forModuleName from '@/mixins/forModuleName'
import BNContainer from '@/components/BNContainer'
import { mapGetters } from 'vuex'

export default {
  name: 'MyReports-FillInRecords',
  mixins: [
    dynamicState(store, dynamicModules),
    forModuleName(true),
    forTable(false)
  ],
  data() {
    return {
      stateName: 'data', // 需在store内初始化该字段
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            dataIndex: 'serialNum'
          },
          {
            title: '题目',
            dataIndex: 'itemName'
          },
          {
            title: '答案',
            dataIndex: 'resultContent'
          },
          {
            title: '佐证',
            scopedSlots: { customRender: 'attachmentList' }
          }
        ],
        rowSelection: null,
        size: 'middle',
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    },
    data() {
      return this.getState(this.stateName, this.moduleName, this.submoduleName)
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        dataSource: this.data.reportResultList,
        loading: this.loading
      }
    }

    return (
      <div class={'bnm-fill-in-records-container'}>
        <BNContainer
          width={'100%'}
          showBoxShadow={false}
          modalTitle={'填报记录'}
          contentClass={'bnm-fill-in-records-content'}
        >
          <Table
            ref={`${this.moduleName}Table`}
            {...attributes}
            {...{
              scopedSlots: {
                attachmentList: (text, record) => (
                  <ol>
                    {
                      record.attachmentList.map(item => (
                        <li>{item.fileName}</li>
                      ))
                    }
                  </ol>
                )
              }
            }}
          />
          <div>
            <Button type={'primary'}>重新填报</Button>
          </div>
        </BNContainer>
      </div>
    )
  }
}
