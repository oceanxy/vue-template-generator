import { Button, Form, Table } from 'ant-design-vue'
import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forTableModal()],
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfDetails',
      modalProps: {
        width: 900,
        footer: <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>
      },
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            dataIndex: 'serialNum'
          },
          {
            title: '填报项',
            width: 150,
            dataIndex: 'itemName'
          },
          {
            title: '类型',
            width: 100,
            dataIndex: 'modTypeStr'
          },
          {
            title: '考核结果',
            scopedSlots: { customRender: 'result' }
          },
          {
            title: '考核得分',
            width: 100,
            align: 'center',
            dataIndex: 'score'
          }
        ],
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        scroll: {},
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'details',
            customApiName: 'getDetailsOfReportAudit',
            payload: { id: this.currentItem.id }
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {cancel: () => this.onCancel(this.visibleField)}
    }

    const tableAttributes = {
      props: {
        ...this.tableProps,
        loading: this.details.loading,
        dataSource: this.details.list
      },
      attrs: {class: 'bnm-table-in-modal records-details-table'}
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table
          {...tableAttributes}
          {...{
            scopedSlots: {
              result: (text, record) => {
                if (record.modType === 5 || record.modType === 6) {
                  return (
                    <ol style={{
                      paddingLeft: '20px', marginBottom: 0 
                    }}>
                      {
                        record.resultFile?.map(item => (
                          <li><a target="_blank" href={item.path}>{item.fileName}</a></li>
                        ))
                      }
                    </ol>
                  )
                }

                return record.resultContent
              }
            }
          }}
        >
          <template slot="footer">
            <div class="actually-received">
              <span>综合得分</span>
              <span style={{
                width: '60px', textAlign: 'center' 
              }}>
                {this.currentItem.score}
              </span>
            </div>
          </template>
        </Table>
      </DragModal>
    )
  }
})
