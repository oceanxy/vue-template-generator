import { Button, Col, Form, Input, Row, Table } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import MultiInput from './MultiInput'
import { cloneDeep, omit } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true
      }
    }
  },
  computed: {
    details() {
      return this.$store.state[this.moduleName].details
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
    search() {
      return this.$store.state[this.moduleName].search
    }
  },
  watch: {
    details: {
      deep: true,
      handler(value) {
        this.form.setFieldsValue({ functionInfoList: value || [] })
      }
    },
    visible: {
      immediate: true,
      async handler(value) {
        if (value && this.currentItem.id && !this.currentItem.functionInfoList?.length) {
          await this.$store.dispatch('getDetails', {
            moduleName: this.moduleName,
            payload: { id: this.currentItem.id }
          })
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = cloneDeep(values)

      return {
        function: {
          fnName: data.fnName,
          fnDescribe: data.fnDescribe,
          id: data.id,
          menuId: this.currentItem.menuId || this.search.parentId,
          sortIndex: data.sortIndex
        },
        functionInfoList: values.functionInfoList.map(item => {
          if (!isNaN(item.id)) {
            return omit(item, 'id')
          }

          return item
        })
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          class=""
          colon={false}
        >
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="名称">
                {
                  this.form.getFieldDecorator('fnName', {
                    initialValue: this.currentItem.fnName,
                    rules: [
                      {
                        required: true, message: '请输入名称!', trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="请输入名称"
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
                    initialValue: `${this.currentItem.sortIndex || ''}` || undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入排序!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input
                      placeholder="越大排在越前"
                      allowClear
                    />
                  )
                }
              </Form.Item>
            </Col>

            <Col span={24}>
              <p
                class=""
                style={{ 'text-align': 'right' }}
              >
                <Button onclick={this.onAddRow}>+添加</Button>
              </p>
              <Table
                {...{ props: this.tableProps }}
                scopedSlots={{
                  fnUrl: (text, record, index) => (
                    <Form.Item
                      label=""
                      style={{ 'margin-bottom': '0' }}
                    >
                      {
                        this.form.getFieldDecorator(`fnUrl${index}`, { initialValue: record.fnUrl })(
                          <Input
                            placeholder="请输入"
                            allowClear
                          />
                        )
                      }
                    </Form.Item>
                  ),
                  fnInfoDescribe: (text, record, index) => (
                    <Form.Item
                      label=""
                      style={{ 'margin-bottom': '0' }}
                    >
                      {
                        this.form.getFieldDecorator(`fnInfoDescribe${index}`, { initialValue: record.fnInfoDescribe })(
                          <Input
                            placeholder="请输入"
                            allowClear
                          />
                        )
                      }
                    </Form.Item>
                  ),
                  operation: (text, record, index) => (
                    <Button
                      size="small"
                      type="danger"
                      icon="delete"
                      onclick={() => this.onDeleteRow(index)}
                    />
                  )
                }}
              />
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
