import '../assets/styles/index.scss'
import { Col, Form, Input, InputNumber, Row, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { createNamespacedHelpers, mapGetters } from 'vuex'

const { mapActions: commonMapActions } = createNamespacedHelpers('common')

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 600,
        wrapClassName: 'bnm-modal-contentrelease-informationtype-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    // ...mapState(['search']),
    // ...commonMapState(['informationTypes'])
    search() {
      return this.getState('search', this.moduleName)
    },
    informationTypes() {
      return this.getState('informationTypes', 'common')
    }
  },
  mounted() {
    if (this.informationTypes.length === 0) {
      this.getInformationTypes()
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          //
        }
      }
    }
  },
  methods: {
    ...commonMapActions(['getInformationTypes']),
    customDataHandler(values) {
      const data = { ...values }

      data.catId = this.currentItem.id

      return data
    },
    async onSubmitDone() {
      await this.getInformationTypes()
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customDataHandler: this.customDataHandler,
          done: this.onSubmitDone
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class=""
          colon={false}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="名称">
                {this.form.getFieldDecorator('catName', {
                  initialValue: this.currentItem.catName ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入名称!',
                      trigger: 'blur'
                    }
                  ]
                })(<Input
                  placeholde="请输入"
                  allowClear
                ></Input>)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="所属父级">
                {this.form.getFieldDecorator(
                  'parentCatId',
                  { initialValue: this.currentItem.parentCatId ?? this.search.parentCatId }
                )(
                  <TreeSelect
                    treeData={this.informationTypes}
                    show-search
                    replaceFields={{
                      children: 'children', title: 'name', key: 'id', value: 'id'
                    }}
                    treeNodeFilterProp={'title'}
                    style="width: 100%"
                    placeholder="请选择"
                    allow-clear
                  ></TreeSelect>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="描述">
                {
                  this.form.getFieldDecorator(
                    'description',
                    { initialValue: this.currentItem.description ?? undefined }
                  )(
                    <Input.TextArea
                      placeholder="请输入描述"
                      autoSize={{ minRows: 6 }}
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排序">
                {this.form.getFieldDecorator('sortIndex', { initialValue: this.currentItem.sortIndex ?? undefined })(
                  <InputNumber
                    placeholder="请输入"
                    allowClear
                    style={{ width: '100%' }}
                  />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                {this.form.getFieldDecorator('status', {
                  initialValue: this.currentItem.status === 1,
                  valuePropName: 'checked'
                })(<Switch />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
