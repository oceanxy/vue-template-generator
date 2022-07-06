import BNContainer from '@/components/BNContainer'
import { Form, Input, Row, Col, Button, Select } from 'ant-design-vue'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'
import Upload from '@/components/BNUploadPictures'
import { dispatch } from '@/utils/store'
export default Form.create({})({
  name: 'MoveInfo',
  mixins: [dynamicState(store, dynamicModules)],
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    },
    parkList() {
      return this.$store.state[this.moduleName].parkList
    }
  },
  mounted() {
    dispatch(this.moduleName, 'getParkList')
  },
  methods: {
    validateFields(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) return
        dispatch(this.moduleName, 'onSubmit', values)
      })
    }
  },
  render() {
    return (
      <BNContainer width="100%" modalTitle="申请入驻" contentClass="bn-info-moveinfo">
        <Form class="bn-logon-form" onSubmit={this.validateFields}>
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item label="企业名称">
                {this.form.getFieldDecorator('companyName', {
                  rules: [{ required: true, message: '请输入名称!' }]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="组织代码">
                {this.form.getFieldDecorator('uscc', {
                  rules: [{ required: true, message: '请输入组织代码!' }]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所在行业">
                {this.form.getFieldDecorator('industry', {
                  rules: [{ required: true, message: '请输入所在行业!' }]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="中心">
                {this.form.getFieldDecorator('parkId', {
                  rules: [{ required: true, message: '请选择中心!', trigger: 'change' }]
                })(
                  <Select placeholder="请选择">
                    {this.parkList.map(item => (
                      <Select.Option value={item.id}>{item.fullName}</Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="主营业务">
                {this.form.getFieldDecorator('mainBusiness', {
                  rules: [{ required: true, message: '请输入主营业务!' }]
                })(<Input.TextArea placeholder="请输入" auto-size={{ minRows: 3, maxRows: 5 }}></Input.TextArea>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="营业证照">
                {this.form.getFieldDecorator('businessLicense', {
                  rules: [{ required: true, type: 'array', message: '请上传营业证照!', trigger: 'change' }]
                })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="法人姓名">
                {this.form.getFieldDecorator('legalPerson', {
                  rules: [{ required: true, message: '请输入法人姓名!', trigger: 'blur' }]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="法人身份证号">
                {this.form.getFieldDecorator('legalPersonIdCard', {
                  rules: [{ required: true, message: '请输入法人身份证号!', trigger: 'blur' }]
                })(<Input placeholder="请输入"></Input>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="身份证照片(正面)">
                {this.form.getFieldDecorator('legalPersonIdCardFront', {
                  rules: [{ required: true, type: 'array', message: '请上传身份证照片(正面)!', trigger: 'change' }]
                })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="身份证照片（反面）">
                {this.form.getFieldDecorator('legalPersonIdCardReverse', {
                  rules: [{ required: true, type: 'array', message: '请上传身份证照片（反面）!', trigger: 'change' }]
                })(<Upload action={'/api/system/upload/image'} limit={1}></Upload>)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={this.loading}>
              申请入驻
            </Button>
          </Form.Item>
        </Form>
      </BNContainer>
    )
  }
})
