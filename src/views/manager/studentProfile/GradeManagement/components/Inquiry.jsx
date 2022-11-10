import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    yearList() {
      return this.getState('yearList', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'yearList',
      customApiName: 'getYearList'
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
              this.form.getFieldDecorator('status', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={2}>停用</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="入学年份">
            {
              this.form.getFieldDecorator('gradeYear', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    this.yearList.years?.map(item => (
                      <Select.Option value={item} >{item}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="届数">
            {
              this.form.getFieldDecorator('gradeTh', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    this.yearList.yearsTh?.map(item => (
                      <Select.Option value={item} >{item}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="年级类型">
            {
              this.form.getFieldDecorator('gradeType', { initialValue: '' })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={0}>幼儿园</Select.Option>
                  <Select.Option value={3}>小学</Select.Option>
                  <Select.Option value={9}>初中</Select.Option>
                  <Select.Option value={12}>高中</Select.Option>
                  <Select.Option value={15}>大学</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'年级名称'}>
            {
              this.form.getFieldDecorator('gradeName')(
                <Input placeholder={'请输入年级名称'} />
              )
            }
          </Form.Item>
          <Form.Item label={'学校名称'}>
            {
              this.form.getFieldDecorator('schoolName')(
                <Input placeholder={'请输入学校名称'} />
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
