import '../assets/styles/index.scss'
import { Col, Form, Input, Row, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import CascaderMenu from '@/components/BNContainerWithSystemSider/components/CascaderMenu'
import CascaderRole from '@/components/BNContainerWithSystemSider/components/CascaderRole'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-edit-role-form'
      }
    }
  },
  computed: {},
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        //
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = {...values}

      if (data.parentId.length > 0) {
        data.parentId = data.parentId[data.parentId.length - 1]
      } else {
        data.parentId = ''
      }

      if (data.indexMenuId.length > 0) {
        data.indexMenuId = data.indexMenuId[data.indexMenuId.length - 1]
      } else {
        data.indexMenuId = ''
      }

      data.id = this.currentItem?.id ?? ''

      return data
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form class="" colon={false}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="所属角色">
                {this.form.getFieldDecorator('parentId', {
                  initialValue: this.currentItem.parentIds || [],
                  rules: [{
                    required: true, type: 'array', message: '请选择角色!', trigger: 'change'
                  }]
                })(<CascaderRole />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="名称">
                {this.form.getFieldDecorator('fullName', {
                  initialValue: this.currentItem.fullName,
                  rules: [{
                    required: true, message: '请输入名称!', trigger: 'blur'
                  }]
                })(<Input placeholder="请输入名称" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="默认菜单">
                {this.form.getFieldDecorator('indexMenuId', {initialValue: this.currentItem.indexMenuIds || []})(<CascaderMenu />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="描述">
                {this.form.getFieldDecorator('roleDescribe', {initialValue: this.currentItem.roleDescribe})(<Input placeholder="请输入名称" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="排序">
                {this.form.getFieldDecorator('sortIndex', {
                  initialValue: `${this.currentItem.sortIndex || ''}` || undefined,
                  rules: [{
                    required: true, message: '请输入排序!', trigger: 'blur'
                  }]
                })(<Input placeholder="越大排在越前" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="状态">
                {this.form.getFieldDecorator('status', {
                  initialValue: this.currentItem.status === 1,
                  valuePropName: 'checked'
                })(<Switch />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
