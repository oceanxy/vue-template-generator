import { Button, DatePicker, Form, Input, Select, Space, Spin } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import '../assets/styles/index.scss'
import { debounce } from 'lodash'
import { mapGetters } from 'vuex'
import Functions from './Functions'
import dynamicState from '@/mixins/dynamicState'

export default Form.create({})({
  mixins: [
    forInquiry(),
    dynamicState({ customModuleName: 'questionnaires' })
  ],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    questionnaires() {
      return this.getState('list', 'questionnaires')
    },
    loading() {
      return this.getState('loading', 'questionnaires')
    }
  },
  methods: {
    async onQuestionnairesSearch(keyword) {
      await this.$store.dispatch('getList', {
        moduleName: 'questionnaires',
        additionalQueryParameters: {
          fullName: keyword,
          pageIndex: 0,
          pageSize: 20
        }
      })
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
        <Form.Item>
          {
            this.form.getFieldDecorator('dateRange', { initialValue: [] })(
              <DatePicker.RangePicker />
            )
          }
        </Form.Item>
        <Form.Item>{this.form.getFieldDecorator('objName')(<Input placeholder={'企业名称'} />)}</Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('reportId')(
              <Select
                placeholder="请输入关键字搜索问卷"
                showSearch
                filterOption={false}
                onSearch={debounce(this.onQuestionnairesSearch, 300)}
                notFoundContent={this.loading ? <Spin /> : undefined}
              >
                {
                  this.questionnaires.map(item => (
                    <Select.Option value={item.id}>{item.fullName}</Select.Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          <Space>
            <Button loading={this.loading} htmlType="submit" type="primary" icon="search">
              查询
            </Button>
            {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
          </Space>
        </Form.Item>
        <Functions />
      </Form>
    )
  }
})
