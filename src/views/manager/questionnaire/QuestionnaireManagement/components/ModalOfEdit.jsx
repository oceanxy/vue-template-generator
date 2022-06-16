import '../assets/styles/index.scss'
import { Button, Col, DatePicker, Form, Input, Row, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'
import MultiInput from '@/views/manager/questionnaire/QuestionnaireManagement/components/MultiInput'

export default Form.create({})({
  mixins: [forFormModal],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    title: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      modalProps: {
        width: 690
      }
    }
  },
  computed: mapState({
    allSiteApps: 'allSiteApps',
    allFunctionalModules: 'allFunctionalModules'
  }),
  watch: {
    async visible(value) {
      if (value) {
        // await this.$store.dispatch('getAllFunctionalModules')
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: this.onSubmit
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-team-edit-modal'}>
        <Form class="bnm-form-grid">
          <Form.Item label="问卷标题">
            {
              this.form.getFieldDecorator('number', {
                initialValue: this.currentItem.number,
                rules: [{ required: true, message: '请输入编号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入编号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="问卷模版">
            <Row gutter={16}>
              <Col span={18}>
                {
                  this.form.getFieldDecorator('name', {
                    initialValue: this.currentItem.name
                  })(
                    <Select>
                      <Select.Option value={0}>未知</Select.Option>
                    </Select>
                  )
                }
              </Col>
              <Col span={6}><Button>前往管理模版</Button></Col>
            </Row>
          </Form.Item>
          <Form.Item label="问卷说明">
            {
              this.form.getFieldDecorator('ss', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder="请输入排序值" type="textarea" />
              )
            }
          </Form.Item>
          <Form.Item label="有效期">
            {
              this.form.getFieldDecorator('members', {
                initialValue: this.currentItem.members
              })(
                <DatePicker.RangePicker placeholder="请输入描述" />
              )
            }
          </Form.Item>
          <Form.Item label="资讯链接">
            {
              this.form.getFieldDecorator('qq', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <MultiInput placeholder="请输入排序值" />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
