import '../assets/styles/index.scss'
import { Checkbox, Col, Form, Input, Row, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import UploadPictures from '@/views/manager/parkSupervision/technologyBureau/Parks/components/UploadPictures'
import { dispatch } from '@/utils/store'

export default Form.create({})({
  mixins: [
    forFormModal
  ],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    modalTitle: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      modalProps: {
        width: 810
      }
    }
  },
  computed: {
    ...mapGetters({
      parksForSelect: 'parksForSelect'
    })
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          if (!this.parksForSelect.length) {
            await dispatch('common', 'getParksForSelect')
          }
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
      }
    }

    // 回显图片
    const fileList = this.currentItem.imgList?.map((item, index) => ({
      uid: index,
      url: item.path,
      key: item.key,
      status: 'done',
      name: item.path.substring(item.path.lastIndexOf('/'))
    })) ?? []

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="图片">
            {
              this.form.getFieldDecorator('imgList', {
                initialValue: fileList,
                rules: [{ required: true, type: 'array', message: '请上传图片!', trigger: 'blur' }]
              })(
                <UploadPictures />
              )
            }
          </Form.Item>
          <Form.Item label="编号" class={'half'}>
            {
              this.form.getFieldDecorator('buildNo', {
                initialValue: this.currentItem.buildNo,
                rules: [{ required: true, message: '请输入编号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入编号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label={'所属园区'} class={'half'}>
            {
              this.form.getFieldDecorator('parkId', {
                rules: [{ required: true, message: '请选择所属园区!', trigger: 'blur' }]
              })(
                <Select placeholder={'请选择所属园区'}>
                  {
                    this.parksForSelect.map(item => (
                      <Select.Option value={item.id}>{item.fullName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [{ required: true, message: '请输入楼栋名称!', trigger: 'change' }]
              })(
                <Input placeholder="请输入楼栋名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="楼层数">
            <Row gutter={20}>
              <Col span={10}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('floorNum', {
                      initialValue: this.currentItem.floorNum,
                      rules: [{ required: true, type: 'number', message: '请输入楼栋名称!', trigger: 'change' }]
                    })(
                      <Input placeholder="请输入排序值" />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('isUnderground', {
                      initialValue: this.currentItem.isUnderground === 1
                    })(
                      <Checkbox>含地下楼层</Checkbox>
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [{ required: true, type: 'number', message: '请输入排序值!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入排序值" />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: this.currentItem.status === 1,
                rules: [{ required: true, type: 'boolean', message: '请选择状态!', trigger: 'blur' }]
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
