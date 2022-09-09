import './assets/styles/index.scss'
import { Button, Col, DatePicker, Form, Input, message, Row, Select, TimePicker } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import apis from '@/apis'
import { debounce } from 'lodash'

export default Form.create({})({
  data() {
    return {
      loading: false,
      roomList: [],
      meetingRoomAppointmentList: []
    }
  },
  mounted() {
    const { id } = this.$route.params

    if (id) {
      this.roomList = [{ ...this.$route.params }]
    } else {
      this.getList()
    }
  },
  methods: {
    onSearchRoom: debounce(function(value) {
      this.getList(value)
    }, 500),
    //检索
    async getList(value) {
      const query = {
        pageIndex: 0,
        pageSize: 10,
        roomNo: value
      }
      const res = await apis.getBookMeetingRoom(query)

      if (res.status) {
        this.roomList = res.data.rows || []
      }
    },
    //读取预约列表
    async getSubscribeList() {
      const query = {
        id: this.form.getFieldValue('roomId'),
        appointmentDateDay: this.form.getFieldValue('date')
      }

      if (!query.id || !query.appointmentDateDay) return

      query.appointmentDateDay = query.appointmentDateDay.format('YYYYMMDD')
      const res = await apis.getMeetingRoomAppointmentList(query)

      if (res.status) {
        this.meetingRoomAppointmentList = res.data || []
      }
    },
    onChangeRoom: debounce(function() {
      this.getSubscribeList()
    }, 500),
    onChangeDate: debounce(function() {
      this.getSubscribeList()
    }, 500),
    async submit(values) {
      const date = values.date.format('YYYYMMDD')
      const form = {
        appointmentStartTime: `${date}${values.startTime.format('HHmm')}`,
        appointmentEndTime: `${date}${values.endTime.format('HHmm')}`,
        description: values.description,
        roomId: values.roomId
      }

      this.loading = true
      const res = await apis.addBookMeetingRoom(form)

      this.loading = false

      if (res.status) {
        message.success('提交成功')
        this.$router.go(-1)
      }
    },
    async onSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return

        this.submit(values)
      })
    },
    disabledDate(date) {
      const newDate = new Date()

      newDate.setDate(newDate.getDate() - 1)

      return date.isBefore(newDate)
    }
  },
  render() {
    const getDiffTime = () => {
      const startTime = this.form.getFieldValue('startTime')
      const endTime = this.form.getFieldValue('endTime')

      if (!startTime || !endTime) return ''

      return `${endTime.diff(startTime, 'hours', true).toFixed(1)}小时`
    }

    return (
      <BNContainer width="100%" modalTitle="会议室预约 > 立即预约" class="bn-book-meeting-room--book">
        <Form class="book-meeting-room-form" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onsubmit={this.onSubmit}>
          <Form.Item label="会议室">
            {this.form.getFieldDecorator('roomId', {
              initialValue: this.$route.params?.id || undefined,
              rules: [
                {
                  required: true, message: '请选择会议室', trigger: 'change'
                }
              ]
            })(
              <Select
                showSearch={true}
                placeholder="请选择"
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onsearch={this.onSearchRoom}
                onchange={() => this.onChangeRoom()}
              >
                {this.roomList.map(item => (
                  <Select.Option key={item.id}>
                    {item.roomNo}({['普通房源', '会议室'][+item.roomType - 1]})
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="会议日期">
            {this.form.getFieldDecorator('date', {
              rules: [
                {
                  required: true, type: 'object', message: '请选择会议日期', trigger: 'change'
                }
              ]
            })(<DatePicker disabledDate={this.disabledDate} onchange={() => this.onChangeDate()} />)}
          </Form.Item>
          {this.meetingRoomAppointmentList.length > 0 ? (
            <Form.Item label=" " colon={false}>
              <div class="prompt">
                <div>本会议室当日预约情况：</div>
                {this.meetingRoomAppointmentList.map(item => {
                  return <div>{item.name}</div>
                })}
              </div>
            </Form.Item>
          ) : null}
          <Form.Item label="预约时间" style={{ 'margin-bottom': '0px' }}>
            <Row>
              <Col span={6}>
                <Form.Item>
                  {this.form.getFieldDecorator('startTime', {
                    rules: [
                      {
                        required: true, type: 'object', message: '请选择开始时间', trigger: 'change'
                      }
                    ]
                  })(<TimePicker format="HH:mm" minuteStep={10} placeholder="开始时间" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  {this.form.getFieldDecorator('endTime', {
                    rules: [
                      {
                        required: true, type: 'object', message: '请选择结束时间', trigger: 'change'
                      }
                    ]
                  })(<TimePicker format="HH:mm" minuteStep={10} placeholder="结束时间" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="占用时长">
            {this.form.getFieldDecorator('timeDuration', { initialValue: getDiffTime() })(<Input
              disabled
              placeholder="请输入"
            ></Input>)}
          </Form.Item>
          <Form.Item label="用途说明">
            {
              this.form.getFieldDecorator('description', {})(
                <Input.TextArea
                  placeholder={'请输入用途说明'}
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button loading={this.loading} type="primary" htmlType="submit">
              提交预约
            </Button>
          </Form.Item>
        </Form>
      </BNContainer>
    )
  }
})
