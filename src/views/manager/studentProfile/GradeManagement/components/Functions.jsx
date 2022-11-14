import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  data() {
    return {
      visible: true
    }
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
        customApiName: 'getGradeManagement',
      })
    },
    async onSetGraduation() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: 'gradeManagement',
        customApiName: 'setGraduation',
        payload: {
          id: this.selectedRows[0].id
        }
      })
    },
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
          onClick={() => this.onEditClick()}
          icon="edit"
          disabled={this.deleteButtonDisabled}
        >
          修改
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
        <Button
          icon="setting"
          disabled={this.deleteButtonDisabled}
          onClick={() => this.onSetGraduation()}
        >
          设置为毕业
        </Button>
      </Space>
    )
  }
}
