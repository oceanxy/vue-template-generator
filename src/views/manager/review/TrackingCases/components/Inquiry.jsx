import forInquiry from '@/mixins/forInquiry'
import { Button, DatePicker, Empty, Form, Input, Select, Space, Spin } from 'ant-design-vue'
import { debounce } from 'lodash'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    initialValues: {
      registerType: '',
      dateRange: [],
      traceStatus: 1,
      diseaseType: ''
    }
  }),
  computed: {
    symptoms() {
      return this.$store.state[this.moduleName].symptoms
    }
  },
  methods: {
    async onSearchForSymptom(symptomName) {
      if (symptomName) {
        await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: this.moduleName,
          stateName: 'symptoms',
          customApiName: 'getSymptomsByName',
          payload: { name: symptomName }
        })
      }
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
          <Form.Item label="上报日期" class={'span-2'}>
            {
              this.form.getFieldDecorator('dateRange', { initialValue: this.initialValues.dateRange })(
                <DatePicker.RangePicker
                  placeholder={['开始时间', '结束时间']}
                  valueFormat={'YYYYMMDD'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label={'登记类型'}>
            {
              this.form.getFieldDecorator('registerType', { initialValue: this.initialValues.registerType })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>带病上课</Select.Option>
                  <Select.Option value={2}>因病缺课</Select.Option>
                  <Select.Option value={3}>因伤缺课</Select.Option>
                  <Select.Option value={4}>其他原因缺课</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'病例类型'}>
            {
              this.form.getFieldDecorator('diseaseType', { initialValue: this.initialValues.diseaseType })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>非传染病</Select.Option>
                  <Select.Option value={2}>传染病</Select.Option>
                  <Select.Option value={3}>伤害监测</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'学生症状'}>
            {
              this.form.getFieldDecorator('symptomId', { initialValue: this.initialValues.symptomId })(
                <Select
                  placeholder="请输入症状搜索"
                  showSearch
                  onSearch={debounce(this.onSearchForSymptom, 300)}
                  filterOption={false}
                  notFoundContent={this.symptoms.loading ? <Spin /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                >
                  {
                    this.symptoms.list.map(symptom => (
                      <Select.Option value={symptom.id}>{symptom.symptomName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'追踪状态'}>
            {
              this.form.getFieldDecorator('traceStatus', { initialValue: this.initialValues.traceStatus })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  <Select.Option value={1}>跟进中</Select.Option>
                  <Select.Option value={2}>已结束</Select.Option>
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
