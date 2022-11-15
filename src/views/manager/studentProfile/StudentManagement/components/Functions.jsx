import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  methods: {
    async transferOut() {
      const ids = this.selectedRowKeys.join()

      console.log(ids)
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: 'studentManagement',
        customApiName: 'studentRollOut',
        payload: {
          ids
        }
      })
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={() => this.transferOut()}
          disabled={this.deleteButtonDisabled}
          icon="export"
        >
          转出学生
        </Button>
        <Button
          onClick={() => this.onAddClick()}
          icon="user"
        >
          新增
        </Button>
        <Button
          onClick={() => this.onEditClick()}
          disabled={this.deleteButtonDisabled}
          icon="edit"
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
          icon="import"
        >
          全局导入
        </Button>

        <Button
          icon="import"
        >
          局部导入
        </Button>
        {/* <Button
          disabled={this.deleteButtonDisabled}
          icon="qrcode"
        >
          生成二维码
        </Button> */}

        <Button
          icon="export"
        >
          导出学生
        </Button>
      </Space>
    )
  }
}
