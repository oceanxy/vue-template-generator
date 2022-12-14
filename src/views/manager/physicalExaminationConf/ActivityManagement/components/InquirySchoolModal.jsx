import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Row, Col } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import apis from '@/apis'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({
    schoolStreeList: [],
    initialValues: {
      streetId: '',
      schoolType: ''
    }
  }),
  async created() {
    await this.getSchoolStreetList()
  },
  methods: {
    async getSchoolStreetList() {
      const { status, data } = await apis.getSchoolStreetList()

      if (status) {
        this.schoolStreeList = data
        console.log(this.schoolStreeList)
      }
    },
    async onSearch(payload) {
      await this.$store.dispatch('setSearch', {
        moduleName: 'activityManagement',
        stateName: 'activeSchoolList',
        customApiName: 'getListBySearch',
        payload
      })
    }
  },
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="街道">
              {
                this.form.getFieldDecorator('streetId', { initialValue: this.initialValues.streetId })(
                  <Select>
                    <Select.Option value={''}>全部</Select.Option>
                    {
                      this.schoolStreeList?.map(item => (
                        <Select.Option value={item.id}>{item.name}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="类型">
              {
                this.form.getFieldDecorator('schoolType', { initialValue: this.initialValues.schoolType })(
                  <Select>
                    <Select.Option value={''}>全部</Select.Option>
                    <Select.Option value={1}>幼儿园</Select.Option>
                    <Select.Option value={2}>小学</Select.Option>
                    <Select.Option value={3}>完全小学</Select.Option>
                    <Select.Option value={4}>初级中学</Select.Option>
                    <Select.Option value={5}>完全中学</Select.Option>
                    <Select.Option value={6}>职业高中</Select.Option>
                    <Select.Option value={7}>大学</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item label={'名称'}>
              {
                this.form.getFieldDecorator('fullName')(
                  <Input placeholder={'学校名称'} />
                )
              }
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label=' ' class={'form-item-btn'}>
              <Button
                style={{ width: '100%' }}
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                查询
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
})
