import '../assets/styles/index.scss'
import { Form, Input, Select, Button, Checkbox, List, Icon, TreeSelect, DatePicker, Switch, InputNumber } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import apis from '@/apis'
import SCHOOL_RIGHT from '../assets/images/school_right.svg'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 800,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      plainOptions: ['']
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
    details() {
      return this.$store.state[this.moduleName].details
    },
    yearList() {
      return this.getState('yearList', this.moduleName)?.list ?? null
    },
    activeSchoolList() {
      return this.getState('activeSchoolList', this.moduleName)
    },
    itemList() {
      return this.getState('itemList', this.moduleName)?.list ?? null
    },
    schoolList() {
      return this.getState('schoolListByActivity', this.moduleName)
    },
    organsTree() {
      return this.getState('organsTree', this.moduleName)?.list ?? null
    },
    // 回显体检项
    peItemId() {
      const ids = this.details?.peItemIds?.split(',') ?? []

      return ids.map(item => { return item })
    },
    organIdList() {
      const organIds = this.details?.organIds?.split(',') || []

      return organIds.map(item => { return item })
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

    // 学校列表
    rightSchool: {
      get() {
        return this.getState('rightSchool', this.moduleName)
      },
      set(value) {
        this.$store.commit('setState', {
          value: value,
          moduleName: this.moduleName,
          stateName: 'rightSchool'
        })
      }
    },
    checkSchool: {
      get() {
        return this.getState('checkSchool', this.moduleName)
      },
      set(value) {
        this.$store.commit('setState', {
          value: value,
          moduleName: this.moduleName,
          stateName: 'checkSchool'
        })
      }
    },
  },
  methods: {
    async getActivityYearList() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'yearList',
        customApiName: 'getActivityYearList'
      })
    },
    // 获取组织树
    async getGetOrgansTree() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'organsTree',
        customApiName: 'getOrganOnlyTree',
        payload: {
          parentId: 0
        }
      })
    },

    // 选择学校
    onChangeSelect(value, label) {
      this.organNames = label.join()
      console.log(value, label)
    },
    async selectSchool() {
      await this.$store.dispatch('setModalVisible', {
        statusField: 'visibilityOfSchoolList',
        statusValue: true,
        moduleName: 'activityManagement'
      })
    },
    // 点击获取体检项目
    onChangePeItemName(e) {
      const itemNames = []

      e.forEach(item => {
        this.itemList.map(item2 => {
          if (item2.id === item) {
            console.log(item2.itemName)
            itemNames.push(item2.itemName)
          }
        })
      })
      this.itemNames = itemNames
    },
    // 删除学校
    async deleteSchool(id) {
      await dispatch(this.moduleName, 'delSchoolItem', id)
    },
    customDataHandler(values) {
      const data = { ...values }
      const endTime = data.endTime.replace(/[^\d]/g, '')
      const startTime = data.startTime.replace(/[^\d]/g, '')

      data.peItemIds = data.peItemIds?.toString() ?? ''
      data.peItems = this.itemNames?.toString() ?? this.details?.peItems ?? ''
      data.endTime = Number(endTime) ?? this.details?.endTime ?? ''
      data.startTime = Number(startTime) ?? this.details?.startTime ?? ''
      data.organIds = data.organIds?.join() ?? this.details?.organIds ?? ''
      data.organNames = this.organNames ?? this.details?.organNames ?? ''
      data.schoolIds = this.checkSchool ?? ''
      data.unitNum = this.itemNames?.length ?? this.details?.unitNum ?? 0

      return data
    }

  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getActivityYearList()
          this.getGetOrgansTree()
        } else {
          this.checkSchool = []
          this.rightSchool = []
        }

        if (value && this.currentItem.id) {
          const { data } = await apis.getDetailsOfActivityManagement({ id: this.currentItem.id })

          await this.$store.commit('setState', {
            value: data,
            stateName: 'details',
            moduleName: this.moduleName
          })
        } else {
          await this.$store.commit('setState', {
            value: '',
            stateName: 'details',
            moduleName: this.moduleName
          })
        }
      }
    },
    details: {
      deep: true,
      async handler(value) {
        if (value && value?.id) {
          const schoolArr = []
          const schoolIds = value?.schoolIds?.split(',') || []
          const status = await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'activeSchoolList',
            customApiName: 'getListBySearch'
          })

          if (status) {
            schoolIds.forEach(item => {
              this.activeSchoolList.list.filter(item2 => {
                if (item2.id === item) {
                  schoolArr.push(item2)
                }
              })
            })

            this.checkSchool = this.rightSchool = schoolArr
          }
        } else {
          this.checkSchool = []
        }
      }
    },
    checkSchool: {
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
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          colon={false}
        >
          <Form.Item label="活动名称">
            {
              this.form.getFieldDecorator('activityName', {
                initialValue: this.details.activityName,
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
                  initialValue: this.details?.activityType ?? 1,
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
                  initialValue: this.details?.activityYear || new Date().getFullYear(),
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
                      <Select.Option
                        value={item.activityYear}
                        defaultValue={this.yearList?.[0].activityYear}
                      >{item.activityYearStr}</Select.Option>
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
                  initialValue: this.details?.activityFrequency ?? 1
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
              this.form.getFieldDecorator('peItemIds',
                {
                  initialValue: this.peItemId
                }
              )(
                <Checkbox.Group class="checkbox-wrapper-right" onChange={this.onChangePeItemName}>
                  {
                    this.itemList?.map(item => (
                      <Checkbox value={item.id} name={item.itemName}>{item.itemName}</Checkbox>
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
                  initialValue: this.checkSchool
                }
              )(
                <div class="activity-management-school">
                  <List
                    loading={this.activeSchoolList.loading}
                    grid={{ gutter: 10, column: 3 }}
                    dataSource={this.checkSchool}
                    {...{
                      scopedSlots: {
                        renderItem: item => (
                          <List.Item class="activity-management-school-item hover">
                            <Icon class="icon" component={SCHOOL_RIGHT} />
                            {/* <img src={item.img} /> */}
                            <div>
                              <div class="title">{item.fullName}</div>
                              <p>{item.fullNamePinyin}</p>
                            </div>
                            <span onClick={() => this.deleteSchool(item.id)} >
                              <Icon class="close" type="close-circle" />
                            </span>
                          </List.Item>
                        )
                      }
                    }}
                  />

                  <Button
                    type="primary"
                    onClick={() => this.selectSchool()}
                  >点击选择</Button>
                </div>
              )
            }
          </Form.Item>
          <Form.Item label="选择组织">
            {
              this.form.getFieldDecorator(
                'organIds',
                {
                  initialValue: this.organIdList,
                  rules: [
                    {
                      required: true,
                      type: 'array',
                      message: '请选择组织!',
                      trigger: 'blur'
                    }
                  ]
                }
              )(
                <TreeSelect
                  style="width: 100%"
                  treeData={this.organsTree}
                  multiple
                  treeCheckable
                  placeholder="请选择组织"
                  suffixIcon={<Icon type="caret-down" />}
                  treeNodeFilterProp={'title'}
                  dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  onChange={this.onChangeSelect}
                ></TreeSelect>
              )
            }
          </Form.Item>
          <Form.Item label="选择时间" style="margin-bottom:0;" required={true}>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 6px)', marginRight: '12px' }}>
              {
                this.form.getFieldDecorator('startTime',
                  {
                    initialValue: this.details.startTimeStr,
                    rules: [
                      {
                        required: true,
                        message: '请选择开始时间!',
                        trigger: 'change'
                      }
                    ]
                  }
                )(
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder={'开始时间'}
                    valueFormat={'YYYY-MM-DD HH:mm:ss'}
                    showTime
                    disabledTime={() => ({
                      disabledMinutes: () => [
                        1, 2, 3, 4, 5, 6, 7, 8, 9,
                        11, 12, 13, 14, 15, 16, 17, 18, 19,
                        21, 22, 23, 24, 25, 26, 27, 28, 29,
                        31, 32, 33, 34, 35, 36, 37, 38, 39,
                        41, 42, 43, 44, 45, 46, 47, 48, 49,
                        51, 52, 53, 54, 55, 56, 57, 58, 59
                      ]
                    })}
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 6px)' }}>
              {
                this.form.getFieldDecorator('endTime',
                  {
                    initialValue: this.details.endTimeStr,
                    rules: [
                      {
                        required: true,
                        message: '请选择结束时间!',
                        trigger: 'change'
                      }
                    ]
                  }
                )(
                  <DatePicker
                    style={{ width: '100%' }}
                    placeholder={'结束时间'}
                    valueFormat={'YYYY-MM-DD HH:mm:ss'}
                    showTime
                    disabledTime={() => ({
                      disabledMinutes: () => [
                        1, 2, 3, 4, 5, 6, 7, 8, 9,
                        11, 12, 13, 14, 15, 16, 17, 18, 19,
                        21, 22, 23, 24, 25, 26, 27, 28, 29,
                        31, 32, 33, 34, 35, 36, 37, 38, 39,
                        41, 42, 43, 44, 45, 46, 47, 48, 49,
                        51, 52, 53, 54, 55, 56, 57, 58, 59
                      ]
                    })}
                    allowClear
                  />
                )
              }
            </Form.Item>
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark', {
                initialValue: this.details.remark
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="排序">
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.details.sortIndex || 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序!',
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
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', {
                initialValue: this.details.status === 1,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal >
    )
  }
})
