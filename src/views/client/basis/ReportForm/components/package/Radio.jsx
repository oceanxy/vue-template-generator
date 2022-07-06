import { Radio } from 'ant-design-vue'

export default {
  props: {
    data: Object
  },
  render() {
    return (
      <Radio.Group>
        <Radio style={{ display: 'block' }}>123</Radio>
        <Radio style={{ display: 'block' }}>123</Radio>
        <Radio style={{ display: 'block' }}>123</Radio>
      </Radio.Group>
    )
  }
}
