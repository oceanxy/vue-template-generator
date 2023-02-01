import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  data() {
    return { visible: true }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search() {
      return this.getState('search', this.moduleName)
    },
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    }

  },
  methods: {
    async onRefresh() {
      await this.$store.dispatch('getList', {
        moduleName: 'gradeManagement',
        customApiName: 'getGradeManagement'
      })
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={() => this.onAddClick()}
          icon="plus-square"
        >
          新增
        </Button>
        <Button
          onClick={() => this.onDeleteClick()}
          icon="delete"
          disabled={this.deleteButtonDisabled}
        >
          删除
        </Button>

        <Button
          icon="sync"
          onClick={() => this.onRefresh()}
        >
          刷新年级人数
        </Button>
      </Space>
    )
  }
}
