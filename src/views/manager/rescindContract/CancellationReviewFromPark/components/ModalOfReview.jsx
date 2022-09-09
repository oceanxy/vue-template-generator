import '../assets/styles/index.scss'
import { Form, Input, Radio, Table } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {width: 700},
      visibleField: 'visibleOfReview'
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
            payload: {id: this.currentItem.id}
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({ customApiName: 'cancellationReviewFromPark' })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          {
            this.details.data.itemList?.length ? (
              <Form.Item label={'扣款事项'}>
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
                      title: '扣款项目',
                      dataIndex: 'amount'
                    }
                  ]}
                  loading={this.details.loading}
                  dataSource={this.details.data.itemList}
                />
              </Form.Item>
            ) : null
          }
          <Form.Item label="审核结果">
            {
              this.form.getFieldDecorator('auditStatus', {
                rules: [{
                  required: true, type: 'number', message: '请选择审核结果！', trigger: 'change'
                }]
              })(
                <Radio.Group placeholder="请选择审核结果" allowClear>
                  <Radio value={3}>通过</Radio>
                  <Radio value={4}>拒绝</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="审核意见">
            {
              this.form.getFieldDecorator('opinion', {
                rules: [{
                  required: true, message: '请输入审核意见！', trigger: 'blur'
                }]
              })(
                <Input.TextArea placeholder="请输入审核意见" autoSize={{ minRows: 6 }} allowClear />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
