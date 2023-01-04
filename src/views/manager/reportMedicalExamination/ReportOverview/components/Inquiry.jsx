import forInquiry from '@/mixins/forInquiry'
import { Alert, Button, Form, InputNumber, Select, Space, TreeSelect } from 'ant-design-vue'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      time: '',
      status: ''
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
        <Space>
          <Form.Item label="学校" class={'half'}>
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
          <Form.Item label={'上报时段'}>
            {
              this.form.getFieldDecorator('t', { initialValue: this.initialValues.time })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'上报状态'}>
            {
              this.form.getFieldDecorator('status', { initialValue: this.initialValues.status })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
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
        </Space>
        <Alert
          banner
          type={'warning'}
          message={
            <Space>
              <span>您有未到校学生待处理</span>
              <Button size={'small'} type={'dashed'}>立即处理</Button>
            </Space>
          }
        />
      </Form>
    )
  }
})
