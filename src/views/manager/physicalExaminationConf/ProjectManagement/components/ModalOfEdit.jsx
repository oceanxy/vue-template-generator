import '../assets/styles/index.scss'
import { Form, Input, Switch, InputNumber } from 'ant-design-vue'
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
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search() {
      return this.getState('search', this.moduleName)
    },
    examineCatalogTree() {
      return this.getState('examineCatalogTree', 'physical')?.list ?? null
    },
    examineCatalog() {
      const ecId = this.search.ecId
      const parentId = this.search.parentId

      if (this.currentItem && this.currentItem.parentName) {
        return [{ name: this.currentItem.parentName }]
      } else {
        const arr = []

        this.examineCatalogTree?.map(item => {
          if (item.id === parentId) {
            arr.push(item)
          } else {
            if (item.children) {
              item.children.map(item2 => {
                if (item2.id === ecId) {
                  arr.push(item2)
                } else {
                  if (item2.children) {
                    item2.children.map(item3 => {
                      if (item3.id === ecId) {
                        arr.push(item3)
                      }
                    })
                  }
                }
              })
            }
          }
        })

        return arr
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
    }
  },
  methods: {
    customDataHandler(values) {
      console.log(this.examineCatalog)
      const data = { ...values }

      data.ecId = this.currentItem?.ecId ?? this.search?.ecId ?? this.search?.parentId ?? ''

      return data
    },
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 17 }}
          colon={false}
        >
          <Form.Item label="项目分类名称">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.examineCatalog?.[0]?.name ?? undefined
              })(
                <Input
                  disabled={true}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="项目名称">
            {
              this.form.getFieldDecorator('itemName', {
                initialValue: this.currentItem.itemName,
                rules: [
                  {
                    required: true,
                    message: '请输入姓名!',
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

          <Form.Item label="排序">
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
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
                initialValue: this.currentItem.status === 1,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
