import './index.scss'
import { Button, Form, Space, TreeSelect } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import moment from 'moment'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    ...mapGetters({
      buildingsForSelect: 'buildingsForSelect'
    })
  },
  data() {
    return {
      initialBuildingId: '',
      useState: 0
    }
  },
  async created() {
    if (!this.buildingsForSelect.length) {
      await dispatch('common', 'getBuildingsForSelect')
    }

    await this.setSearch()
  },
  watch: {
    buildingsForSelect: {
      immediate: true,
      handler(value) {
        const temp = value?.[0].children?.[0].id

        if (value?.[0].children?.[0].id) {
          this.initialBuildingId = temp
        }
      }
    }
  },
  methods: {
    async switchState(state) {
      this.useState = state
      await this.setSearch()
    },
    async setSearch() {
      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        payload: {
          floorId: this.initialBuildingId,
          useStatus: this.useState,
          currentTime: moment().format('YYYYMMDD')
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
          class="tg-inquiry bn-search-form"
        >
          <Space>
            <Form.Item>
              {
                this.form.getFieldDecorator('pageName1', {
                  initialValue: this.initialBuildingId
                })(
                  <TreeSelect
                    showSearch
                    allowClear
                    dropdownClassName={'bnm-select-dropdown'}
                    treeData={this.buildingsForSelect}
                    replaceFields={{ children: 'children', title: 'name', key: 'id', value: 'id' }}
                    searchPlaceholder={'请输入关键字以搜索'}
                    placeholder={'请选择楼栋'}
                    treeDefaultExpandedKeys={[this.initialBuildingId]}
                  />
                )
              }
            </Form.Item>
            <Form.Item style={{ width: '275px' }}>
              {
                this.form.getFieldDecorator('pageName')(
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
                      空闲
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
                      已预订
                    </Button>
                  </Button.Group>
                )
              }
            </Form.Item>
          </Space>
        </Form>
      </div>
    )
  }
})
