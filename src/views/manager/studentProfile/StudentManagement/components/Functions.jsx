import '../assets/styles/index.scss'
import { Button, Modal, Space, Icon, message } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  data() {
    return {
      codeBatchVisible: false
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    schoolId() {
      return this.getState('search', this.moduleName)?.schoolId ?? null
    },
    curGradeId() {
      return this.getState('grade', this.moduleName)?.[0]?.id ?? undefined
    },
    curClassNumber() {
      return this.getState('classNumber', this.moduleName) ?? null
    }
  },
  methods: {
    async transferOut() {
      const ids = this.selectedRowKeys.join()

      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: 'studentManagement',
        customApiName: 'studentRollOut',
        payload: {
          ids
        }
      })
    },
    async onCancel() {
      this.codeBatchVisible = !this.codeBatchVisible
    },
    async determine() {
      if (!this.schoolId) {
        this.codeBatchVisible = false
        message.error(' 请选择学校！')
      } else if (!this.curGradeId) {
        this.codeBatchVisible = false
        message.error(' 请选择班级！')
      } else {
        this.codeBatchVisible = false
        await this.$store.dispatch('getListWithLoadingStatus', {
          moduleName: 'studentManagement',
          customApiName: 'getCodeBatch',
          payload: {
            schoolId: this.schoolId,
            gradeId: this.curGradeId,
            classNumber: this.curClassNumber
          }
        })
      }

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
        <Button
          icon="qrcode"
          onClick={() => this.onCancel()}
        >
          生成二维码
        </Button>

        <Button
          icon="export"
        >
          导出学生
        </Button>
        <Modal
          centered
          // title="确认提示"
          width={360}
          visible={this.codeBatchVisible}
          onCancel={() => this.onCancel()}
          onOk={() => this.determine()}
        >
          <div class="Tips">
            <Icon type="question-circle" style={{ fontSize: '64px', color: '#0BA5EC' }} theme="filled" />
            <p>现在生成二维码吗？</p>
          </div>
        </Modal>
      </Space>
    )
  }
}
