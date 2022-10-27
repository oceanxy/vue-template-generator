import '../assets/styles/index.scss'
import { Checkbox, Col, Form, Input, InputNumber, Row, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { cloneDeep, omit } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 900 } }
  },
  computed: {
    //   ...mapGetters({ getState: 'getState' }),
    //   parksForSelect() {
    //     return this.getState('parksForSelect', 'common') || []
    //   }
    fileList() {
      return this.currentItem.imgList?.map((item, index) => ({
        uid: index,
        key: item.key,
        url: item.path,
        status: 'done',
        name: item.path.substring(item.path.lastIndexOf('/'))
      })) ?? []
    }
  },
  // watch: {
  //   visible: {
  //     immediate: true,
  //     async handler(value) {
  //       if (value) {
  //         await dispatch('common', 'getParksForSelect')
  //       }
  //     }
  //   }
  // },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customDataHandler: values => {
            let temp = cloneDeep(values)

            temp.isUnderground = temp.isUnderground ? 1 : 0
            temp.imgs = temp.imgList?.map(item => item.response?.data[0].key ?? item.key).join()
            temp = omit(temp, 'imgList')

            return temp
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="tg-form-grid"
          colon={false}
        >
          <Form.Item label="图片">
            {
              this.form.getFieldDecorator('imgList', {
                initialValue: this.fileList,
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请上传图片!',
                    trigger: 'change'
                  }
                ]
              })(
                <BNUploadPictures />
              )
            }
          </Form.Item>
          <Form.Item
            label="编号"
            class={'half'}
          >
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
            label={'类型'}
            class={'half'}
          >
            {
              this.form.getFieldDecorator('buildType', {
                initialValue: this.currentItem.buildType || undefined,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择类型!',
                    trigger: 'change'
                  }
                ]
              })(
                <Select placeholder={'请选择类型'}>
                  <Select.Option value={1}>甲级写字楼</Select.Option>
                  <Select.Option value={2}>乙级写字楼</Select.Option>
                  <Select.Option value={3}>普通写字楼</Select.Option>
                  <Select.Option value={4}>独栋写字楼</Select.Option>
                  <Select.Option value={5}>综合体写字楼</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          {/*<Form.Item label={'所属中心'} class={'half'}>*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator('parkId', {*/}
          {/*      initialValue: this.currentItem.parkId || undefined,*/}
          {/*      rules: [{*/}
          {/*        required: true, message: '请选择所属中心!', trigger: 'change'*/}
          {/*      }]*/}
          {/*    })(*/}
          {/*      <Select placeholder={'请选择所属中心'}>*/}
          {/*        {*/}
          {/*          this.parksForSelect.map(item => (*/}
          {/*            <Select.Option value={item.id}>{item.fullName}</Select.Option>*/}
          {/*          ))*/}
          {/*        }*/}
          {/*      </Select>*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
          <Form.Item
            label="名称"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入楼栋名称!',
                    trigger: 'change'
                  }
                ]
              })(
                <Input
                  placeholder="请输入楼栋名称"
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
                      valuePropName: 'checked',
                      initialValue: this.currentItem.isUnderground === 1
                    })(
                      <Checkbox>含地下楼层</Checkbox>
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label={'地下楼层数'}
            class={'half'}
          >
            {
              this.form.getFieldDecorator('undergroundNum', {
                initialValue: this.currentItem.undergroundNum,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入地下楼层数!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  placeholder="请输入地下楼层数"
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="排序"
            class={'half'}
          >
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
          <Form.Item
            label="状态"
            class={'half'}
          >
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
