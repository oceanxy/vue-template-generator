import '../assets/styles/index.scss'
import { Button, Form, Input, InputNumber, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import Functions from './Functions'

export default Form.create({})({
  mixins: [forInquiry()],
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Form.Item>
          {
            this.form.getFieldDecorator('companyName')(
              <Input placeholder={'请输入企业名称'} allowClear />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('selectType')(
              <Select
                placeholder="请选择查询方式"
                allowClear
              >
                <Select.Option value={1}>按面积</Select.Option>
                <Select.Option value={2}>按单价</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item class={'number-range'}>
          <Form.Item>
            {
              this.form.getFieldDecorator('min')(
                <InputNumber
                  placeholder={'最小值'}
                  title={'单价最小值'}
                  min={0}
                  precision={2}
                />
              )
            }
          </Form.Item>
          <Form.Item class={'identifier'}>
            <Input
              placeholder={'~'}
              disabled
            />
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('max')(
                <InputNumber
                  placeholder={'最大值'}
                  title={'单价最大值'}
                  min={0}
                  precision={2}
                />
              )
            }
          </Form.Item>
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('renovationStatus')(
              <Select
                placeholder="请选择装修情况"
                allowClear
              >
                <Select.Option value={1}>简装</Select.Option>
                <Select.Option value={2}>精装</Select.Option>
                <Select.Option value={3}>豪装</Select.Option>
                <Select.Option value={4}>星级装修</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('status')(
              <Select
                placeholder="请选择状态"
                allowClear
              >
                <Select.Option value={1}>启用</Select.Option>
                <Select.Option value={2}>停用</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('useStatus')(
              <Select
                placeholder="请选择房间状态"
                allowClear
              >
                <Select.Option value={1}>预定</Select.Option>
                <Select.Option value={2}>使用中</Select.Option>
                <Select.Option value={3}>空闲</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('roomType')(
              <Select
                placeholder="请选择房间类型"
                allowClear
              >
                <Select.Option value={1}>普通房源</Select.Option>
                <Select.Option value={2}>会议室</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              loading={this.loading}
              htmlType="submit"
              type="primary"
              icon="search"
            >
              查询
            </Button>
            {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
          </Space>
        </Form.Item>
        <Functions search={this.form.getFieldsValue()} />
      </Form>
    )
  }
})
