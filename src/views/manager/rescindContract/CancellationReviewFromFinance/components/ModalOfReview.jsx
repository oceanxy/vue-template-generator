import '../assets/styles/index.scss'
import { Button, Descriptions, Form, Input, InputNumber, Radio, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: { width: 700 },
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
            customApiName: 'getDetailsOfCancellationReviewFromFinance',
            payload: { id: this.currentItem.id }
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
        ok: () => this.onSubmit({ customApiName: 'cancellationReviewFromFinance' })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item label={'财务核算'}>
            <Spin spinning={this.details.loading}>
              <Descriptions class={'bnm-cancellation-review-from-finance-descriptions'}>
                <Descriptions.Item label={'欠缴账单'}>
                  {this.details.data.oweAmount}
                  <Button
                    type={'link'}
                    size={'small'}
                    style={{ marginLeft: '4px' }}
                    onClick={() => this._mergeCurrentItem({ tabIndex: 1 }, 'visibleOfDetails')}
                  >
                    查看明细
                  </Button>
                </Descriptions.Item>
                <Descriptions.Item label={'扣款事项'}>
                  {this.details.data.deductionsAmount}
                  <Button
                    type={'link'}
                    size={'small'}
                    style={{ marginLeft: '4px' }}
                    onClick={() => this._mergeCurrentItem({ tabIndex: 2 }, 'visibleOfDetails')}
                  >
                    查看明细
                  </Button>
                </Descriptions.Item>
                <Descriptions.Item label={'保证金余额'}>
                  {this.details.data.earnestAmount}
                </Descriptions.Item>
                <Descriptions.Item label={'应结账款'}>
                  {this.details.data.realAmount}
                </Descriptions.Item>
              </Descriptions>
            </Spin>
          </Form.Item>
          <Form.Item label="审核结果">
            {
              this.form.getFieldDecorator('auditStatus', {
                rules: [
                  {
                    required: true, type: 'number', message: '请选择审核结果！', trigger: 'change'
                  }
                ]
              })(
                <Radio.Group placeholder="请选择审核结果" allowClear>
                  <Radio value={3}>通过</Radio>
                  <Radio value={4}>拒绝</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="实缴金额">
            {
              this.form.getFieldDecorator('realAmount', {
                rules: [
                  {
                    required: true, type: 'number', message: '请输入金额！', trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  placeholder={'请输入金额'}
                  style={{ width: '100%' }}
                  precision={2}
                />
              )
            }
          </Form.Item>
          <Form.Item label="审核意见">
            {
              this.form.getFieldDecorator('opinion', {
                rules: [
                  {
                    required: true, message: '请输入审核意见！', trigger: 'blur'
                  }
                ]
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
