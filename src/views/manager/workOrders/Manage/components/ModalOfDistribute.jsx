import '../assets/styles/index.scss'
import { Col, Form, InputNumber, Radio, Row, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapAction, mapState } from '@/utils/store'
import { debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfDistribute',
      modalProps: {
        width: 500,
        wrapClassName: 'bnm-modal-workorder-manage-distribute-form',
        confirmLoading: false
      }
    }
  },
  computed: { ...mapState(['businessSelect', 'disposeUserSelect']) },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getDisposeUser()
        }
      }
    }
  },
  methods: {
    ...mapAction(['assignWorkOrder']),
    getDisposeUser(keyword) {
      this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'disposeUserSelect',
        customApiName: 'getPropertyPersonSearchPage',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          fullName: keyword
        }
      })
    },
    onSubmit() {
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return

        this.modalProps.confirmLoading = true

        await this.assignWorkOrder({
          payload: {
            ...values,
            id: this.currentItem.id
          }
        })

        this.modalProps.confirmLoading = false

        this.onCancel(this.visibleField)

        await this.$store.dispatch('getList', { moduleName: this.moduleName })
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class=""
          colon={false}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="业务等级">
                {this.form.getFieldDecorator('businessLevel', {
                  initialValue: undefined,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择业务等级!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio value={1}>简单</Radio>
                    <Radio value={2}>一般</Radio>
                    <Radio value={3}>严重</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="业务处理时长">
                {
                  this.form.getFieldDecorator('businessAcceptTime', {
                    initialValue: undefined,
                    rules: [
                      {
                        required: true,
                        type: 'number',
                        message: '请输入业务处理时长!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <InputNumber
                      placeholder="请输入业务处理时长（按小时计）"
                      style={{ width: '100%' }}
                      min={0}
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="业务处理人员">
                {
                  this.form.getFieldDecorator('assigneeId', { initialValue: undefined })(
                    <Select
                      placeholder={'输入姓名搜索'}
                      showSearch
                      filterOption={false}
                      onSearch={debounce(this.getDisposeUser, 300)}
                      notFoundContent={this.disposeUserSelect.loading ? <Spin /> : undefined}
                    >
                      {
                        this.disposeUserSelect.list.map(item => (
                          <Select.Option
                            value={item.id}
                            title={item.fullName}
                          >
                            {item.fullName}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
