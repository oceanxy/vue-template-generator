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
    curGrade() {
      return this.getState('grade', this.moduleName) ?? null
    },
    curClassNumber() {
      return this.getState('classNumber', this.moduleName) ?? null
    },
    schoolAllList() {
      return this.getState('schoolAllList', this.moduleName)?.list ?? []
    },
    codeBatchUrl() {
      return this.getState('codeBatchUrl', this.moduleName)?.list ?? null
    },
    curSchool() {
      return this.schoolAllList.filter(item => {
        if (item.id === this.schoolId) {
          return item
        }
      })
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
    // downloadFile(url, fileName) {
    //   if (!url) return

    //   const link = document.createElement('a')

    //   link.style.display = 'none'
    //   link.href = url
    //   link.setAttribute('download', fileName)
    //   document.body.appendChild(link)
    //   link.click()
    //   document.body.removeChild(link)

    // },
    async determine() {
      const curGradeId = this.curGrade?.[0]?.id ?? undefined

      if (!this.schoolId) {
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
            schoolId: this.schoolId,
            gradeId: curGradeId,
            classNumber: this.curClassNumber
          }
        })
        // this.$nextTick(function () {


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
        // })


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
