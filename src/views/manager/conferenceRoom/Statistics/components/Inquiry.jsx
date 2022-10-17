import '../assets/styles/index.scss'
import { Button, DatePicker, Form, Input, Space } from 'ant-design-vue'
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
        <Form.Item class={'tg-inquiry-date-range'}>
          {
            this.form.getFieldDecorator('monthRange', { initialValue: [] })(
              <DatePicker.RangePicker
                mode={['month', 'month']}
                format={'YYYY-MM'}
                placeholder={['开始月份', '结束月份']}
                allowClear
                onPanelChange={monthRange => this.form.setFieldsValue({ monthRange })}
              />
            )
          }
        </Form.Item>
        {/*<Form.Item>*/}
        {/*  {*/}
        {/*    this.form.getFieldDecorator('companyName')(*/}
        {/*      <Input*/}
        {/*        placeholder="企业名称"*/}
        {/*        allowClear*/}
        {/*      />*/}
        {/*    )*/}
        {/*  }*/}
        {/*</Form.Item>*/}
        <Form.Item>{
          this.form.getFieldDecorator('roomNo')(
            <Input
              placeholder="会议室编号"
              allowClear
            />
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
        <Functions />
      </Form>
    )
  }
})
