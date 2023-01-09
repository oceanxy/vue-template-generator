import { Button, DatePicker, Form, InputNumber, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { range } from 'lodash'
import { getGradeStr } from '@/utils/projectHelpers'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { allLeaf: 1, type: '', grade: '' } }),
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <div class={'row-down'}>
          <Form.Item label="时间范围" class={'span-2'}>
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
          <Form.Item label={'预警类型'}>
            {
              this.form.getFieldDecorator('type', { initialValue: this.initialValues.type })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
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
        </div>
      </Form>
    )
  }
})
