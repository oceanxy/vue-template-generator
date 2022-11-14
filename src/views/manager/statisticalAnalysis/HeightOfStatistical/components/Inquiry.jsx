import '../assets/styles/index.scss'
import { Checkbox, Empty, Form, Icon, Radio, Select, Spin } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import forTableAboutActivity from '@/views/manager/statisticalAnalysis/mixins/forTableAboutActivity'

export default Form.create({})({
  mixins: [forInquiry(), forTableAboutActivity({ type: 1 })],
  render() {
    return (
      <div class="tg-inquiry">
        <div class={'row-title'}>
          <p class={'title'}>
            {`重庆市${'北碚区'}${'20-30年'}学年度身高统计`}
            <span class={'highlight'}>（男生）</span>
          </p>
          <p class={'info'}>
            统计范围：
            <span>{}</span>个镇街，
            <span>{}</span>所学校，
            <span>{}</span>条数据。
            数据来源：<span>{}</span>
          </p>
        </div>
        <Form
          onSubmit={this.onSubmit}
          class={'row-inquiry'}
        >
          <Form.Item class={'activity'} label={'数据来源'}>
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
          <Form.Item label={'镇街范围'}>
            {
              this.form.getFieldDecorator('range', { initialValue: [] })(
                <Checkbox.Group>
                  <Spin spinning={this.townOrSubDistricts.loading}>
                    {
                      this.townOrSubDistricts.list.map(item => (
                        <Checkbox value={item.streetId}>{item.streetName}</Checkbox>
                      ))
                    }
                  </Spin>
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label={'类型范围'}>
            {
              this.form.getFieldDecorator('schoolTypes', { initialValue: [] })(
                <Checkbox.Group>
                  <Checkbox value={1}>幼儿园</Checkbox>
                  <Checkbox value={2}>小学</Checkbox>
                  <Checkbox value={3}>完全小学</Checkbox>
                  <Checkbox value={4}>初级中学</Checkbox>
                  <Checkbox value={5}>完全中学</Checkbox>
                  <Checkbox value={6}>职业高中</Checkbox>
                  <Checkbox value={7}>大学</Checkbox>
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label={'性别范围'}>
            {
              this.form.getFieldDecorator('gender', { initialValue: [] })(
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                  <Radio value={3}>不限</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
        </Form>
      </div>
    )
  }
})
