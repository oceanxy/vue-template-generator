import '../assets/styles/index.scss'
import { Form, Input, Select, Switch } from 'ant-design-vue'
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
          <Form.Item label="所属园区">
            {
              this.form.getFieldDecorator('gg', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Select></Select>
              )
            }
          </Form.Item>
          <Form.Item label="类型">
            {
              this.form.getFieldDecorator('hh', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Select></Select>
              )
            }
          </Form.Item>
          <Form.Item label="名称">
            {
              this.form.getFieldDecorator('jj', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="账号">
            {
              this.form.getFieldDecorator('mm', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="登录密码">
            {
              this.form.getFieldDecorator('nn', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="负责人">
            {
              this.form.getFieldDecorator('bb', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="负责人手机">
            {
              this.form.getFieldDecorator('vv', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="联系电话">
            {
              this.form.getFieldDecorator('cc', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="通信地址">
            {
              this.form.getFieldDecorator('xx', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder={'请输入名称'} />
              )
            }
          </Form.Item>
          <Form.Item label="简介">
            {
              this.form.getFieldDecorator('ss', {
                initialValue: this.currentItem.sortIndex || 0
              })(
                <Input placeholder="请输入简介" type="textarea" />
              )
            }
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
