import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      status: '',
      itemId: ''
    }
  }),
  computed: {
    ...mapGetters({ getState: 'getState' }),
    levelList() {
      return this.getState('levelList', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'levelList',
      customApiName: 'getLevelList'
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
        <div class={'row-down'}>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', { initialValue: this.initialValues.status })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="项目">
            {
              this.form.getFieldDecorator('itemId', { initialValue: this.initialValues.itemId })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    this.levelList.list?.map(item => (
                      <Select.Option value={item.id}>{item.itemName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'名称'}>
            {
              this.form.getFieldDecorator('conclusionLevelName', { initialValue: this.initialValues.conclusionLevelName })(
                <Input placeholder={'项目名称'} />
              )
            }
          </Form.Item>
          <Form.Item label=' ' class={'form-item-btn'}>
            <Space>
              <Button
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                查询
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    )
  }
})
