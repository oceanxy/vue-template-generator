import forInquiry from '@/mixins/forInquiry'
import { Button, DatePicker, Form, Input, Select, Space, TreeSelect } from 'ant-design-vue'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      time: '',
      status: '',
      isS: 0
    }
  }),
  computed: {
    schoolTree() {
      return this.$store.state[this.moduleName].schoolTree
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
        <div class={'row-down'}>
          <Form.Item label="日期范围" class={'span-2'}>
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.initialValues.dateRange })(
                <DatePicker.RangePicker
                  placeholder={['开始日期', '结束日期']}
                  valueFormat={'YYYY-MM-DD'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="学校">
            {
              this.form.getFieldDecorator('schoolId', { initialValue: this.initialValues.schoolId })(
                <TreeSelect
                  showSearch
                  allowClear
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.schoolTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  searchPlaceholder={'请输入学校名称搜索'}
                  placeholder={'请选择学校'}
                  // treeDefaultExpandedKeys={[this.currentItem.schoolId || this.search.schoolId]}
                />
              )
            }
          </Form.Item>
          <Form.Item label={'登记类型'}>
            {
              this.form.getFieldDecorator('t', { initialValue: this.initialValues.time })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'病例类型'}>
            {
              this.form.getFieldDecorator('t2', { initialValue: this.initialValues.time })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'学生症状'}>
            {
              this.form.getFieldDecorator('status', { initialValue: this.initialValues.status })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'审核状态'}>
            {
              this.form.getFieldDecorator('status1', { initialValue: this.initialValues.status })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                </Select>
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
          <Form.Item label={'只看追踪病例'}>
            {
              this.form.getFieldDecorator('isS', { initialValue: this.initialValues.isS })(
                <Select>
                  <Select.Option value={1}>是</Select.Option>
                  <Select.Option value={0}>否</Select.Option>
                </Select>
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
