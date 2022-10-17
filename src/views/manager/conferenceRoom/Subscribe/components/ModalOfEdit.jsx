import '../assets/styles/index.scss'
import { DatePicker, Form, Input, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep, debounce, omit } from 'lodash'
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
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await Promise.all([
            this.getRoomList(this.currentItem.roomNo || ''),
            this.getBusiness(this.currentItem.companyName || '')
          ])
        }
      }
    }
  },
  methods: {
    async getRoomList(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'roomList',
        customApiName: 'getBookMeetingRoom',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          roomNo: keyword,
          companyId: this.form.getFieldValue('companyId')
        }
      })
    },
    async getBusiness(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'businessSelect',
        customApiName: 'getMeetingUseCompanyList',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          companyName: keyword
        }
      })
    },
    customDataHandler(values) {
      let data = cloneDeep(values)

      data.appointmentStartTime = data.dateTimeRange[0].format('YYYYMMDDHHmm')
      data.appointmentEndTime = data.dateTimeRange[1].format('YYYYMMDDHHmm')

      data = omit(data, 'dateTimeRange')

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
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="企业">
            {
              this.form.getFieldDecorator('companyId', {
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
                  allowClear
                  filterOption={false}
                  onSearch={debounce(this.getBusiness, 300)}
                  notFoundContent={this.businessSelect.loading ? <Spin /> : undefined}
                >
                  {
                    this.businessSelect.list.map(item => (
                      <Select.Option
                        value={item.companyId}
                        title={item.companyName}
                      >
                        {item.companyName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="会议室">
            {
              this.form.getFieldDecorator('roomId', {
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
                  placeholder={'输入房号搜索（不支持楼栋和楼层的搜索）'}
                  showSearch
                  filterOption={false}
                  allowClear
                  onSearch={debounce(this.getRoomList, 300)}
                  notFoundContent={this.roomList.loading ? <Spin /> : undefined}
                >
                  {
                    this.roomList.list.map(item => (
                      <Select.Option
                        value={item.id}
                        title={item.roomNo}
                      >
                        {item.roomNo}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="占用时段">
            {
              this.form.getFieldDecorator('dateTimeRange', {
                initialValue: this.currentItem.appointmentStartTimeStr && this.currentItem.appointmentEndTimeStr
                  ? [moment(this.currentItem.appointmentStartTimeStr), moment(this.currentItem.appointmentEndTimeStr)]
                  : [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选择占用时段!',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker.RangePicker
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['开始时间', '结束时间']}
                  showTime={{ format: 'HH:mm' }}
                  disabledTime={() => ({
                    disabledMinutes: () => [
                      1, 2, 3, 4, 5, 6, 7, 8, 9,
                      11, 12, 13, 14, 15, 16, 17, 18, 19,
                      21, 22, 23, 24, 25, 26, 27, 28, 29,
                      31, 32, 33, 34, 35, 36, 37, 38, 39,
                      41, 42, 43, 44, 45, 46, 47, 48, 49,
                      51, 52, 53, 54, 55, 56, 57, 58, 59
                    ]
                  })}
                  allowClear
                  style={{ width: '100%' }}
                />
              )
            }
          </Form.Item>
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
                <Input.TextArea
                  placeholder="请输入"
                  autoSize={{ minRows: 6 }}
                  allowClear
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
