import '../assets/styles/index.scss'
import { Col, DatePicker, Form, Input, Row, Select } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { debounce } from 'lodash'
import { mapState } from '@/utils/store'
import moment from 'moment'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-conferenceroom-subscribe'
      }
    }
  },
  computed: { ...mapState(['roomList', 'businessSelect']) },
  mounted() {
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getRoomList(this.currentItem.roomNo || '')
          this.getBusiness(this.currentItem.companyName || '')
        }
      }
    }
  },
  methods: {
    getRoomList(keyword) {
      this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'roomList',
        customApiName: 'getBookMeetingRoom',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          roomNo: keyword
        }
      })
    },
    getBusiness(keyword) {
      this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'businessSelect',
        customApiName: 'getUseCompanyList',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          companyName: keyword
        }
      })
    },
    customDataHandler(values) {
      const data = { ...values }

      data.appointmentEndTime = data.appointmentEndTime.format('YYYYMMDDHHmm')
      data.appointmentStartTime = data.appointmentStartTime.format('YYYYMMDDHHmm')

      return data
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form class="" colon={false}>
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="会议室">
                {this.form.getFieldDecorator('roomId', {
                  initialValue: this.currentItem.roomId ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请选择会议室!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Select
                    placeholder={'输入会议室名称搜索'}
                    showSearch
                    filterOption={false}
                    onSearch={debounce(this.getRoomList, 300)}
                    notFoundContent={this.roomList.loading ? <Spin /> : undefined}
                  >
                    {this.roomList.list.map(item => (
                      <Select.Option value={item.id} title={item.roomNo}>
                        {item.roomNo}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="企业">
                {this.form.getFieldDecorator('companyId', {
                  initialValue: this.currentItem.companyId ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请选择企业!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Select
                    placeholder={'输入企业名称搜索'}
                    showSearch
                    filterOption={false}
                    onSearch={debounce(this.getBusiness, 300)}
                    notFoundContent={this.businessSelect.loading ? <Spin /> : undefined}
                  >
                    {this.businessSelect.list.map(item => (
                      <Select.Option value={item.companyId} title={item.companyName}>
                        {item.companyName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={15}>
              <Form.Item label="占用时段">
                {this.form.getFieldDecorator('appointmentStartTime', {
                  initialValue: this.currentItem.appointmentStartTimeStr
                    ? moment(this.currentItem.appointmentStartTimeStr)
                    : undefined,
                  rules: [
                    {
                      required: true,
                      type: 'object',
                      message: '请选择开始时间!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择" allowClear></DatePicker>
                )}
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="">
                {this.form.getFieldDecorator('appointmentEndTime', {
                  initialValue: this.currentItem.appointmentEndTimeStr
                    ? moment(this.currentItem.appointmentEndTimeStr)
                    : undefined,
                  rules: [
                    {
                      required: true,
                      type: 'object',
                      message: '请选择结束时间!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <DatePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" placeholder="请选择" allowClear></DatePicker>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="预约说明">
                {
                  this.form.getFieldDecorator('description', {
                    initialValue: this.currentItem.description ?? undefined,
                    rules: [
                      {
                        required: true,
                        type: 'string',
                        message: '请输入预约说明!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input.TextArea placeholder="请输入" autoSize={{ minRows: 6 }} allowClear />
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
