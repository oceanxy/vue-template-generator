import '../assets/styles/index.scss'
import { Col, Form, Input, InputNumber, Radio, Row, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'
import UploadPictures from '@/views/manager/parkSupervision/technologyBureau/Parks/components/UploadPictures'

export default Form.create({})({
  mixins: [forFormModal()],
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
        width: 900
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
        ok: () => this.onSubmit()
      }
    }

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
          <Form.Item label="房号" class={'half'}>
            {
              this.form.getFieldDecorator('roomNo', {
                initialValue: this.currentItem.roomNo,
                rules: [{ required: true, message: '请输入房号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入房号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="房源位置" class={'half'}>
            {
              this.form.getFieldDecorator('name', {
                initialValue: this.currentItem.name,
                rules: [{ required: true, message: '请选择房源位置!', trigger: 'change' }]
              })(
                <Select></Select>
              )
            }
          </Form.Item>
          <Form.Item label="面积（㎡）" class={'half'}>
            {
              this.form.getFieldDecorator('roomArea', {
                initialValue: this.currentItem.roomArea,
                rules: [{ required: true, type: 'number', message: '请输入面积!', trigger: 'blur' }]
              })(
                <InputNumber
                  placeholder="请输入面积"
                  style={{ width: '100%' }}
                  min={1}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="出租单价" class={'half'} required>
            <Row gutter={10}>
              <Col span={13}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('priceType', {
                      initialValue: this.currentItem.priceType || 2,
                      rules: [{ required: true, type: 'number', message: '请选择计费方式!', trigger: 'change' }]
                    })(
                      <Select placeholder="请选择计费方式">
                        <Select.Option value={1}>按月计费</Select.Option>
                        <Select.Option value={2}>按季计费</Select.Option>
                        <Select.Option value={3}>按年计费</Select.Option>
                      </Select>
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('price', {
                      initialValue: this.currentItem.price,
                      rules: [{ required: true, type: 'number', message: '请输入单价!', trigger: 'blur' }]
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="请输入单价"
                        min={0}
                        precision={2}
                      />
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="工位数" class={'half'}>
            {
              this.form.getFieldDecorator('workstationNum', {
                initialValue: this.currentItem.workstationNum,
                rules: [{ required: true, type: 'number', message: '请输入工位数!', trigger: 'blur' }]
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入工位数"
                  min={0}
                />
              )
            }
          </Form.Item>
          <Form.Item label="装修情况" class={'half'}>
            {
              this.form.getFieldDecorator('renovationStatus', {
                initialValue: this.currentItem.renovationStatus,
                rules: [{ required: true, type: 'number', message: '请选择装修情况!', trigger: 'blur' }]
              })(
                <Select placeholder="请选择装修情况" allowClear>
                  <Select.Option value={1}>简装</Select.Option>
                  <Select.Option value={2}>精装</Select.Option>
                  <Select.Option value={3}>豪装</Select.Option>
                  <Select.Option value={4}>星级装修</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="房源结构" class={'half'}>
            {
              this.form.getFieldDecorator('structure', {
                initialValue: this.currentItem.structure,
                rules: [{ required: true, type: 'number', message: '请选择房源结构!', trigger: 'blur' }]
              })(
                <Select placeholder="请选择房源结构" allowClear>
                  <Select.Option value={1}>单体空间</Select.Option>
                  <Select.Option value={2}>复式结构</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="所在楼层" class={'half'} required>
            <Row gutter={10}>
              <Col span={13}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('floorType', {
                      initialValue: this.currentItem.floorType || 1,
                      rules: [{ required: true, type: 'number', message: '请选择楼层类型!', trigger: 'change' }]
                    })(
                      <Select placeholder="请选择楼层类型">
                        <Select.Option value={1}>正楼层</Select.Option>
                        <Select.Option value={2}>负楼层</Select.Option>
                      </Select>
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('floorNum', {
                      initialValue: this.currentItem.floorNum,
                      rules: [{ required: true, type: 'number', message: '请输入楼层数!', trigger: 'blur' }]
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="请输入楼层数"
                      />
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="类别等级">
            {
              this.form.getFieldDecorator('grade', {
                initialValue: this.currentItem.grade || 1,
                rules: [{ required: true, type: 'number', message: '请选择类别等级!', trigger: 'change' }]
              })(
                <Radio.Group>
                  <Radio value={1}>甲级写字楼</Radio>
                  <Radio value={2}>乙级写字楼</Radio>
                  <Radio value={3}>普通写字楼</Radio>
                  <Radio value={4}>独栋写字楼</Radio>
                  <Radio value={5}>城市综合体写字楼</Radio>
                </Radio.Group>
              )
            }
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
