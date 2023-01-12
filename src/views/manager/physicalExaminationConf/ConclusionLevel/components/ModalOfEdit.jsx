import '../assets/styles/index.scss'
import { Form, Row, Col, Input, Select, Table, Switch, InputNumber, Space, Icon, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import apis from '@/apis'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 1140,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      itemKpiList: [],
      parameterList: [],
      infoList: [
        {
          key: 'sjkey',
          ageLeftSymbol: 1,
          ageLeftValue: '',
          ageRightValue: '',
          ageRighttSymbol: 1,
          conclusionLevelId: '',
          conclusionLevelName: '',
          conditionLeftSymbol: 1,
          conditionLeftValue: '',
          conditionRightSymbol: 1,
          conditionRightValue: '',
          gender: 1,
          id: 'sjkey',
          level: 0,
          operationType: '',
          paramCode: '',
          paramName: '',
          serialNumber: ''
        }
      ],
      columns: [
        {
          title: '判断条件',
          width: 180,
          scopedSlots: { customRender: 'judgeCondition' }
        },
        {
          title: '年龄',
          width: 360,
          scopedSlots: { customRender: 'age' }
        },
        {
          title: '参数',
          width: 440,
          scopedSlots: { customRender: 'parameter' }
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
        }
      ],
      operationType: '',
      itemKpiName: '',
      itemName: '',
      detailsStatus: false,
      itemKpiVal: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    levelList() {
      return this.getState('levelList', this.moduleName)?.list ?? null
    },
    disabled() {
      if (this.itemKpiList && this.itemKpiList.length > 0) {
        return false
      } else {
        return true
      }
    },
    // operationType回显
    operationTypeEcho() {
      if (this.infoList) {
        return this.infoList?.[0]?.operationType ?? 1
      }
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
        }
      }
    },
  },
  methods: {
    // 获取指标
    async getListByItemId(itemId) {
      this.levelList.map(item => {
        if (item.id === itemId) {
          this.itemName = item.itemName
        }
      })
      const res = await apis.getListByItemId({ itemId })

      if (res.status) {
        this.itemKpiList = res.data
        this.itemKpiVal = this.itemKpiList?.[0]?.id
      }
    },
    // 获取参数
    async getListByKpiId(kpiId) {
      this.itemKpiList.map(item => {
        if (item.id === kpiId) {
          this.itemKpiName = item.kpiName
        }
      })
      this.infoList = [
        {
          key: 'sjkey',
          ageLeftSymbol: 1,
          ageLeftValue: '',
          ageRightValue: '',
          ageRighttSymbol: 1,
          conclusionLevelId: '',
          conclusionLevelName: '',
          conditionLeftSymbol: 1,
          conditionLeftValue: '',
          conditionRightSymbol: 1,
          conditionRightValue: '',
          gender: 1,
          id: 'sjkey',
          level: 0,
          operationType: '',
          paramCode: '',
          paramName: '',
          serialNumber: ''
        }
      ]
      const res = await apis.getListByKpiId({ kpiId })

      if (res.status) {
        this.parameterList = res.data
        this.autoJudge()
      }
    },
    // 自动修改判断条件
    autoJudge() {
      this.infoList?.map(item => {
        if (this.parameterList) {
          item.paramCode = this.parameterList?.[0]?.paramCode
        } else {
          item.paramCode = ''
        }
      })
    },
    // 选择项目获取指标
    async onChangeItemn(e) {
      await this.getListByItemId(e)

      if (this.itemKpiList) {
        this.form.setFieldsValue({ itemKpiId: this.itemKpiVal })
      } else {
        this.form.setFieldsValue({ itemKpiId: '' })

      }

      this.infoList.map(item => {
        item.paramCode = ''
      })

    },
    // 选择项目获取指标
    onChangeKpi(e) {
      this.itemKpiVal = e
      this.getListByKpiId(e)
    },
    // 设置 infiList  operationType 满足条件
    meetConditions(e) {
      this.infoList?.map(item => {
        item.operationType = e
      })
    },
    // 新增item
    addItem() {
      const sjKey = Math.random().toString(36).substr(3, 10)
      const obj = {
        key: sjKey,
        ageLeftSymbol: 1,
        ageLeftValue: '',
        ageRightValue: '',
        ageRighttSymbol: 1,
        conclusionLevelId: '',
        conclusionLevelName: '',
        conditionLeftSymbol: 1,
        conditionLeftValue: '',
        conditionRightSymbol: 1,
        conditionRightValue: '',
        gender: 1,
        id: sjKey,
        level: 0,
        operationType: this.operationType,
        paramCode: '',
        paramName: '',
        serialNumber: ''
      }

      this.infoList.push(obj)
    },
    // 删除item
    delItem(record) {
      const index = this.infoList.findIndex(item => {
        if (item.id === record.id) {
          return true
        }
      })

      this.infoList.splice(index, 1)
    },
    // 点击获取判断条件名称
    onChangeParamCode(record) {
      if (record && this.itemKpiList && this.parameterList) {
        const paramCode = record.paramCode
        const arr = this.parameterList.filter(item => {
          if (paramCode === item.paramCode) {
            return item
          }
        })

        this.infoList.map(item => {
          if (item.id === record.id) {
            item.paramName = arr?.[0].paramName
          }
        })
      }
    },
    customDataHandler(values) {
      const data = { ...values }

      data.infoList = this.infoList ?? this.currentItem?.infoList ?? ''
      data.itemName = this.itemName ?? this.currentItem?.itemName ?? ''
      data.itemKpiName = this.itemKpiName ?? this.currentItem?.itemKpiName ?? ''

      return data
    }
  },
  watch: {
    visible: {
      async handler(value) {
        if (value) {
          if (this.currentItem && this.currentItem.itemId) {
            const itemId = this.currentItem.itemId
            const kpiId = this.currentItem.itemKpiId

            await this.getListByItemId(itemId)
            await this.getListByKpiId(kpiId)
            this.detailsStatus = true
            const res = await apis.getDetailsOfConclusionLevel({ id: this.currentItem.id })

            if (res['status']) {
              this.detailsStatus = false
              this.infoList = res.data.infoList
            }
          } else {
            const itemId = this.levelList?.[0]?.id

            await this.getListByItemId(itemId)
          }
        } else {
          this.infoList = []
        }
      }
    },
    infoList: {
      deep: true,
      handler(value) {
        if (value) {
          this.$watch(
            () => {
              this.modalProps.okButtonProps.props.disabled = false
            }
          )
        }
      }
    },
    itemKpiVal: {
      deep: true,
      handler(value) {
        if (value) {
          this.onChangeKpi(value)
        }
      }
    },

  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          colon={false}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="项目名称">
                {
                  this.form.getFieldDecorator(
                    'itemId',
                    {
                      initialValue: this.currentItem?.itemId ?? this.levelList?.[0]?.id,
                      rules: [
                        {
                          required: true,
                          message: '请选择项目名称!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择项目名称" onChange={this.onChangeItemn}>
                      {
                        this.levelList?.map(item => (
                          <Select.Option value={item.id}>{item.itemName}</Select.Option>
                        ))
                      }
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="指标名称">
                {
                  this.form.getFieldDecorator(
                    'itemKpiId',
                    {
                      initialValue: this.currentItem?.itemKpiId ?? this.itemKpiList?.[0]?.id,
                      rules: [
                        {
                          required: true,
                          message: '请选择指标名称!',
                          trigger: 'change'
                        }
                      ]
                    }
                  )(
                    <Select placeholder="请选择指标名称" onChange={this.onChangeKpi}>
                      {
                        this.itemKpiList?.map(item => (
                          <Select.Option value={item.id} defaultValue={this.itemKpiList?.[0]?.id}>{item.kpiName}</Select.Option>
                        ))
                      }
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="结论等级名称">
                {
                  this.form.getFieldDecorator('conclusionLevelName', {
                    initialValue: this.currentItem.conclusionLevelName,
                    rules: [
                      {
                        required: true,
                        message: '请输入结论等级名称!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="等级">
                {
                  this.form.getFieldDecorator('level', {
                    initialValue: this.currentItem.level,
                    rules: [
                      {
                        required: true,
                        type: 'number',
                        message: '请输入等级!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="防治建议">
                {
                  this.form.getFieldDecorator('proposal', {
                    initialValue: this.currentItem.proposal
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="备注">
                {
                  this.form.getFieldDecorator('remark', {
                    initialValue: this.currentItem.remark
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排序">
                {
                  this.form.getFieldDecorator('sortIndex', {
                    initialValue: this.currentItem.sortIndex || 0
                  })(
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="满足条件">
                {
                  this.form.getFieldDecorator('operationType', {
                    initialValue: this.operationTypeEcho,
                    rules: [
                      {
                        required: true,
                        type: 'number',
                        message: '请选择满足条件!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Select onChange={this.meetConditions} placeholder="请选择满足条件">
                      <Select.Option value={1}>满足全部条件</Select.Option>
                      <Select.Option value={2}>满足任意条件</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="状态">
                {
                  this.form.getFieldDecorator('status', {
                    initialValue: this.currentItem.status === 1,
                    valuePropName: 'checked'
                  })(
                    <Switch />
                  )
                }
              </Form.Item>
            </Col>
            <Table></Table>
          </Row>
          <Spin spinning={this.detailsStatus}>
            <Table
              dataSource={this.infoList}
              columns={this.columns}
              pagination={false}
              rowKey={'id'}
              bordered
              {...{
                scopedSlots: {
                  judgeCondition: (text, record) => {
                    return (
                      <Row gutter={6}>
                        <Col span={14}>
                          <Select disabled={this.disabled} vModel={record.paramCode} placeholder="请选择" onChange={() => this.onChangeParamCode(record)}>
                            {
                              this.parameterList?.map(item => (
                                <Select.Option value={item.paramCode}>{item.paramName}</Select.Option>
                              ))
                            }
                          </Select>
                        </Col>
                        <Col span={10}>
                          <Select placeholder="请选择" vModel={record.gender}>
                            <Select.Option value={1} defaultValue={1} >男</Select.Option>
                            <Select.Option value={2}>女</Select.Option>
                            <Select.Option value={0}>未知</Select.Option>
                          </Select>
                        </Col>
                      </Row>
                    )
                  },
                  age: (text, record) => {
                    return (
                      <Row gutter={6}>
                        <Col span={6}>
                          <Select vModel={record.ageLeftSymbol}>
                            <Select.Option value={1}>包含</Select.Option>
                            <Select.Option value={2}>不包含</Select.Option>
                          </Select>
                        </Col>
                        <Col span={6}>
                          <InputNumber style={{ width: '100%' }} placeholder="年龄" vModel={record.ageLeftValue} />
                        </Col>
                        <Col span={6}>
                          <Select vModel={record.ageRighttSymbol}>
                            <Select.Option value={1} >包含</Select.Option>
                            <Select.Option value={2}>不包含</Select.Option>
                          </Select>
                        </Col>
                        <Col span={6}>
                          <InputNumber style={{ width: '100%' }} placeholder="年龄" vModel={record.ageRightValue} />
                        </Col>
                      </Row>
                    )
                  },
                  parameter: (text, record) => {
                    return (
                      <Row gutter={6}>
                        <Col span={5}>
                          <Select vModel={record.conditionLeftSymbol}>
                            <Select.Option value={1}>包含</Select.Option>
                            <Select.Option value={2}>不包含</Select.Option>
                          </Select>
                        </Col>
                        <Col span={5}>
                          <InputNumber style={{ width: '100%' }} placeholder="参数" vModel={record.conditionLeftValue} />
                        </Col>
                        <Col span={5}>
                          <Select vModel={record.conditionRightSymbol}>
                            <Select.Option value={1} >包含</Select.Option>
                            <Select.Option value={2}>不包含</Select.Option>
                          </Select>
                        </Col>
                        <Col span={5}>
                          <InputNumber style={{ width: '100%' }} placeholder="参数" vModel={record.conditionRightValue} />
                        </Col>
                        <Col span={4}>
                          <Input placeholder="序号" vModel={record.serialNumber} />
                        </Col>
                      </Row>
                    )
                  },
                  operation: (text, record) => (
                    <Space class="icon-hover-style">
                      <Icon
                        type="plus-circle"
                        style={{ fontSize: '20px' }}
                        theme="filled"
                        onClick={() => this.addItem(record)} />
                      <Icon
                        type="minus-circle"
                        style={{ fontSize: '20px' }}
                        theme="filled"
                        onClick={() => this.delItem(record)} />
                    </Space>
                  )
                }
              }}
            />
          </Spin>
        </Form>
      </DragModal >
    )
  }
})
