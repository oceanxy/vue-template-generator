import '../assets/styles/index.scss'
import { Button, Col, DatePicker, Form, Input, Row, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import moment from 'moment'
import { debounce } from 'lodash'
// import MultiInput from './MultiInput'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    templates() {
      return this.getState('templates', this.moduleName)
    }
  },
  methods: {
    async toQuestionnaireTemplates() {
      this.onCancel()
      await this.$router.push({ name: 'dataCollectionTemplates' })
    },
    async onSearchOfQuestionnaireTemplates(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'templates',
        payload: { fullName: keyword },
        customApiName: 'getListOfQuestionnaireTemplates'
      })
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.onSearchOfQuestionnaireTemplates('')
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit()
        // ok: () => this.onSubmit({
        //   customValidation: () => {
        //     const temp = this.form
        //       .getFieldValue('linkInfoList')
        //       .filter(item => !!item.fullName)
        //
        //     return !!temp.length
        //   }
        // })
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-from-grid'}>
        <Form class="bnm-form-grid">
          <Form.Item label="问卷标题">
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入问卷标题!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入问卷标题"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="问卷模版">
            <Row gutter={16}>
              <Col span={18}>
                {
                  this.form.getFieldDecorator('templateId', {
                    initialValue: this.currentItem.templateId,
                    rules: [
                      {
                        required: true,
                        message: '请选择问卷模版!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Select
                      placeholder="请输入关键字搜索问卷模版"
                      showSearch
                      filterOption={false}
                      onSearch={debounce(this.onSearchOfQuestionnaireTemplates, 300)}
                      notFoundContent={this.templates.loading ? <Spin /> : undefined}
                    >
                      {
                        this.templates.list.map(item => (
                          <Select.Option value={item.id}>{item.fullName}</Select.Option>
                        ))
                      }
                    </Select>
                  )
                }
              </Col>
              <Col span={6}>
                <Button onClick={this.toQuestionnaireTemplates}>前往管理模版</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="有效期">
            {
              this.form.getFieldDecorator('dateRange', {
                initialValue: this.currentItem.id
                  ? [
                    moment(this.currentItem.startTimeStr),
                    moment(this.currentItem.endTimeStr)
                  ]
                  : [],
                rules: [
                  {
                    required: true, type: 'array', message: '请选择时间范围!', trigger: 'change'
                  }
                ]
              })(
                <DatePicker.RangePicker
                  showTime
                  style={{ width: '100%' }}
                />
              )
            }
          </Form.Item>
          {/*<Form.Item label="资讯链接">*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('linkInfoList', { initialValue: this.currentItem.linkInfoList || [] })(*/}
          {/*      <MultiInput placeholder="请输入资讯链接" />*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
          <Form.Item label="问卷说明">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea
                  placeholder="问卷说明"
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
