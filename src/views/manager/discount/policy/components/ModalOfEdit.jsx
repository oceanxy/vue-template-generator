import '../assets/styles/index.scss'
import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Spin, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapAction, mapMutation, mapState } from '@/utils/store'
import ModalOfRooms from './ModalOfRooms'
import moment from 'moment'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapclass: 'bnm-modal-edit-discount-policy-form'
      },
      isAllCheckbox: false,
      addressList: [],
      saleType: null
    }
  },
  computed: { ...mapState(['loading', 'details', 'saleItemList', 'companyDictionaryList']) },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getSaleItemList()
          this.getCompanyDictionaryList()

          if (this.currentItem.id) {
            await this.$store.dispatch('getDetails', {
              payload: { id: this.currentItem.id },
              moduleName: this.moduleName
            })
            this.saleType = this.details.saleType
          }
        } else {
          this.isAllCheckbox = false
          this.$store.commit('setDetails', {
            value: {},
            moduleName: this.moduleName
          })
          this.saleType = null
        }
      }
    }
  },
  methods: {
    ...mapMutation(['set_visibleOfRooms']),
    ...mapAction(['getDetail', 'getSaleItemList', 'getCompanyDictionaryList']),
    customDataHandler(values) {
      const data = { ...values }

      data.isLongTime = data.isLongTime ? 1 : 0
      data.starTime = data.starTime?.format('YYYYMMDD') ?? ''
      data.endTime = data.endTime?.format('YYYYMMDD') ?? ''

      data.itemIdList = this.saleItemList
        .filter(item => {
          const index = data.itemIdList.findIndex(item2 => item.id === item2)

          return index > -1
        })
        .map(item => {
          return {
            ...item,
            isChoice: 1
          }
        })
      // data.roomIds = this.details.roomIds
      // data.companyTypeIds = data.companyTypeIds.map(item => {
      //   const findData = this.companyDictionaryList.find(item2 => item === item2.id)
      //   return {
      //     ...findData,
      //     isCheck: 1
      //   }
      // })
      // data.scopeDesc = this.details.scopeDesc

      return data
    },
    onChangeAddressList(value, selectedOptions) {
      this.addressList = selectedOptions
    },
    onChangeRole(value, e) {
      // console.log(value, e)
    },
    onSelectRoomDone(data, statisticsData) {
      this.$store.commit('setDetails', {
        value: {
          ...this.details,
          roomIds: data,
          scopeDesc: `${statisticsData[2]}栋，${statisticsData[3]}个楼层，${statisticsData[4]}个房间`
        },
        moduleName: this.moduleName
      })
    },
    onAllCompanyDictionaryList({ target }) {
      const ids = this.companyDictionaryList.map(item => item.id)

      this.isAllCheckbox = target.checked
      this.form.setFieldsValue({ companyTypeIds: this.isAllCheckbox ? ids : [] })
    },
    onchangeSaleType(e) {
      this.form.setFieldsValue({ saleAmount: undefined })
      this.saleType = e.target.value
    },
    onChangeIsLongTime(checked) {
      this.$store.commit('setDetails', {
        value: {
          ...this.details,
          isLongTime: checked ? 1 : 0
        },
        moduleName: this.moduleName
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    const validateNum = (rule, value, callback) => {
      if (value) {
        callback()

        return
      }

      callback(new Error('请输入'))
    }

    return (
      <DragModal {...attributes}>
        <Spin spinning={this.loading}>
          <Form
            class=""
            colon={false}
          >
            <Row gutter={10}>
              <Col span={24}>
                <Form.Item label="政策名称">
                  {this.form.getFieldDecorator('ruleName', {
                    initialValue: this.details.ruleName || undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入政策名称!',
                        trigger: 'blur'
                      }
                    ]
                  })(<Input placeholder="请输入"></Input>)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="长期有效">
                  {this.form.getFieldDecorator('isLongTime', {
                    initialValue: this.details.isLongTime === 1,
                    valuePropName: 'checked'
                  })(<Switch onchange={checked => this.onChangeIsLongTime(checked)}></Switch>)}
                </Form.Item>
              </Col>
              {this.details.isLongTime === 1 ? null : (
                <Col span={12}>
                  <Form.Item label="开始日期">
                    {this.form.getFieldDecorator('starTime', {
                      initialValue: this.details.starTime ? moment(`${this.details.starTime}`, 'YYYYMMDD') : undefined,
                      rules: [
                        {
                          required: true,
                          type: 'object',
                          message: '请选择开始日期!',
                          trigger: 'change'
                        }
                      ]
                    })(<DatePicker
                      placeholder="请选择"
                      allowClear
                    />)}
                  </Form.Item>
                </Col>
              )}
              {this.details.isLongTime === 1 ? null : (
                <Col span={12}>
                  <Form.Item label="结束日期">
                    {this.form.getFieldDecorator('endTime', {
                      initialValue: this.details.endTime ? moment(`${this.details.endTime}`, 'YYYYMMDD') : undefined,
                      rules: [
                        {
                          required: true,
                          type: 'object',
                          message: '请选择结束日期!',
                          trigger: 'change'
                        }
                      ]
                    })(<DatePicker
                      placeholder="请选择"
                      allowClear
                    />)}
                  </Form.Item>
                </Col>
              )}
              <Col span={24}>
                <Form.Item label="优惠费项">
                  {this.form.getFieldDecorator('itemIdList', {
                    initialValue: (this.details.itemIdList || []).map(item => item.id),
                    rules: [
                      {
                        required: true,
                        type: 'array',
                        message: '请选择优惠费项!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Checkbox.Group>
                      {this.saleItemList.map(item => (
                        <Checkbox value={item.id}>{item.itemName}</Checkbox>
                      ))}
                    </Checkbox.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="折扣力度">
                  {this.form.getFieldDecorator('saleType', {
                    initialValue: this.details.saleType || undefined,
                    rules: [
                      {
                        required: true,
                        type: 'number',
                        message: '折扣力度!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Radio.Group onchange={this.onchangeSaleType}>
                      <Radio value={1}>按比例优惠</Radio>
                      <Radio value={2}>按金额优惠</Radio>
                      <Radio value={3}>月度金额减免</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              {this.saleType === 1 ? (
                <Col span={24}>
                  <Form.Item label=" ">
                    {this.form.getFieldDecorator('saleAmount', {
                      initialValue: this.details.saleAmount || undefined,
                      rules: [
                        {
                          required: true,
                          validator: validateNum,
                          message: '请输入金额!',
                          trigger: 'blur'
                        }
                      ]
                    })(
                      <InputNumber
                        min={0}
                        max={100}
                        step={0.1}
                        placeholder="请输入0~100，支持1位小数"
                        allowClear
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
              ) : null}
              {this.saleType === 2 ? (
                <Col span={24}>
                  <Form.Item label=" ">
                    {this.form.getFieldDecorator('saleAmount', {
                      initialValue: this.details.saleAmount || undefined,
                      rules: [
                        {
                          required: true,
                          validator: validateNum,
                          message: '请输入金额!',
                          trigger: 'blur'
                        }
                      ]
                    })(<InputNumber
                      placeholder="请输入"
                      step={0.1}
                      allowClear
                      style={{ width: '100%' }}
                    />)}
                  </Form.Item>
                </Col>
              ) : null}
              {this.saleType === 3 ? (
                <Col span={24}>
                  <Form.Item label=" ">
                    {this.form.getFieldDecorator('saleAmount', {
                      initialValue: this.details.saleAmount || undefined,
                      rules: [
                        {
                          required: true,
                          validator: validateNum,
                          message: '请输入减免月份数!',
                          trigger: 'blur'
                        }
                      ]
                    })(<InputNumber
                      placeholder="请输入减免月份数"
                      step={1}
                      allowClear
                      style={{ width: '100%' }}
                    />)}
                  </Form.Item>
                </Col>
              ) : null}
              {/* <Col span={24}>
              <Form.Item label="优惠范围">
                <Button onclick={() => this.set_visibleOfRooms(true)}>选择房源</Button>
                {this.details.scopeDesc ? <Alert type="success" message={this.details.scopeDesc}></Alert> : null}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="优惠对象">
                {this.form.getFieldDecorator('contractType', {
                  initialValue: this.details.contractType || 1,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择优惠对象!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Radio.Group>
                    <Radio value={1}>所有类型</Radio>
                    <Radio value={2}>新签约企业</Radio>
                    <Radio value={3}>续约企业</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="优惠类型">
                <Checkbox checked={this.isAllCheckbox} onchange={this.onAllCompanyDictionaryList}>
                  全选
                </Checkbox>
                <Card>
                  {this.form.getFieldDecorator('companyTypeIds', {
                    initialValue: (this.details.companyTypeIds || []).map(item => item.id),
                    rules: [
                      {
                        required: true,
                        type: 'array',
                        message: '请选择优惠类型!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Checkbox.Group>
                      {this.companyDictionaryList.map(item => (
                        <Checkbox value={item.id}>{item.fullName}</Checkbox>
                      ))}
                    </Checkbox.Group>
                  )}
                </Card>
              </Form.Item>
            </Col> */}
              <Col span={24}>
                <Form.Item label="优惠互斥">
                  {this.form.getFieldDecorator('isCoexist', {
                    initialValue: !isNaN(this.details.isCoexist) ? this.details.isCoexist : 1,
                    rules: [
                      {
                        required: true,
                        type: 'number',
                        message: '请选择优惠互斥!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Radio.Group>
                      <Radio value={1}>可与其他优惠共存</Radio>
                      <Radio value={0}>不可与其他优惠共存</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="排序">
                  {this.form.getFieldDecorator('sortIndex', { initialValue: this.details.sortIndex || 0 })(
                    <InputNumber
                      placeholder="越大排在越前"
                      allowClear
                      style={{ width: '100%' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="状态">
                  {this.form.getFieldDecorator('status', {
                    initialValue: this.details.status === undefined ? true : this.details.status === 1,
                    valuePropName: 'checked'
                  })(<Switch />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>

        <ModalOfRooms ondone={this.onSelectRoomDone}></ModalOfRooms>
      </DragModal>
    )
  }
})
