import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'

export default {
  methods: {
    onApplyAccount() {
      this.$router.push({ name: 'applyAccount' })
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          onClick={() => this.onApplyAccount()}
          icon="plus"
        >
          申请开通账号
        </Button>
      </Space>
    )
  }
}
