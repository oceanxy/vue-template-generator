import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    param: [],
    initialValues: {
      monitorItemKpiId: '',
      monitorItemId: ''
    }
  }),
  computed: {
    ...mapGetters({ getState: 'getState' }),
    KpiAndParam() {
      return this.getState('KpiAndParam', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'KpiAndParam',
      customApiName: 'getKpiAndParam'
    })
  },
  methods: {
    onChangeKpi(e) {
      this.form.setFieldsValue({ monitorItemId: '' })
      const arr = []

      this.KpiAndParam.param.map(item => {
        if (item.kpiId === e) {
          arr.push(item)
        }
      })
      this.param = arr ?? []
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
          <Form.Item label="监测项目">
            {
              this.form.getFieldDecorator('monitorItemKpiId', { initialValue: this.initialValues.monitorItemKpiId })(
                <Select onchange={this.onChangeKpi}>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    this.KpiAndParam.kpi?.map(item => (
                      <Select.Option value={item.id}>{item.kpiName}</Select.Option>
                    ))
                  }

                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="监测参数">
            {
              this.form.getFieldDecorator('monitorItemId', { initialValue: this.initialValues.monitorItemId })(
                <Select>
                  <Select.Option value={''}>全部</Select.Option>
                  {
                    this.param?.map(item => (
                      <Select.Option value={item.id}>{item.paramName}</Select.Option>
                    ))
                  }

                </Select>
              )
            }
          </Form.Item>
          <Form.Item label={'名称'}>
            {
              this.form.getFieldDecorator('monitorName', { initialValue: this.initialValues.monitorName })(
                <Input placeholder={'告警规则名称'} />
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
