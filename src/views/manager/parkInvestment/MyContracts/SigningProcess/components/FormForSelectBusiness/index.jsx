import './index.scss'
import { Button, DatePicker, Form, Input, Radio, Select } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forInquiry],
  computed: {
    ...mapGetters({
      getCurrentItem: 'getCurrentItem'
    }),
    currentItem() {
      return this.getCurrentItem(this.moduleName)
    }
  },
  render() {
    return (
      <Form
        class="bnm-select-business-form bnm-form-grid"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        colon={false}
        onSubmit={this.onSubmit}
      >
        <Form.Item label="签约企业">
          {
            this.form.getFieldDecorator('nn', {
              initialValue: this.currentItem.nn
            })(
              <Select placeholder={'输入企业名称搜索已注册企业'}>
                <Select.Option value={0}>重庆誉存科技有限公司</Select.Option>
              </Select>
            )
          }
          <ul class={'business-info-selected'}>
            <li>企业名称：<span>重庆誉存科技有限公司</span></li>
            <li>企业代码：<span>28392392509D</span></li>
            <li>所在行业：<span>信息化</span></li>
            <li>法人信息：<span>陈永森（50023982932323，13883192629）</span></li>
          </ul>
        </Form.Item>
        <Form.Item label="企业分类">
          {
            this.form.getFieldDecorator('bb', {
              initialValue: this.currentItem.bb || 0
            })(
              <Radio.Group>
                <Radio value={1}>类型名称</Radio>
                <Radio value={2}>类型名称</Radio>
                <Radio value={3}>类型名称</Radio>
                <Radio value={4}>类型名称</Radio>
                <Radio value={5}>类型名称</Radio>
                <Radio value={6}>类型名称</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label="孵化项目">
          {
            this.form.getFieldDecorator('vv', {
              initialValue: this.currentItem.vv
            })(
              <Input placeholder={'请输入'} />
            )
          }
        </Form.Item>
        <Form.Item label="签约期限">
          {
            this.form.getFieldDecorator('ff', {
              initialValue: this.currentItem.ff
            })(
              <DatePicker.RangePicker />
            )
          }
        </Form.Item>
        <Form.Item label={' '}>
          <Button type="primary" html-type="submit">下一步</Button>
        </Form.Item>
      </Form>
    )
  }
})
