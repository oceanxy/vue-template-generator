import './index.scss'
import { Button, Form, TreeSelect } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import moment from 'moment'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    buildingsForSelect() {
      return this.getState('buildingsForSelect', 'common') || []
    }
  },
  data() {
    return {
      initialBuildingId: '',
      useState: 0
    }
  },
  async created() {
    await dispatch('common', 'getBuildingsForSelect')
  },
  watch: {
    buildingsForSelect: {
      immediate: true,
      async handler(value) {
        const temp = value[0]?.children?.[0]?.id

        this.initialBuildingId = temp

        if (temp) {
          await this.setSearch()
        }
      }
    }
  },
  methods: {
    async switchState(state) {
      this.useState = state
      await this.setSearch()
    },
    async setSearch(value) {
      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        payload: {
          buildId: value || this.initialBuildingId,
          floorId: '', // 初次请求时，默认楼层为全部
          currentTime: moment().format('YYYYMMDD'), // 初次请求时，默认时间为当日
          useStatus: this.useState // 初次请求时，默认状态为全部
        }
      })
    }
  },
  render() {
    return (
      <div class={'park-status-search'}>
        <span>中心实时状态</span>
        <Form
          layout="inline"
          onSubmit={this.onSubmit}
          colon={false}
          class="tg-inquiry"
          style={{
            marginLeft: 'auto',
            width: 'auto'
          }}
        >
          <Form.Item style={{ width: '200px' }}>
            {
              this.form.getFieldDecorator('buildId', { initialValue: this.initialBuildingId || undefined })(
                <TreeSelect
                  showSearch
                  allowClear
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'bnm-select-dropdown'}
                  treeData={this.buildingsForSelect}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择楼栋'}
                  treeDefaultExpandedKeys={[this.initialBuildingId]}
                  onChange={this.setSearch}
                />
              )
            }
          </Form.Item>
          <Form.Item style={{ width: '275px' }}>
            {
              this.form.getFieldDecorator('useStatus')(
                <Button.Group>
                  <Button
                    type={this.useState === 0 ? 'primary' : ''}
                    class="custom-button"
                    onClick={() => this.switchState(0)}
                  >
                    全部
                  </Button>
                  <Button
                    type={this.useState === 1 ? 'primary' : ''}
                    class="custom-button"
                    onClick={() => this.switchState(1)}
                  >
                    已预订
                  </Button>
                  <Button
                    type={this.useState === 2 ? 'primary' : ''}
                    class="custom-button"
                    onClick={() => this.switchState(2)}
                  >
                    已签约
                  </Button>
                  <Button
                    type={this.useState === 3 ? 'primary' : ''}
                    class="custom-button"
                    onClick={() => this.switchState(3)}
                  >
                    空闲
                  </Button>
                </Button.Group>
              )
            }
          </Form.Item>
        </Form>
      </div>
    )
  }
})
