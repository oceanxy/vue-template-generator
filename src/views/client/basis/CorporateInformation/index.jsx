import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Input, Upload } from 'ant-design-vue'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default Form.create({})({
  data() {
    return {
      loading: false,
      imageUrl: '',
      currentItem: {
        name: ''
      }
    }
  },
  // computed: mapState({
  //   allSiteApps: 'allSiteApps',
  //   allPages: 'allPages',
  //   score() {
  //     return 0
  //   }
  // }),
  watch: {
    async visible(value) {
      if (value) {
        await this.$store.dispatch('getAllPages')
      }
    }
  },
  methods: {
    async onConflictClick() {
      // await dispatch(this.moduleName, 'setVisibleForConflict', true)
    },
    allPathValidator(rule, value, callback) {
      const result = value.filter(item => !item.allPath)

      if (!value.length || result.length) {
        callback(new Error('路径字段不要留空！'))
      }

      callback()
    },
    transformValue(values) {
      return {
        isMonitor: +values.isMonitor,
        isSameGroup: +values.isSameGroup
      }
    },
    handleChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        title="企业信息管理"
        contentClass="bn-cor-info-content"
      >
        <Form
          class="bn-report-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          colon={false}
        >
          <Form.Item label="企业LOGO">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  class="avatar-uploader"
                  showUploadList="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload="beforeUpload"
                  onChange="handleChange"
                >
                  {/*<img v-if="imageUrl" :src="imageUrl" alt="avatar" />*/}
                  {/*<div v-else>*/}
                  {/*  <a-icon :type="loading ? 'loading' : 'plus'" />*/}
                  {/*  <div class="ant-upload-text">*/}
                  {/*    Upload*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </Upload>
              )
            }
          </Form.Item>
          <Form.Item label="企业名称">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入页面名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="组织机构代码">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入页面名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="所在行业">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入页面名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="营业执照">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  class="avatar-uploader"
                  showUploadList="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload="beforeUpload"
                  onChange="handleChange"
                >
                  {/*<img v-if="imageUrl" :src="imageUrl" alt="avatar" />*/}
                  {/*<div v-else>*/}
                  {/*  <a-icon :type="loading ? 'loading' : 'plus'" />*/}
                  {/*  <div class="ant-upload-text">*/}
                  {/*    Upload*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </Upload>
              )
            }
          </Form.Item>
          <Form.Item label="法人姓名">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入页面名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="身份证号">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入页面名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="身份证照片">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  class="avatar-uploader"
                  showUploadList="false"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload="beforeUpload"
                  onChange="handleChange"
                >
                  {/*<img v-if="imageUrl" :src="imageUrl" alt="avatar" />*/}
                  {/*<div v-else>*/}
                  {/*  <a-icon :type="loading ? 'loading' : 'plus'" />*/}
                  {/*  <div class="ant-upload-text">*/}
                  {/*    Upload*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </Upload>
              )
            }
          </Form.Item>
          <Form.Item label="企业简介">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Input.TextArea
                  autoSize={{ minRows: 4, maxRows: 6 }}
                  placeholder="请输入页面名称"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label=" ">
            <Button>保存</Button>
          </Form.Item>
        </Form>
      </BNContainer>
    )
  }
})
