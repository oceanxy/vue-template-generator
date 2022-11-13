import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forInquiry()],

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
    console.log(this.levelList)
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
              this.form.getFieldDecorator('status', { initialValue: '' })(
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
              this.form.getFieldDecorator('itemId', { initialValue: '' })(
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
              this.form.getFieldDecorator('itemName')(
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
