import './index.scss'
import { Button, List, Tag } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import Message from '@/utils/message'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    complaintRecords() {
      return this.getState('complaintRecords', this.moduleName)
    }
  },
  methods: {
    async onHandle(record) {
      await Message.verificationDialog(async () => {
        // 执行撤销
        const status = await this.$store.dispatch('custom', {
          payload: { id: record.id },
          customApiName: 'complaintWithdrawn',
          closeModalAfterFetched: false
        })

        if (status) {
          // 刷新纪录列表
          await this.$store.dispatch('getListForSelect', {
            moduleName: 'assignComplaints',
            stateName: 'complaintRecords',
            customApiName: 'getRecordsOfComplaint'
          })
        }

        return status
      }, '确定要撤销该投诉吗？')
    },
    getStatus(acceptStatus) {
      return ['', 'normal', 'todo', 'done', 'doing'][+acceptStatus]
    }
  },
  render() {
    return (
      <List
        loading={this.complaintRecords.loading}
        class="bnm-complaint-records-list"
        dataSource={this.complaintRecords.list}
        {...{
          scopedSlots: {
            renderItem: item => (
              <List.Item class="list-container">
                <div class={'items'}>
                  <div class={'item'}>
                    <span class={'label'}>投诉企业</span>
                    <span class={'value'}>
                      {item.companyName}
                      <Tag class={this.getStatus(item.acceptStatus)}>{item.acceptStatusStr}</Tag>
                    </span>
                  </div>
                  <div class="item">
                    <span class={'label'}>投诉时间</span>
                    <span class={'value'}>{item.complaintTimeStr}</span>
                  </div>
                  <div class="item">
                    <span class={'label'}>投诉类型</span>
                    <span class={'value'}>{item.complaintTypeStr}</span>
                  </div>
                  <div class="item">
                    <span class={'label'}>投诉内容</span>
                    <span class={'value'}>{item.content}</span>
                  </div>
                </div>
                <Button.Group class="btns">
                  {
                    item.acceptStatus === 2 ? (
                      <Button
                        type="link"
                        onclick={() => this.onHandle(item)}
                      >
                        撤销
                      </Button>
                    ) : null
                  }
                </Button.Group>
              </List.Item>
            )
          }
        }}
      />
    )
  }
}
