import './index.scss'
import forTable from '@/mixins/forTable'
import { Button, Table } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import BNContainer from '@/components/BNContainer'
import { mapGetters } from 'vuex'

export default {
  name: 'MyReports-FillInRecords',
  mixins: [
    dynamicState({injectSubmoduleName: true}),
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
  methods: {
    toFillOutReport() {
      this.$router.push({
        name: 'fillOutReport', query: {
          reportId: this.data.id,
          fillObj: this.data.fillObj
        }
      })
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
          <div class={'title'}>
            {this.data.fullName}
          </div>
          <Table
            ref={`${this.moduleName}Table`}
            {...attributes}
            {...{
              scopedSlots: {
                attachmentList: (text, record) => (
                  <ol style={{ paddingLeft: '20px', marginBottom: 0 }}>
                    {
                      record.attachmentList?.map(item => (
                        <li>{item.fileName}</li>
                      ))
                    }
                  </ol>
                )
              }
            }}
          />
          <div class={'btn'}>
            <Button type={'primary'} onClick={this.toFillOutReport}>重新填报</Button>
          </div>
        </BNContainer>
      </div>
    )
  }
}
