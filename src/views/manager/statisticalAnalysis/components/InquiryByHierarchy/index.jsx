import { Button, Form, Select, Space, Spin } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry({ isFetchList: false })],
  computed: {
    activities() {
      return this.$store.state[this.moduleName].activities
    },
    hierarchy: {
      get() {
        return this.$store.state[this.moduleName].hierarchy
      },
      set(value) {
        this.$store.commit('setState', {
          value: value,
          moduleName: this.moduleName,
          stateName: 'hierarchy'
        })
      }
    }
  },
  async created() {
    // 为列表的必传参数赋值，如果这里有多个必传参数，需在所有必传参数都获取成功后才能进行下一步，
    // 建议使用 Promise.all()

    const status = await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'activities',
      customApiName: 'getActivitiesForSelect'
    })

    if (status) {
      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        payload: { activityId: this.activities.list[0]?.id ?? undefined },
        isFetchList: false
      })
    }
  },
  methods: {
    return() {
      if (this.hierarchy === 'class') {
        this.hierarchy = 'grade'
      } else if (this.hierarchy === 'grade') {
        this.hierarchy = 'school'
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
          <Form.Item label={'活动名称'} required={false}>
            {
              this.form.getFieldDecorator('activityId', {
                initialValue: this.activities.list[0]?.id ?? undefined,
                rules: [
                  {
                    required: true,
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder={'请选择活动'}
                  notFoundContent={this.activities.loading ? <Spin /> : undefined}
                >
                  {
                    this.activities.list.map(item => (
                      <Select.Option value={item.id}>{item.activityName}</Select.Option>
                    ))
                  }
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
          {
            this.hierarchy && this.hierarchy !== 'school'
              ? (
                <Button
                  icon={'arrow-left'}
                  class={'return'}
                  onClick={this.return}
                >
                  返回
                </Button>
              )
              : null
          }
        </div>
      </Form>
    )
  }
})
