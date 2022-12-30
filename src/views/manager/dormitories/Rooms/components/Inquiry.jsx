import { Button, Form, Input, Select, Space, TreeSelect } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: { status: '' } }),
  computed: {
    floorTree() {
      return this.$store.state[this.moduleName].floorTree
    },
    treeIdField() {
      return this.$store.state[this.moduleName].treeIdField
    }
  },
  created() {
    this.$watch(() => [this.search[this.treeIdField], this.treeIdField], async value => {
      if (value) {
        this.form.setFieldsValue({ 'floorId': undefined })
        await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: this.moduleName,
          stateName: 'floorTree',
          payload: { [this.treeIdField]: this.search[this.treeIdField] },
          customApiName: 'getFloorTreeBySchoolTree'
        })
      }
    })
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
          <Form.Item label={'位置'}>
            {
              this.form.getFieldDecorator('floorId', { initialValue: this.initialValues.floorId })(
                <TreeSelect
                  allowClear
                  treeNodeFilterProp={'title'}
                  dropdownStyle={{ maxHeight: '300px' }}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.floorTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  placeholder={'请选择楼层'}
                />
              )
            }
          </Form.Item>
          <Form.Item label={'楼栋名称'}>
            {
              this.form.getFieldDecorator('buildName', { initialValue: this.initialValues.buildName })(
                <Input placeholder={'请输入楼栋名称'} />
              )
            }
          </Form.Item>
          <Form.Item label={'状态'}>
            {
              this.form.getFieldDecorator('status', { initialValue: this.initialValues.status })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>正常</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
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
      </Form>
    )
  }
})
