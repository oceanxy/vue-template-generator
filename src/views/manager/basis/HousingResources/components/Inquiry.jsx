import '../assets/styles/index.scss'
import { Button, Form, Input, InputNumber, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry bn-search-form"
      >
        <Space>
          <Form.Item>
            {
              this.form.getFieldDecorator('selectType')(
                <Select placeholder="请选择查询方式" allowClear>
                  <Select.Option value={1}>按面积</Select.Option>
                  <Select.Option value={2}>按单价</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item>
            <Input.Group compact class={'number-range'}>
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
              <Input
                placeholder={'~'}
                disabled
                class={'identifier'}
              />
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
            </Input.Group>
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('renovationStatus')(
                <Select placeholder="请选择装修情况" allowClear>
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
                <Select placeholder="请选择状态" allowClear>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
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
        </Space>
      </Form>
    )
  }
})
