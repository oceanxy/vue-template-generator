import '../assets/styles/index.scss'
import { Col, Form, Input, Row, Switch } from 'ant-design-vue'
import { dispatch } from '@/utils/store'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import CascaderMenu from '@/components/BNContainerWithSystem/components/CascaderMenu'
import { mapState, mapAction } from '@/utils/store'
export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-eidt-menu-form'
      }
    }
  },
  computed: {},
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          //
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = {
        ...values
      }
      if (data.parentId.length > 0) {
        data.parentId = data.parentId[data.parentId.length - 1]
      } else {
        data.parentId = ''
      }
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
              <Form.Item label="父级菜单">
                {this.form.getFieldDecorator('parentId', {
                  initialValue: this.currentItem.parentIds
                })(<CascaderMenu />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="名称">
                {this.form.getFieldDecorator('menuName', {
                  initialValue: this.currentItem.menuName,
                  rules: [{ required: true, message: '请输入名称!', trigger: 'blur' }]
                })(<Input placeholder="请输入名称" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="简称">
                {this.form.getFieldDecorator('menuShortName', {
                  initialValue: this.currentItem.menuShortName
                })(<Input placeholder="请输入简称" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="图标">
                {this.form.getFieldDecorator('menuIcon', {
                  initialValue: this.currentItem.menuIcon
                })(<Input placeholder="请输入图标" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="地址">
                {this.form.getFieldDecorator('menuUrl', {
                  initialValue: this.currentItem.menuUrl,
                  rules: [{ required: true, message: '请输入地址!', trigger: 'blur' }]
                })(<Input placeholder="请输入地址" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="描述">
                {this.form.getFieldDecorator('menuDescribe', {
                  initialValue: this.currentItem.menuDescribe
                })(<Input placeholder="请输入描述" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="是否显示">
                {this.form.getFieldDecorator('isShow', {
                  initialValue: this.currentItem.isShow === 1,
                  valuePropName: 'checked'
                })(<Switch />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="是否默认">
                {this.form.getFieldDecorator('isDefault', {
                  initialValue: this.currentItem.isDefault === 1,
                  valuePropName: 'checked'
                })(<Switch />)}
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
            <Col span={12}>
              <Form.Item label="排序">
                {this.form.getFieldDecorator('sortIndex', {
                  initialValue: this.currentItem.sortIndex || undefined,
                  rules: [{ required: true, message: '请输入排序!', trigger: 'blur' }]
                })(<Input placeholder="请输入排序" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="扩展1">
                {this.form.getFieldDecorator('extend1', {
                  initialValue: this.currentItem.extend1
                })(<Input placeholder="请输入扩展1" allowClear />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="扩展2">
                {this.form.getFieldDecorator('extend2', {
                  initialValue: this.currentItem.extend2
                })(<Input placeholder="请输入扩展2" allowClear />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
