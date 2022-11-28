import '../assets/styles/index.scss'
import { Form, Select, TreeSelect, message } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfReport',
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
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    schoolList() {
      return this.getState('schoolListByActivity', this.moduleName)
    },
    customApiName() {
      if (this.currentItem.type === 1) {
        return 'createEvaluateReport'
      } else if (this.currentItem.type === 2) {
        return 'createPrintReport'
      }
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibleField),
          ok: () => this.onSubmit({
            customDataHandler: this.customDataHandler,
            customApiName: this.customApiName
          })
        }
      }
    }
  },
  methods: {
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
    focus() {
      if (!this.curActivitieId) {
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

      data.schoolIds = values.schoolIds?.join() ?? ''
      data.activityId = this.curActivitieId ?? ''

      return data
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
          <Form.Item label="数据来源活动">
            {
              this.form.getFieldDecorator(
                'activityId',
                {
                  initialValue: '',
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
                  initialValue: this.currentItem?.schoolList ?? null
                }
              )(
                <TreeSelect
                  style="width: 100%"
                  treeData={this.schoolList.list}
                  multiple
                  treeCheckable
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
              )
            }
          </Form.Item>
        </Form>
      </DragModal >
    )
  }
})
