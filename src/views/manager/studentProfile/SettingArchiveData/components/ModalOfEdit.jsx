import '../assets/styles/index.scss'
import { Form, Input, Select, TreeSelect, message } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 600,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      schoolLists: []
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    activities() {
      return this.getState('activities', this.moduleName)?.list ?? null
    },
    yearList() {
      return this.getState('yearList', this.moduleName)?.list ?? null
    },
    schoolList() {
      return this.getState('schoolListByActivity', this.moduleName)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
        }
      }
    }
  },
  async created() {
    await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'activities',
      customApiName: 'getActivitiesForSelect'
    })
  },
  methods: {
    async getActivityYearList() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'yearList',
        customApiName: 'getActivityYearList'
      })
    },
    async getSchoolTreeByActivityId(curActivitieId) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'schoolListByActivity',
        customApiName: 'getSchoolTreeByActivityId',
        payload: {
          activityId: curActivitieId
        }
      })
    },
    // 选择学校
    onChangeSelect(value, label) {
      this.schoolNames = label.join()
    },
    focus() {
      if (!this.curActivitieId && !this.currentItem.objFromId) {
        return message.error(' 请选择活动！')
      }
    },
    // 选择活动
    onChangeActivitie(value) {
      this.curActivitieId = value
      this.getSchoolTreeByActivityId(value)
    },
    customDataHandler(values) {
      const data = { ...values }
      const editSchoolName = this.currentItem?.schoolList?.map(item => {
        return item.schoolName
      })

      data.schoolIds = data.schoolIds?.join() ?? ''
      data.schoolNames = this.schoolNames ?? editSchoolName.join() ?? ''
      console.log('data', data)

      return data
    }

  },
  watch: {
    'modalProps.visible'(value) {
      if (value) {
        this.getActivityYearList()

        if (this.currentItem.objFromId) {
          this.getSchoolTreeByActivityId(this.currentItem.objFromId)
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          colon={false}
        >
          <Form.Item label="存档时间">
            {
              this.form.getFieldDecorator(
                'saveTime',
                {
                  initialValue: this.currentItem.saveTime,
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
          <Form.Item label="数据来源活动">
            {
              this.form.getFieldDecorator(
                'objFromId',
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
          <Form.Item label="学校">
            {
              this.form.getFieldDecorator(
                'schoolIds',
                {
                  initialValue: this.currentItem.schoolList?.map(item => item.schoolId)
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: '请选择活动!',
                  //     trigger: 'change'
                  //   }
                  // ]
                }
              )(
                // <Row gutter={10}>
                // <Col span={20}>
                <TreeSelect
                  style="width: 100%"
                  treeData={this.schoolList.list}
                  multiple
                  treeCheckable
                  suffixIcon={<Icon type="caret-down" />}
                  treeNodeFilterProp={'title'}
                  dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  onFocus={this.focus}
                  onChange={this.onChangeSelect}
                ></TreeSelect>
                // </Col>
                /* <Col span={4}>
                  <Button
                    type="primary"
                    onClick={() => this.selectSchoolTree()}
                    onClick={() => this._setVisibleOfModal({ curActivitieId: this.curActivitieId }, 'visibleOfSchoolTre')}
                  >选择</Button>
                </Col> */
                /* </Row> */
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
          </Form.Item>
        </Form>
      </DragModal >
    )
  }
})
