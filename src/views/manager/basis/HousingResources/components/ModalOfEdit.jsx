import '../assets/styles/index.scss'
import { Checkbox, Col, Form, Input, InputNumber, Row, Select, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { dispatch } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 900 } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    floorTree() {
      return this.getState('floorTree', 'common')
    },
    supportingFacilities() {
      return this.$store.state[this.moduleName].supportingFacilities
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await dispatch('common', 'getFloorTree')
          await dispatch(this.moduleName, 'getSupportingFacilities')
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
          colon={false}
        >
          <Form.Item label="图片">
            {
              this.form.getFieldDecorator('imgList', {
                initialValue: fileList,
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请上传图片!',
                    trigger: 'blur'
                  }
                ]
              })(
                <BNUploadPictures />
              )
            }
          </Form.Item>
          <Form.Item label="房号" class={'half'}>
            {
              this.form.getFieldDecorator('roomNo', {
                initialValue: this.currentItem.roomNo,
                rules: [
                  {
                    required: true,
                    message: '请输入房号!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入房号" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="房源位置" class={'half'}>
            {
              this.form.getFieldDecorator('floorId', {
                initialValue: this.currentItem.floorId,
                rules: [
                  {
                    required: true,
                    message: '请选择房源位置!',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  treeDefaultExpandedKeys={[this.floorTree?.[0]?.id, this.currentItem.floorId]}
                  dropdownClassName={'bnm-select-dropdown'}
                  treeData={this.floorTree}
                  replaceFields={{
                    children: 'children', title: 'name', key: 'id', value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择房源位置'}
                />
              )
            }
          </Form.Item>
          <Form.Item label="面积（㎡）" class={'half'}>
            {
              this.form.getFieldDecorator('roomArea', {
                initialValue: +this.currentItem.roomArea || undefined,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入面积!',
                    trigger: 'blur'
                  }
                ]
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
          <Form.Item label="单价（㎡）" class={'half combo'} required>
            <Row gutter={10}>
              <Col span={13}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('priceType', {
                      initialValue: this.currentItem.priceType || 1,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请选择计费方式!',
                          trigger: 'change'
                        }
                      ]
                    })(
                      <Select placeholder="请选择计费方式">
                        <Select.Option value={1}>按月计费</Select.Option>
                        {/*<Select.Option value={2}>按季计费</Select.Option>*/}
                        {/*<Select.Option value={3}>按年计费</Select.Option>*/}
                      </Select>
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('price', {
                      initialValue: +this.currentItem.price || undefined,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请输入单价!',
                          trigger: 'blur'
                        }
                      ]
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
          <Form.Item label="房源类型" class={'half'}>
            {
              this.form.getFieldDecorator('roomType', {
                initialValue: this.currentItem.roomType || undefined,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择房源类型!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Select placeholder="请选择房源类型" allowClear>
                  <Select.Option value={1}>普通房源</Select.Option>
                  <Select.Option value={2}>会议室</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="工位数" class={'half'}>
            {
              this.form.getFieldDecorator('workstationNum', { initialValue: this.currentItem.workstationNum })(
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
                initialValue: this.currentItem.renovationStatus || undefined
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
              this.form.getFieldDecorator('structure', { initialValue: this.currentItem.structure || undefined })(
                <Select placeholder="请选择房源结构" allowClear>
                  <Select.Option value={1}>单体空间</Select.Option>
                  <Select.Option value={2}>复式结构</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="配套设施">
            {
              this.form.getFieldDecorator('facilityList', { initialValue: this.currentItem.facilityList || [] })(
                <Checkbox.Group class={'bnm-form-checkbox'}>
                  {
                    this.supportingFacilities.map(item => (
                      <Checkbox value={item.id}>{item.fullName}</Checkbox>
                    ))
                  }
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序值!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入排序值" />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: this.currentItem.id ? this.currentItem.status === 1 : true,
                rules: [
                  {
                    required: true,
                    type: 'boolean',
                    message: '请选择状态!',
                    trigger: 'blur'
                  }
                ]
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
