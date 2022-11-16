import './index.scss'
import { Button, Form, Input, Select, Space, Spin } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    townOrSubDistricts() {
      return this.$store.state[this.moduleName].townOrSubDistricts
    }
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={e => this.onSubmit(e, {}, {
          isResetSelectedRows: false,
          customApiName: 'getSchoolsForStatisticalAnalysis'
        })}
        colon={false}
        class="tg-inquiry"
      >
        <Form.Item label={'学校名称'}>
          {
            this.form.getFieldDecorator('schoolName')(
              <Input placeholder={'请输入学校名称'} allowClear />
            )
          }
        </Form.Item>
        <Form.Item label={'镇街范围'}>
          {
            this.form.getFieldDecorator('range', { initialValue: '' })(
              <Select notFoundContent={this.townOrSubDistricts.loading ? <Spin /> : undefined}>
                <Select.Option value={''}>全部</Select.Option>
                {
                  this.townOrSubDistricts.list.map(item => (
                    <Select.Option value={item.streetId}>{item.streetName}</Select.Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label={'类型范围'}>
          {
            this.form.getFieldDecorator('schoolTypes', { initialValue: '' })(
              <Select>
                <Select.Option value={''}>全部</Select.Option>
                <Select.Option value={111}>幼儿园</Select.Option>
                <Select.Option value={211}>小学</Select.Option>
                <Select.Option value={241}>完全小学</Select.Option>
                <Select.Option value={311}>初级中学</Select.Option>
                <Select.Option value={341}>完全中学</Select.Option>
                <Select.Option value={365}>职业高中</Select.Option>
                <Select.Option value={411}>大学</Select.Option>
              </Select>
            )
          }
        </Form.Item>
        <Space class={'btn-group'}>
          <Button
            loading={this.loading}
            htmlType="submit"
            type="primary"
            icon="search"
          >
            搜索
          </Button>
          {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
        </Space>
      </Form>
    )
  }
})
