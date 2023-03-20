import { DatePicker, Form, InputNumber, Select, Switch, Empty, Spin, Space, Checkbox } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep, debounce } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      },
      keywordOfSearchDevelopers: []
    }
  },
  computed: {
    estateListByName() {
      return this.$store.state[this.moduleName].estateListByName
    },
    natureOfTheEnterprise() {
      return this.$store.state[this.moduleName].natureOfTheEnterprise
    },
    administrativeDivision() {
      return this.$store.state['common'].administrativeDivision
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit(
            {
              customDataHandler: value => {
                const data = cloneDeep(value)
                const str = data.contractDate.replaceAll('-', '')

                data.type = data.type.length > 1 ? 3 : data.type[0]
                data.contractDate = Number(str)

                return data
              }
            }
          )


        }
      }
    }
  },
  methods: {
    setState(stateName, value = []) {
      this.$store.commit('setState', {
        value: { loading: false, list: value },
        moduleName: this.moduleName,
        stateName
      })
    },
    async onSearchForDeveloper(keyword) {
      // 搜索前，先清空上一次搜索结果缓存
      this.setState('estateListByName')
      this.keywordOfSearchDevelopers = keyword

      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'estateListByName',
        customApiName: 'getEstateListByName',
        payload: { estateName: keyword }
      })
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          // 初始化表单内的模糊查询结果，编辑模式下用列表的值作为默认值
          this.setState(
            'estateListByName',
            this.currentItem.id
              ? [
                {
                  id: this.currentItem.estateId,
                  fullName: this.currentItem.estateName
                }
              ]
              : []
          )

          if (this.currentItem && this.currentItem.id) {
            this.onSearchForDeveloper()
          }
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="选择资产">
            {
              this.form.getFieldDecorator('estateId', {
                initialValue: this.currentItem.estateId,
                rules: [
                  {
                    required: true,
                    type: 'any',
                    message: '请选择资产！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  showSearch
                  placeholder={'请选择资产（可搜索）'}
                  onSearch={debounce(this.onSearchForDeveloper, 300)}
                  filterOption={false}
                  notFoundContent={
                    this.estateListByName.loading
                      ? <Spin />
                      : this.keywordOfSearchDevelopers && !this.estateListByName.list.length
                        ? (
                          <span>查无此资产</span>
                        )
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  }
                >
                  {
                    this.estateListByName?.list.map(item => (
                      <Select.Option value={item.id}>
                        <Space size={5}>
                          <span>{item.easteName}</span>
                          <span style={'font-size:26px'}>·</span>
                          <span>{item.projectName}</span>
                        </Space>
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="备案单价" class={'half'}>
            {
              this.form.getFieldDecorator('recordSingle', {
                initialValue: this.currentItem.recordSingle,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入单价！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  max={999999999999}
                  min={0}
                  formatter={value => `${value}元`}
                  parser={value => value.replace('元', '')}
                  placeholder="请输入单价"
                  style={'width:100%'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="备案总价" class={'half'}>
            {
              this.form.getFieldDecorator('recordTotal', {
                initialValue: this.currentItem.recordTotal,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入总价！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  max={999999999999}
                  min={0}
                  formatter={value => `${value}元`}
                  parser={value => value.replace('元', '')}
                  placeholder="请输入总价"
                  style={'width:100%'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="签约时间" class={'half'}>
            {
              this.form.getFieldDecorator('contractDate', {
                initialValue: this.currentItem.contractDate,
                rules: [
                  {
                    required: true,
                    message: '请选择签约时间！',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker
                  placeholder={'选择签约时间'}
                  valueFormat={'YYYY-MM-DD'}
                  style="width: 100%"
                  allowClear
                />
              )
            }
          </Form.Item>

          <Form.Item label="记录类型" class={'half'}>
            {
              this.form.getFieldDecorator('type', {
                initialValue: this.currentItem.type,
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选记录类型！',
                    trigger: 'change'
                  }
                ]
              })(
                <Checkbox.Group disabled={!this.currentItem.id}>
                  <Checkbox value={1}>网签</Checkbox>
                  <Checkbox value={2}>预告登记</Checkbox>
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                initialValue: !isNaN(this.currentItem.status) ? this.currentItem.status === 1 : true,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})