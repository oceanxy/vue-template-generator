import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    menuTree() {
      return this.getState('menuTree', 'system')
    },
    currentMenuId() {
      return this.getState('currentMenuId', 'system')
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          onClick={() => this.onAddClick({
            parentId: this.currentMenuId || this.menuTree.list?.[0].id
          })}
          icon="plus"
        >
          新增
        </Button>
        <Button type="primary" disabled={this.deleteButtonDisabled} onClick={() => this.onDeleteClick()} icon="delete">
          删除
        </Button>
      </Space>
    )
  }
}
