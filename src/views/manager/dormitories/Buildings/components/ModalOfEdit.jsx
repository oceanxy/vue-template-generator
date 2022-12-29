import { Checkbox, Col, Form, Input, InputNumber, Row, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 860,
        destroyOnClose: true
      }
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    schoolTree() {
      return this.$store.state[this.moduleName].schoolTree
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit()
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'schoolTree',
            customApiName: 'getSchoolTree'
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="所属组织" class={'half'}>
            {
              this.form.getFieldDecorator('schoolId', {
                initialValue: this.currentItem.schoolId || this.search.schoolId,
                rules: [
                  {
                    required: true,
                    message: '请选择学校！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.schoolTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  searchPlaceholder={'请输入学校名称搜索'}
                  placeholder={'请选择学校'}
                  treeDefaultExpandedKeys={[this.currentItem.schoolId || this.search.schoolId]}
                />
              )
            }
          </Form.Item>
          <Form.Item label="楼栋名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入楼栋名称!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder={'请输入楼栋名称'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="编号" class={'half'}>
            {
              this.form.getFieldDecorator('buildNo', {
                initialValue: this.currentItem.buildNo,
                rules: [
                  {
                    required: true,
                    message: '请输入编号!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入编号"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="楼层数"
            class={'half combo'}
            required
          >
            <Row gutter={20}>
              <Col span={13}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('floorNum', {
                      initialValue: this.currentItem.floorNum,
                      rules: [
                        {
                          required: true,
                          type: 'number',
                          message: '请输入楼层数!',
                          trigger: 'blur'
                        }
                      ]
                    })(
                      <InputNumber
                        min={0}
                        style={{ width: '100%' }}
                        placeholder="请输入楼层数"
                      />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('isUnderground', {
                      initialValue: this.currentItem.isUnderground || 0,
                      getValueFromEvent: e => +e.target.checked,
                      getValueProps: val => ({ checked: !!val })
                    })(
                      <Checkbox>含地下楼层</Checkbox>
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label={'地下楼层数'} class={'half'}>
            {
              this.form.getFieldDecorator('undergroundNum', {
                initialValue: this.currentItem.undergroundNum,
                rules: [
                  {
                    required: this.form.getFieldValue('isUnderground') === 1,
                    type: 'number',
                    message: '请输入地下楼层数!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  disabled={this.form.getFieldValue('isUnderground') !== 1}
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="请输入地下楼层数"
                />
              )
            }
          </Form.Item>
          <Form.Item label={'经纬度'} class={'half combo'}>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('latitude', { initialValue: this.currentItem.latitude })(
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="请输入纬度"
                      />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('longitude', { initialValue: this.currentItem.longitude })(
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="请输入经度"
                      />
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
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序值!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入排序值"
                />
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
                    trigger: 'change'
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
