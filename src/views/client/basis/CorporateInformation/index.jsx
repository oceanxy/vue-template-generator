import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Input, Spin, Row, Col } from 'ant-design-vue'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'
import Upload from '@/components/BNUploadPictures'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default Form.create({})({
  name: 'CorporateInformation',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {
      imageUrl: '',
      currentItem: {
        name: ''
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    },
    details() {
      return this.$store.state[this.moduleName].details
    }
  },
  mounted() {
    dispatch(this.moduleName, 'getCompanyDetail')
  },

  methods: {
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (err) return
        dispatch(this.moduleName, 'updateCompanyDetail', values)
      })
    }
  },
  render() {
    // 回显图片
    const fileListLogo = []
    if (this.details.logo) {
      fileListLogo.push({
        uid: 'logo',
        url: this.details.logoStr,
        key: this.details.logo,
        status: 'done',
        name: this.details.logo?.substring(this.details.logo?.lastIndexOf('/'))
      })
    }
    const fileListBusinessLicense = []
    if (this.details.businessLicense) {
      fileListBusinessLicense.push({
        uid: 'businessLicense',
        url: this.details.businessLicenseStr,
        key: this.details.businessLicense,
        status: 'done',
        name: this.details.businessLicense?.substring(this.details.businessLicense?.lastIndexOf('/'))
      })
    }
    const fileListLegalPersonIdCardFront = []
    if (this.details.legalPersonIdCardFront) {
      fileListLegalPersonIdCardFront.push({
        uid: 'legalPersonIdCardFront',
        url: this.details.legalPersonIdCardFrontStr,
        key: this.details.legalPersonIdCardFront,
        status: 'done',
        name: this.details.legalPersonIdCardFront?.substring(this.details.legalPersonIdCardFront?.lastIndexOf('/'))
      })
    }
    const fileListLegalPersonIdCardReverse = []
    if (this.details.legalPersonIdCardReverse) {
      fileListLegalPersonIdCardReverse.push({
        uid: 'legalPersonIdCardReverse',
        url: this.details.legalPersonIdCardReverseStr,
        key: this.details.legalPersonIdCardReverse,
        status: 'done',
        name: this.details.legalPersonIdCardReverse?.substring(this.details.legalPersonIdCardReverse?.lastIndexOf('/'))
      })
    }
    return (
      <BNContainer width="100%" modalTitle="企业信息管理" contentClass="bn-cor-info-content">
        <Spin spinning={this.loading}>
          <Form class="bn-report-form" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} colon={false}>
            <Form.Item label="企业LOGO">
              {this.form.getFieldDecorator('logo', {
                initialValue: fileListLogo,
                rules: [{ required: true, type: 'array', message: '请上传logo', trigger: 'change' }]
              })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
            </Form.Item>
            <Form.Item label="企业名称">
              {this.form.getFieldDecorator('companyName', {
                initialValue: this.details.companyName,
                rules: [{ required: true, message: '请输入名称!', trigger: 'blur' }]
              })(<Input placeholder="请输入" allowClear />)}
            </Form.Item>
            <Form.Item label="组织机构代码">
              {this.form.getFieldDecorator('uscc', {
                initialValue: this.details.uscc,
                rules: [{ required: true, message: '请输入组织机构代码!', trigger: 'blur' }]
              })(<Input placeholder="请输入" allowClear />)}
            </Form.Item>
            <Form.Item label="所在行业">
              {this.form.getFieldDecorator('industry', {
                initialValue: this.details.industry,
                rules: [{ required: true, message: '请输入所在行业!', trigger: 'blur' }]
              })(<Input placeholder="请输入" allowClear />)}
            </Form.Item>
            <Form.Item label="营业执照">
              {this.form.getFieldDecorator('businessLicense', {
                initialValue: fileListBusinessLicense,
                rules: [{ required: true, type: 'array', message: '请上传营业执照!', trigger: 'change' }]
              })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
            </Form.Item>
            <Form.Item label="法人姓名">
              {this.form.getFieldDecorator('legalPerson', {
                initialValue: this.details.legalPerson,
                rules: [{ required: true, message: '请输入法人姓名!', trigger: 'blur' }]
              })(<Input placeholder="请输入 " allowClear />)}
            </Form.Item>
            <Form.Item label="身份证号">
              {this.form.getFieldDecorator('legalPersonIdCard', {
                initialValue: this.details.legalPersonIdCard,
                rules: [{ required: true, message: '请输入身份证号!', trigger: 'blur' }]
              })(<Input placeholder="请输入 " allowClear />)}
            </Form.Item>
            <Form.Item label="身份证照片(正面)">
              {this.form.getFieldDecorator('legalPersonIdCardFront', {
                initialValue: fileListLegalPersonIdCardFront,

                rules: [{ required: true, type: 'array', message: '请上传身份证照片!', trigger: 'change' }]
              })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
            </Form.Item>
            <Form.Item label="身份证照片(反面)">
              {this.form.getFieldDecorator('legalPersonIdCardReverse', {
                initialValue: fileListLegalPersonIdCardReverse,

                rules: [{ required: true, type: 'array', message: '请上传身份证照片!', trigger: 'change' }]
              })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
            </Form.Item>
            <Form.Item label="企业简介">
              {this.form.getFieldDecorator('description', {
                initialValue: this.details.description
              })(<Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder="请输入页面名称" allowClear />)}
            </Form.Item>
            <Form.Item label=" ">
              <Button onclick={() => this.onSubmit()}>保存</Button>
            </Form.Item>
          </Form>
        </Spin>
      </BNContainer>
    )
  }
})
