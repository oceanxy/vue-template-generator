import '../assets/styles/index.scss'
import { Form, Input, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-edit-user-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    activities() {
      return this.getState('activities', this.moduleName)?.list ?? null
    },
    yearList() {
      return this.getState('yearList', this.moduleName)?.list ?? null
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
    async getActivitiesForSelect() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'activities',
        customApiName: 'getActivitiesForSelect'
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
        this.getActivitiesForSelect()
        this.getActivityYearList()
        console.log(this.activitiesYearList)
        console.log(this.activities)
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
                  initialValue: this.currentItem.objFromName,
                  rules: [
                    {
                      required: true,
                      message: '请选择活动!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择活动">
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
                  initialValue: this.currentItem.schoolList?.map(item => {
                    item.schoolName
                  }),
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择活动!',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择活动">
                  <Select.Option value={1}>男</Select.Option>
                  <Select.Option value={2}>女</Select.Option>
                  <Select.Option value={0}>未知</Select.Option>
                </Select>
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
        </Form>
      </DragModal >
    )
  }
})
