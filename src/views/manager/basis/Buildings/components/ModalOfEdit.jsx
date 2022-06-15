import '../assets/styles/index.scss'
import { Checkbox, Form, Icon, Input, Radio, Switch, Upload } from 'ant-design-vue'
import forFormModal from '@/mixins/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'

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
        <Form
          class="bnm-team-edit-form"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="图片">
            {
              this.form.getFieldDecorator('image', {
                initialValue: this.currentItem.image,
                rules: [{ required: true, message: '请上传图片!', trigger: 'blur' }]
              })(
                <Upload>
                  {
                    this.form.image
                      ? <img src={this.form.image} alt={'团队图片'} />
                      : (
                        <div>
                          <Icon type={this.loading ? 'loading' : 'plus'} />
                          <div class="ant-upload-text">
                            上传
                          </div>
                        </div>
                      )
                  }
                </Upload>
              )
            }
          </Form.Item>
          <Form.Item label="编号">
            {
              this.form.getFieldDecorator('number', {
                initialValue: this.currentItem.number,
                rules: [{ required: true, message: '请输入编号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入编号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="所属园区">
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.name
              })(
                <Radio.Group>
                  <Radio value={0}>未知</Radio>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="名称">
            {
              this.form.getFieldDecorator('description', {
                initialValue: this.currentItem.description || 0
              })(
                <Input placeholder="请输入描述" type="textarea" />
              )
            }
          </Form.Item>
          <Form.Item label="物业单位">
            {
              this.form.getFieldDecorator('members', {
                initialValue: this.currentItem.members
              })(
                <Input placeholder="请输入描述" />
              )
            }
          </Form.Item>
          <Form.Item label="楼层数">
            <Form.Item>
              {
                this.form.getFieldDecorator('qq', {
                  initialValue: this.currentItem.sortIndex || 0
                })(
                  <Input placeholder="请输入排序值" />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                this.form.getFieldDecorator('ss', {
                  initialValue: this.currentItem.sortIndex || 0
                })(
                  <Checkbox>含地下楼层</Checkbox>
                )
              }
            </Form.Item>
          </Form.Item>
          <Form.Item label="排序">
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder="请输入排序值" />
              )
            }
          </Form.Item>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', {
                initialValue: this.currentItem.status
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
