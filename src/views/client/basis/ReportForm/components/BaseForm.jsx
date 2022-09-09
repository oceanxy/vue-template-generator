import { Form } from 'ant-design-vue'
import BaseFormItem from './BaseFormItem'
import { getFieldValue } from './utils'

export default Form.create({})({
  props: { list: Array },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (err) return

        const form = getFieldValue(this.list, values)

        this.$emit('submit', form)
      })
    }
  },
  render() {
    return (
      <Form
        class="bn-report-form"
        colon={false}
        onsubmit={this.onSubmit}
      >
        {
          this.list.map(item => [
            <div class={'bnm-report-form-classified-info'}>
              <p>{item.fullName}</p>
            </div>,
            [
              ...[
                item.itemList.map(i => (
                  <BaseFormItem data={i} form={this.form} />
                ))
              ]
            ]
          ])
        }
        <Form.Item>{this.$slots.default}</Form.Item>
      </Form>
    )
  }
})
