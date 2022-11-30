
import '../assets/styles/index.scss'
import { Button, Input, Space, Alert, Modal, Icon, message } from 'ant-design-vue'

export default ({
  data() {
    return {
      codeValue: '',
      codeBatchVisible: false
    }
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
      await this.$store.dispatch('getList', {
        moduleName: 'generateQRCode',
        stateName: 'qrCode',
        customApiName: 'getCodeByIdNumbers',
        additionalQueryParameters: {
          idNumbers: this.codeValue
        }
      })

      this.codeBatchVisible = !this.codeBatchVisible
    }
  },
  render() {
    return (
      <div class={'pe-summary-container'}>
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
          // title="确认提示"
          width={360}
          visible={this.codeBatchVisible}
          onCancel={() => this.codeBatchVisible = !this.codeBatchVisible}
          onOk={() => this.generateCode()}
        >
          <div class="Tips">
            <Icon type="question-circle" style={{ fontSize: '64px', color: '#0BA5EC' }} theme="filled" />
            <p>现在生成二维码吗？</p>
          </div>
        </Modal>
      </div>
    )
  }
})
