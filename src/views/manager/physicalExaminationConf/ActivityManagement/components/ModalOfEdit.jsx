import '../assets/styles/index.scss'
import { Form, Input, Select, Button, Checkbox, List, Icon } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import SCHOOL_RIGHT from '../assets/images/school_right.svg'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 800,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      plainOptions: [''],
      school: [
        {
          title: '学校',
          ms: 'sdddddd',
          img: '../assets/images/school_left.svg'
        },
        {
          title: '学校',
          ms: 'sdddddd',
          img: '../assets/images/school_left.svg'
        },
        {
          title: '学校',
          ms: 'sdddddd',
          img: '../assets/images/school_left.svg'
        }
      ]
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'itemList',
      customApiName: 'getActivityItemList'
    })
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    yearList() {
      return this.getState('yearList', this.moduleName)?.list ?? null
    },
    itemList() {
      return this.getState('itemList', this.moduleName)?.list ?? null
    },
    schoolList() {
      return this.getState('schoolListByActivity', this.moduleName)
    }
  },

  methods: {
    async getActivityYearList() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'yearList',
        customApiName: 'getActivityYearList'
      })
    },
    customDataHandler(values) {
      const data = { ...values }

      return data
    }

  },
  watch: {
    'modalProps.visible'(value) {
      if (value) {
        this.getActivityYearList()
      }
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

    return (
      <DragModal {...attributes}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          colon={false}
        >
          <Form.Item label="活动名称">
            {
              this.form.getFieldDecorator('activityName', {
                initialValue: this.currentItem.activityName,
                rules: [
                  {
                    required: true,
                    message: '请输入活动名称!',
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
          <Form.Item label="活动类型">
            {
              this.form.getFieldDecorator(
                'activityType',
                {
                  initialValue: this.currentItem?.activityType ?? 1,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择活动类型!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择活动类型">
                  <Select.Option value={1} defaultValue={1}>普测</Select.Option>
                  <Select.Option value={2}>抽查</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="学年">
            {
              this.form.getFieldDecorator(
                'activityYear',
                {
                  initialValue: this.currentItem.activityYear,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择存档时间!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择存档时间">
                  {
                    this.yearList?.map(item => (
                      <Select.Option value={item.activityYear}>{item.activityYearStr}</Select.Option>
                    ))
                  }

                </Select>
              )
            }
          </Form.Item>

          <Form.Item label="次数">
            {
              this.form.getFieldDecorator(
                'activityFrequency',
                {
                  initialValue: this.currentItem?.activityFrequency ?? 1
                }
              )(
                <Select>
                  <Select.Option value={1} defaultValue={1}>1</Select.Option>
                  <Select.Option value={2}>2</Select.Option>
                  <Select.Option value={3}>3</Select.Option>
                  <Select.Option value={4}>4</Select.Option>
                  <Select.Option value={5}>5</Select.Option>
                </Select>
              )
            }
          </Form.Item>

          <Form.Item label="体检项">
            {
              this.form.getFieldDecorator('peItems',
                {
                  initialValue: this.currentItem.peItems
                }
              )(
                <Checkbox.Group class="checkbox-wrapper-right">
                  {
                    this.itemList?.map(item => (
                      <Checkbox value={item.id}>{item.itemName}</Checkbox>
                    ))
                  }

                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label="学校范围">
            {
              this.form.getFieldDecorator('schoolIds',
                {
                  initialValue: this.currentItem.schoolIds,
                  rules: [
                    {
                      required: true,
                      message: '请选择活动!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <div>
                  <List grid={{ gutter: 10, column: 3 }} dataSource={this.school}
                    {...{
                      scopedSlots: {
                        renderItem: item => (
                          <List.Item class="activity-management-school-item hover">
                            <Icon class="icon" component={SCHOOL_RIGHT} />
                            {/* <img src={item.img} /> */}
                            <div>
                              <div class="title">{item.title}</div>
                              <p>{item.ms}</p>
                            </div>
                            <Icon class="close" type="close-circle" />
                          </List.Item>
                        )
                      }
                    }}
                  />

                  <Button
                    type="primary"
                    onClick={() => this._setVisibleOfModal({ curActivitieId: this.curActivitieId }, 'visibleOfSchoolList')}
                  >点击选择</Button>
                </div>
              )
            }
          </Form.Item>
          <Form.Item label="数据来源活动">
            {
              this.form.getFieldDecorator('objFromId',
                {
                  initialValue: this.currentItem.objFromId,
                  rules: [
                    {
                      required: true,
                      message: '请选择活动!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select
                  placeholder="请选择活动"
                  onChange={this.onChangeActivitie}
                >
                  {
                    this.activities?.map(item => (
                      <Select.Option value={item.id}>{item.activityName}</Select.Option>
                    ))
                  }

                </Select>
              )
            }
          </Form.Item>
          {/* <Form.Item label="学校">
            {
              this.form.getFieldDecorator('schoolIds',
                {
                  initialValue: this.currentItem.schoolList?.map(item => item.schoolId)
                }
              )(
                <Row gutter={10}>
                  <Col span={20}>
                    <Input
                      placeholder="请输入"
                      allowClear
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      type="primary"
                    // onClick={() => this._setVisibleOfModal({ curActivitieId: this.curActivitieId }, 'visibleOfSchoolTre')}
                    >选择</Button>
                  </Col>
                </Row>
              )
            }
          </Form.Item>
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
          </Form.Item> */}
        </Form>
      </DragModal >
    )
  }
})
