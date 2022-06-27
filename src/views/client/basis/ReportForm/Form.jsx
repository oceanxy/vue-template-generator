import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Input } from 'ant-design-vue'

export default Form.create({})({
  data() {
    return {
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
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        moduleTitle="我的报表 > 2021年度企业考核"
        contentClass="bn-report-form-content"
      >
        <Form
          class="bn-report-form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          colon={false}
        >
          <Form.Item label="短文本">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.pageName,
                rules: [{ required: true, message: '请输入页面名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入页面名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="长文本">
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
          <Form.Item label=' '>
            <Button>确认提交</Button>
          </Form.Item>
        </Form>
      </BNContainer>
    )
  }
})
