import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  methods: {
    async toSigningProcess() {
      await this.$router.push({ name: 'signingProcess' })
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button type="primary" onClick={() => this.toSigningProcess()} icon="contacts">
          开始签约
        </Button>
      </Space>
    )
  }
}
