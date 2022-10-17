import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import { Button, Descriptions, Spin, Table } from 'ant-design-vue'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 800,
        footer: [
          <Button
            type={'primary'}
            onClick={() => this.onCancel(this.visibleField)}
          >取消</Button>
        ]
      },
      visibleField: 'visibleOfDetails'
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
            customApiName: 'getDetailsOfApplicationRecords',
            payload: { id: this.currentItem.id }
          })
        }
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
        <Spin spinning={this.details.loading}>
          <Descriptions
            bordered
            column={1}
            class={'bnm-modal-descriptions'}
          >
            <Descriptions.Item label={'扣款事项'}>
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
                dataSource={this.details.data.itemList}
              />
            </Descriptions.Item>
            <Descriptions.Item label={'企业名称'}>{this.details.data.companyName}</Descriptions.Item>
            <Descriptions.Item label={'合同编号'}>{this.details.data.contractNo}</Descriptions.Item>
            <Descriptions.Item label={'签约场地'}>{this.details.data.address}</Descriptions.Item>
            <Descriptions.Item label={'解约原因'}>{this.details.data.reason}</Descriptions.Item>
            <Descriptions.Item label={'审核结果'}>{this.details.data.auditStatusStr}</Descriptions.Item>
            <Descriptions.Item label={'审核意见'}>{this.details.data.opinion}</Descriptions.Item>
          </Descriptions>
        </Spin>
      </DragModal>
    )
  }
}
