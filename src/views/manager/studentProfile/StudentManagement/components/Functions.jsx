import '../assets/styles/index.scss'
import { Button, Modal, Space, Icon, message } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'
import apis from '@/apis'
import { verificationDialog } from '@/utils/message'

export default {
  mixins: [forFunction()],
  data() {
    return { codeBatchVisible: false }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search() {
      return this.getState('search', this.moduleName)
    },
    treeIdField() {
      return this.getState('treeIdField', this.moduleName)
    },
    curGrade() {
      return this.getState('grade', this.moduleName) ?? null
    },
    curClassNumber() {
      return this.getState('classNumber', this.moduleName) ?? null
    },
    schoolListByThisUser() {
      return this.getState('schoolListByThisUser', this.moduleName)?.list ?? []
    },
    codeBatchUrl() {
      return this.getState('codeBatchUrl', this.moduleName)?.list ?? null
    },
    curSchool() {
      return this.schoolListByThisUser.filter(item => {
        if (item.id === this.search[this.treeIdField]) {
          return item
        }
      })
    }
  },
  methods: {

    onExportBySchoolId() {
      if (!this.search[this.treeIdField] || this.search.orgType !== 5) {
        message.warn('请选择需要导出的学校！')
      } else {
        this.onExport('学生数据')
      }
    },
    async transferOut(isEooms) {
      const ids = this.selectedRows.map(item => item.id).join()
      const names = this.selectedRows.map(item => item.fullName).join()

      verificationDialog(
        async () => {
          let res

          if (isEooms) {
            res = await apis.outRooms({ ids })
          } else {
            res = await apis.studentRollOut({ ids })
          }


          if (res.status) {
            message.success('学生转出成功')
            await this.$store.dispatch('getList', {
              moduleName: this.moduleName,
              submoduleName: this.submoduleName,
              customApiName: this.customApiName
            })
          } else {
            message.error('转出失败！请重试')
          }

          return res.status
        },
        (
          <div>你确定把<span style={{ color: 'blue' }}>{names}</span>转出{isEooms ? '宿舍' : ''}？</div>
        )
      )

    },
    async onCancel() {
      this.codeBatchVisible = !this.codeBatchVisible
    },
    async determine() {
      const curGradeId = this.curGrade?.[0]?.id ?? undefined

      if (!this.search[this.treeIdField]) {
        this.codeBatchVisible = false
        message.error(' 请选择学校！')
      } else if (!curGradeId) {
        this.codeBatchVisible = false
        message.error(' 请选择年级！')
      } else {
        this.codeBatchVisible = false
        const res = await this.$store.dispatch('getList', {
          moduleName: 'studentManagement',
          stateName: 'codeBatchUrl',
          customApiName: 'getCodeBatch',
          additionalQueryParameters: {
            schoolId: this.search[this.treeIdField],
            gradeId: curGradeId,
            classNumber: this.curClassNumber
          }
        })

        if (res) {
          const url = this.codeBatchUrl
          const fileName = this.curSchool[0].fullName + this.curGrade[0].gradeName

          Modal.confirm({
            title: 'PDF文件下载',
            content: `${fileName}'已经生成,是否下载'`,
            okText: '下载',
            cancelText: '取消',
            onOk() {
              const link = document.createElement('a') // 创建a标签

              link.download = fileName // a标签添加属性
              link.style.display = 'none'
              link.target = '_blank'
              link.href = url
              document.body.appendChild(link)
              link.click() // 执行下载
              document.body.removeChild(link) // 释放标签
            },
            onCancel() { },
          })
        } else {
          message.error('暂无数据！')
        }
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
          onClick={() => this.transferOut({ isEooms: true })}
          disabled={this.deleteButtonDisabled}
          icon="user-delete"
        >
          学生转出宿舍
        </Button>
        <Button
          onClick={() => this.onAddClick()}
          icon="user"
        >
          新增
        </Button>

        <Button
          icon="import"
          onClick={() => this._setVisibilityOfModal({ type: 'whole' }, 'visibilityOfImport')}
        >
          全局导入
        </Button>

        <Button
          icon="import"
          onClick={() => this._setVisibilityOfModal({ type: 'local' }, 'visibilityOfImport')}
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
          onClick={this.onExportBySchoolId}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出学生
        </Button>

        <Button
          onClick={() => this._setVisibilityOfModal({}, 'visibilityOfSetRooms')}
          icon="home"
          disabled={this.deleteButtonDisabled}
        >
          设置学生宿舍
        </Button>
        <Button
          onClick={() => this.onDeleteClick()}
          icon="delete"
          disabled={this.deleteButtonDisabled}
        >
          删除
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
