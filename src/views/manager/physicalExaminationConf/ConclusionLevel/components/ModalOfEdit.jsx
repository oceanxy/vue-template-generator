import '../assets/styles/index.scss'
import { Form, Row, Col, Input, Select, Table, Switch, InputNumber, Space } from 'ant-design-vue'
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
          ageLeftSymbol: '',
          ageLeftValue: 0,
          ageRightValue: 0,
          ageRighttSymbol: '',
          conclusionLevelId: '',
          conclusionLevelName: '',
          conditionLeftSymbol: '',
          conditionLeftValue: 0,
          conditionRightSymbol: '',
          conditionRightValue: 0,
          gender: '',
          id: '',
          level: 0,
          operationType: '',
          paramCode: '',
          paramName: '',
          serialNumber: 0
        }
      ],
      columns: [
        {
          title: '判断条件',
          dataIndex: 'name',
          width: 180,
          scopedSlots: { customRender: 'judgeCondition' }
        },
        {
          title: '年龄',
          dataIndex: 'age',
          width: 360,
          scopedSlots: { customRender: 'age' }
        },
        {
          title: '参数',
          dataIndex: 'address',
          width: 440,
          scopedSlots: { customRender: 'parameter' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ]
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    levelList() {
      return this.getState('levelList', this.moduleName)?.list ?? null
    }
  },

  methods: {
    // 获取指标
    async getListByItemId(itemId) {
      const res = await apis.getListByItemId({ itemId })

      if (res.status) {
        this.itemKpiList = res.data
      }

    },
    // 获取参数
    async getListByKpiId(kpiId) {
      const res = await apis.getListByKpiId({ kpiId })

      if (res.status) {
        this.parameterList = res.data
      }

    },
    // 选择项目获取指标
    onChangeItemn(e) {
      this.form.setFieldsValue({ itemKpiId: '' })
      this.getListByItemId(e)
    },
    // 选择项目获取指标
    onChangeKpi(e) {
      this.getListByKpiId(e)
    },
    customDataHandler(values) {
      const data = { ...values }

      return data
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value && this.currentItem && this.currentItem.itemId) {
          const id = this.currentItem.itemId

          this.getListByItemId(id)
        }
      }
    }
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
                      initialValue: this.currentItem.itemId
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
                      initialValue: this.currentItem?.itemKpiId
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
                    initialValue: this.currentItem.conclusionLevelName
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
                    initialValue: this.currentItem.level
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
                  this.form.getFieldDecorator('aaa', {
                    initialValue: this.currentItem.dddd,
                  })(
                    <Select>
                      <Select.Option value={1}>满足</Select.Option>
                      <Select.Option value={2}>不满足</Select.Option>
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
          <Table
            dataSource={this.infoList}
            columns={this.columns}
            pagination={false}
            bordered
            {...{
              scopedSlots: {
                judgeCondition: (text, record) => {
                  return (
                    <Row gutter={10}>
                      <Col span={12}>
                        <Select disabled={!this.itemKpiList} vModel={record.paramCode}>
                          {
                            this.parameterList?.map(item => (
                              <Select.Option value={item.id}>{item.paramName}</Select.Option>
                            ))
                          }
                        </Select>
                      </Col>
                      <Col span={12}>
                        <Select placeholder="请选择" vModel={record.gender}>
                          <Select.Option value={1} defaultValue={1}>男</Select.Option>
                          <Select.Option value={2}>女</Select.Option>
                          <Select.Option value={0}>未知</Select.Option>
                        </Select>
                      </Col>
                    </Row>
                  )
                },
                age: (text, record) => {
                  return (
                    <Row gutter={10}>
                      <Col span={6}>
                        <Select vModel={record.ageLeftSymbol} defaultValue={1}>
                          <Select.Option value={1}>包含</Select.Option>
                          <Select.Option value={2}>不包含</Select.Option>
                        </Select>
                      </Col>
                      <Col span={6}>
                        <InputNumber style={{ width: '100%' }} placeholder="请输入" vModel={record.ageLeftValue} />
                      </Col>
                      <Col span={6}>
                        <Select vModel={record.ageRighttSymbol} defaultValue={1}>
                          <Select.Option value={1} defaultValue={1}>包含</Select.Option>
                          <Select.Option value={2}>不包含</Select.Option>
                        </Select>
                      </Col>
                      <Col span={6}>
                        <InputNumber style={{ width: '100%' }} placeholder="请输入" vModel={record.ageRightValue} />
                      </Col>
                    </Row>
                  )
                },
                operation: (text, record) => (
                  <Space>
                    <Button
                      type="link"
                      size="small"
                    // onClick={() => this.onEditClick(record)}
                    >
                      点击查看
                    </Button>
                  </Space>
                )
              }
            }}
          />
        </Form>
      </DragModal >
    )
  }
})
