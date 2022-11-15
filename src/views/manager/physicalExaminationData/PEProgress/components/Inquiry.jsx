import '../assets/styles/index.scss'
import { Button, DatePicker, Empty, Form, Icon, Input, InputNumber, Select, Space, Spin } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import ICON from '../assets/images/icon-mark.svg'
import forInquiryAboutActivity from '@/mixins/forInquiry/forInquiryAboutActivity'

export default Form.create({})({
  mixins: [forInquiry(), forInquiryAboutActivity()],
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
                this.form.getFieldDecorator('activityId', { initialValue: this.activities.list[0]?.id ?? undefined })(
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
              this.form.getFieldDecorator('activityOrgId', { initialValue: '' })(
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
              this.form.getFieldDecorator('grade', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={4}>一年级</Select.Option>
                  <Select.Option value={5}>二年级</Select.Option>
                  <Select.Option value={6}>三年级</Select.Option>
                  <Select.Option value={7}>四年级</Select.Option>
                  <Select.Option value={8}>五年级</Select.Option>
                  <Select.Option value={9}>六年级</Select.Option>
                  <Select.Option value={10}>初一</Select.Option>
                  <Select.Option value={11}>初二</Select.Option>
                  <Select.Option value={12}>初三</Select.Option>
                  <Select.Option value={13}>高一</Select.Option>
                  <Select.Option value={14}>高二</Select.Option>
                  <Select.Option value={15}>高三</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'班级'}>
            {
              this.form.getFieldDecorator('classNumber', { initialValue: undefined })(
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
                this.form.getFieldDecorator('sNumber', { initialValue: undefined })(
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
                this.form.getFieldDecorator('eNumber', { initialValue: undefined })(
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
              this.form.getFieldDecorator('isSignOut', { initialValue: '' })(
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
              this.form.getFieldDecorator('dateRange', { initialValue: [] })(
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
              this.form.getFieldDecorator('fullName')(
                <Input placeholder={'请输入姓名'} />
              )
            }
          </Form.Item>
          <Form.Item label={'身份证号'}>
            {
              this.form.getFieldDecorator('idNumber')(
                <Input placeholder={'请输入身份证号'} allowClear />
              )
            }
          </Form.Item>
        </div>
      </Form>
    )
  }
})
