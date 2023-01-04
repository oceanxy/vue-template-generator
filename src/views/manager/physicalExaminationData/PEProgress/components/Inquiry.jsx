import '../assets/styles/index.scss'
import { Button, DatePicker, Empty, Form, Icon, Input, InputNumber, Select, Space, Spin } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import ICON from '@/assets/activity-mark-icon.svg'
import forInquiryAboutActivity from '@/mixins/forInquiry/forInquiryAboutActivity'
import { range } from 'lodash'
import { getGradeStr } from '@/utils/projectHelpers'

export default Form.create({})({
  mixins: [forInquiry(), forInquiryAboutActivity()],
  data: () => ({
    initialValues: {
      activityOrgId: '',
      grade: '',
      notEndId: '',
      isSignOut: '',
      dateRange: []
    }
  }),
  async created() {
    this.activityId = this.$route.query.activityId

    if (this.activityId) {
      setTimeout(this.onActivityChange(this.activityId), 600)
    }
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <div class={'row-up'}>
          <Icon class={'icon'} component={ICON} />
          <Form.Item class={'activity'}>
            <Spin spinning={this.activities.loading}>
              {
                this.form.getFieldDecorator('activityId', {
                  initialValue: this.activityId ?? this.activities.list[0]?.id ?? undefined
                })(
                  <Select
                    suffixIcon={<Icon type="caret-down" />}
                    notFoundContent={<Empty />}
                    onChange={this.onActivityChange}
                  >
                    {
                      this.activities.list.map(item => (
                        <Select.Option value={item.id}>{item.activityName}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Spin>
          </Form.Item>
          <Space class={'btn-group'}>
            <Button
              loading={this.loading}
              htmlType="submit"
              type="primary"
              icon="search"
            >
              搜索
            </Button>
            {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
          </Space>
        </div>
        <div class={'row-down'}>
          <Form.Item label="组织">
            {
              this.form.getFieldDecorator('activityOrgId', { initialValue: this.initialValues.activityOrgId })(
                <Select notFoundContent={this.organizations.loading ? <Spin /> : undefined}>
                  {
                    [
                      <Select.Option value={''}>全部</Select.Option>,
                      ...this.organizations.list.map(item => (
                        <Select.Option value={item.id} title={item.activityName}>
                          {item.activityName}
                        </Select.Option>
                      ))
                    ]
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'年级'}>
            {
              this.form.getFieldDecorator('grade', { initialValue: this.initialValues.grade })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    range(4, 16).map(number => (
                      <Select.Option value={number}>{getGradeStr(number)}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'班级'}>
            {
              this.form.getFieldDecorator('classNumber', { initialValue: this.initialValues.classNumber })(
                <InputNumber
                  min={1}
                  max={100}
                  precision={0}
                  placeholder={'请输入班级'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label={'体检完成数量'}>
            <Input.Group>
              {
                this.form.getFieldDecorator('sNumber', { initialValue: this.initialValues.sNumber })(
                  <InputNumber
                    min={0}
                    max={6}
                    precision={0}
                    placeholder={'小值'}
                    allowClear
                  />
                )
              }
              ~
              {
                this.form.getFieldDecorator('eNumber', { initialValue: this.initialValues.eNumber })(
                  <InputNumber
                    min={0}
                    max={6}
                    precision={0}
                    placeholder={'大值'}
                    allowClear
                  />
                )
              }
            </Input.Group>
          </Form.Item>
          <Form.Item label={'未完成项目'}>
            {
              this.form.getFieldDecorator('notEndId', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>不设定</Select.Option>
                  <Select.Option value={1}>身高体重</Select.Option>
                  <Select.Option value={2}>血压</Select.Option>
                  <Select.Option value={3}>肺活量</Select.Option>
                  <Select.Option value={4}>验光</Select.Option>
                  <Select.Option value={5}>内科</Select.Option>
                  <Select.Option value={6}>视力</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'是否签退'}>
            {
              this.form.getFieldDecorator('isSignOut', { initialValue: this.initialValues.isSignOut })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>已签退</Select.Option>
                  <Select.Option value={0}>未签退</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="签退时间" class={'span-2'}>
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.initialValues.dateRange })(
                <DatePicker.RangePicker
                  placeholder={['开始时间', '结束时间']}
                  valueFormat={'YYYY-MM-DD'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label={'姓名'}>
            {
              this.form.getFieldDecorator('fullName', { initialValue: this.initialValues.fullName })(
                <Input placeholder={'请输入姓名'} />
              )
            }
          </Form.Item>
          <Form.Item label={'身份证号'}>
            {
              this.form.getFieldDecorator('idNumber', { initialValue: this.initialValues.idNumber })(
                <Input placeholder={'请输入身份证号'} allowClear />
              )
            }
          </Form.Item>
        </div>
      </Form>
    )
  }
})
