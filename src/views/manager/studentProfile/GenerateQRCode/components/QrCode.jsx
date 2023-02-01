
import '../assets/styles/index.scss'
import { Button, Input, Space, Alert, Modal, Icon, message } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import apis from '@/apis'

export default ({
  data() {
    return {
      codeValue: '',
      codeBatchVisible: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
  },
  methods: {
    showModal() {
      if (this.codeValue) {
        this.codeBatchVisible = !this.codeBatchVisible
      } else {
        message.error('请输入学生身份证号码')
      }
    },
    async generateCode() {
      this.loading = true
      const res = await apis.getCodeByIdNumbers({ idNumbers: this.codeValue })

      this.codeBatchVisible = !this.codeBatchVisible

      if (res.status) {
        const url = res.data

        this.loading = false
        this.codeValue = ''
        Modal.confirm({
          title: 'PDF文件下载',
          content: '学生二维码已经生成,是否下载',
          okText: '下载',
          cancelText: '取消',
          onOk() {
            const link = document.createElement('a') // 创建a标签

            link.download = '学生二维码' // a标签添加属性
            link.style.display = 'none'
            link.target = '_blank'
            link.href = url
            document.body.appendChild(link)
            link.click() // 执行下载
            document.body.removeChild(link) // 释放标签
          },
          onCancel() { },
        })
      }
    }
  },
  render() {
    return (
      <div>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Alert
            message="输入多个身份证请用“ ，” 隔开"
            type="success"
            closable
          ></Alert>
          <Input.TextArea
            vModel={this.codeValue}
            placeholder="请输入身份证号码"
            autoSize={{ minRows: 20 }}
            allowClear
          />

          <Button
            type="primary"
            icon="qrcode"
            onClick={() => this.showModal()}
            ghost
          >
            生成二维码
          </Button>
        </Space>
        <Modal
          centered
          width={360}
          visible={this.codeBatchVisible}
        >
          <div class="Tips">
            <Icon type="question-circle" style={{ fontSize: '64px', color: '#0BA5EC' }} theme="filled" />
            <p>现在生成二维码吗？</p>
          </div>
          <template slot="footer">
            <Button key="back" onClick={() => this.codeBatchVisible = !this.codeBatchVisible}>
              取消
            </Button>
            <Button key="submit" type="primary" loading={this.loading} onClick={() => this.generateCode()}>
              确认
            </Button>
          </template>
        </Modal>
      </div>
    )
  }
})
