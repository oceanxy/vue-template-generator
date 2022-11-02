import '../assets/styles/index.scss'
import { Button, Form, Icon, Input, InputNumber, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import ICON from '../assets/images/icon-mark.svg'

export default Form.create({})({
  mixins: [forInquiry({ plate: 'activities' })],
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
            {
              this.form.getFieldDecorator('activityId', { initialValue: this.activities.list[0]?.id ?? undefined })(
                <Select suffixIcon={<Icon type="caret-down" />}>
                  {
                    this.activities.list.map(item => (
                      <Select.Option value={item.id}>{item.activityName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
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
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
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
          </Form.Item> <Form.Item label={'班级'}>
            {
              this.form.getFieldDecorator('classNumber', { initialValue: '' })(
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
