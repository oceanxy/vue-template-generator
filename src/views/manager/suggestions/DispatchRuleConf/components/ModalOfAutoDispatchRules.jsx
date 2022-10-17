import { Form, Select, Switch, Table } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 800,
        destroyOnClose: true
      },
      tableProps: {
        columns: [
          {
            title: '投诉类型',
            width: 100,
            align: 'center',
            dataIndex: 'fieldName'
          },
          {
            title: '派单规则',
            scopedSlots: { customRender: 'rule' }
          }
        ],
        dataSource: [
          {
            id: '1',
            fieldName: '园区管理',
            rule: 1
          },
          {
            id: '2',
            fieldName: '服务态度',
            rule: 1
          },
          {
            id: '3',
            fieldName: '服务质量',
            rule: 2
          },
          {
            id: '4',
            fieldName: '服务效率',
            rule: 4
          }
        ],
        pagination: false,
        rowKey: 'id',
        tableLayout: 'fixed',
        size: 'middle'
      },
      visibleField: 'visibleOfAutoDispatchRules'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    autoDispatchRules() {
      return this.getState('autoDispatchRules', this.moduleName)
    }
  },
  methods: {
    handleSubmit() {
      // this.onSubmit({
      //   customApiName: '',
      //   isFetchList: false,
      //   done: async () => {
      //     await this.$store.dispatch('getListForSelect', {
      //       moduleName: this.moduleName,
      //       stateName: this.currentItem.stateName,
      //       customApiName: ''
      //     })
      //   }
      // })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: this.handleSubmit
      }
    }

    const tableAttributes = {
      props: this.tableProps,
      attrs: { class: 'multi-input-table' }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid label-size-small"
          colon={false}
        >
          <Form.Item
            label="启用状态"
            required
          >
            {
              this.form.getFieldDecorator('remind', {
                initialValue: this.autoDispatchRules.data.enable,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
          <Form.Item label="派单规则">
            {
              this.form.getFieldDecorator('rules', {
                initialValue: this.autoDispatchRules.data.rules,
                rules: [
                  {
                    required: true,
                    message: '请补全派单规则！',
                    trigger: 'change'
                  }
                ]
              })(
                <Table
                  {...tableAttributes}
                  {...{
                    scopedSlots: {
                      rule: (text, record) => (
                        <Select
                          vModel={record.rule}
                          placeholder="请选择规则"
                          disabled={!this.form.getFieldValue('remind')}
                          options={[
                            {
                              value: 1,
                              label: '优先分配给当前受理量少的人员'
                            },
                            {
                              value: 2,
                              label: '优先分配给服务星级高的人员'
                            },
                            {
                              value: 3,
                              label: '优先分配给男性员工'
                            },
                            {
                              value: 4,
                              label: '优先分配给女性员工'
                            },
                            {
                              value: 5,
                              label: '分配给指定员工'
                            }
                          ]}
                        />
                      )
                    }
                  }}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
