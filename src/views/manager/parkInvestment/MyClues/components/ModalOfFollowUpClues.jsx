import '../assets/styles/index.scss'
import { Form, Input, Radio, Space, Spin, Timeline } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {width: 810},
      visibleField: 'visibleOfFollowUpClues'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    followUpDetailsList() {
      return this.getState('followUpDetailsList', this.moduleName)
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        await this.$store.dispatch('getListForSelect', {
          moduleName: this.moduleName,
          stateName: 'followUpDetailsList',
          customApiName: 'getFollowUpDetailsList',
          payload: {id: this.currentItem.id}
        })
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel('visibleOfFollowUpClues'),
        ok: () => this.onSubmit({customApiName: 'followUpLead'})
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-my-clues-follow-up-modal'}>
        <Form
          class="bnm-team-edit-form bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="历史进展" style={{ marginBottom: 0 }}>
            <Spin spinning={this.followUpDetailsList.loading}>
              <Timeline>
                {
                  this.followUpDetailsList.list.map(item => (
                    <Timeline.Item>
                      <Space>
                        <span class={'datetime'}>{item.progressTime}</span>
                        <span class={'name'}>{item.memberName || '跟进人未知'}</span>
                        <span class={'type'}>{item.progressType}</span>
                        <span class={'desc'}>{item.memberInfo}</span>
                      </Space>
                    </Timeline.Item>
                  ))
                }
              </Timeline>
            </Spin>
          </Form.Item>
          <Form.Item label="本次进展">
            {
              this.form.getFieldDecorator('allotStatus', {
                initialValue: 2,
                rules: [{
                  required: true, type: 'number', message: '请选择进展类型！', trigger: 'change'
                }]
              })(
                <Radio.Group>
                  <Radio value={2}>新的进展</Radio>
                  <Radio value={5}>线索已结束</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="进展描述">
            {
              this.form.getFieldDecorator('description', {
                rules: [{
                  required: true, message: '请输入进展描述！', trigger: 'blur'
                }]
              })(
                <Input.TextArea placeholder={'请输入名称'} autoSize={{ minRows: 6 }} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
