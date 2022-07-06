import { DatePicker } from 'ant-design-vue'

export default {
  props: {
    data: Object
  },
  render() {
    return <DatePicker placeholder="请选择" />
  }
}
