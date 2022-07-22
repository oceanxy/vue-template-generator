import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    indicatorCategoryIdSelected() {
      return this.getState('indicatorCategoryIdSelected', 'common')
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="danger"
          onClick={() => this.onAuditClick()}
          icon="delete"
          disabled={this.auditButtonDisabled}
        >
          审核
        </Button>
      </Space>
    )
  }
}
