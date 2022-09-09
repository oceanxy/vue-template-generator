/**
 * 签约流程
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-07-15 周五 10:58:47
 */

import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import { Button, Table, Tabs } from 'ant-design-vue'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 800,
        footer: [
          <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>
        ]
      },
      defaultActiveKey: 1,
      visibleField: 'visibleOfDetails'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    },
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    }
  },
  watch: {
    currentItem: {
      deep: true,
      immediate: true,
      handler(value) {
        this.defaultActiveKey = value.tabIndex
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel(this.visibleField) }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Tabs vModel={this.defaultActiveKey}>
          <Tabs.TabPane key={1} tab={'欠缴账单'}>
            <Table
              size={'middle'}
              pagination={false}
              columns={[
                {
                  title: '费项名称',
                  dataIndex: 'itemName'
                },
                {
                  title: '账单周期',
                  dataIndex: 'billMonth'
                },
                {
                  title: '账单金额',
                  dataIndex: 'amount'
                },
                {
                  title: '状态',
                  dataIndex: 'payStatusStr'
                }
              ]}
              dataSource={this.details.data.oweItemList}
            />
          </Tabs.TabPane>
          <Tabs.TabPane key={2} tab={'扣款事项'}>
            <Table
              size={'middle'}
              pagination={false}
              columns={[
                {
                  title: '项目',
                  dataIndex: 'itemName'
                },
                {
                  title: '描述',
                  dataIndex: 'description'
                },
                {
                  title: '扣款金额',
                  dataIndex: 'amount'
                }
              ]}
              dataSource={this.details.data.deductionsItemList}
            />
          </Tabs.TabPane>
        </Tabs>
      </DragModal>
    )
  }
}
