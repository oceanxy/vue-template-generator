import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    treeId() {
      return this.getState('currentParkTreeKeySelected', 'common')
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          onClick={() => this.onAddClick({ floorId: this.treeId })}
          icon="plus"
        >
          新增
        </Button>
        {/*<Button*/}
        {/*  // onClick={this.onEditClick}*/}
        {/*  icon="import"*/}
        {/*>*/}
        {/*  导入*/}
        {/*</Button>*/}
        <Button
          onClick={() => this.onExport('房源数据')}
          icon="export"
        >
          导出
        </Button>
        <Button
          type="danger"
          onClick={() => this.onDeleteClick()}
          icon="delete"
          disabled={this.deleteButtonDisabled}
        >
          删除
        </Button>
      </Space>
    )
  }
}
