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
    async customDataHandl(values) {
      const data = { ...values }

      data.schoolIds = data.schoolIds?.join() ?? ''

      if (this.currentItem.type === 1) {
        await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: this.moduleName,
          customApiName: 'createPrintReport',
          payload: {
            activityId: data.activityId,
            schoolIds: data.schoolIds
          }
        })

      } else if (this.currentItem.type === 2) {
        await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: this.moduleName,
          customApiName: 'createPrintReport',
          payload: {
            activityId: data.activityId,
            schoolIds: data.schoolIds
          }
        })
      }

    }

  },
  // watch: {
  //   'modalProps.visible'(value) {
  //     if (value) {
  //       this.getactivitiesList()
  //     }
  //   }
  // },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandl })
      }
    }

    return (
      <DragModal {...attributes}>
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