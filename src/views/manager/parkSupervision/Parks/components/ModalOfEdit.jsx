import '../assets/styles/index.scss'
import { Cascader, Col, Form, Input, InputNumber, Row, Select, Spin, Switch } from 'ant-design-vue'
import { dispatch } from '@/utils/store'
import { mapGetters } from 'vuex'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { verifyIDNumber, verifyMobileNumber, verifyPhoneNumber } from '@/utils/validators'
import { cloneDeep, omit } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    },
    unitsForSelect() {
      return this.getState('unitsForSelect', 'common') || []
    },
    defaultAdministrativeDivision() {
      return this.getState('defaultAdministrativeDivision', 'common') || []
    },
    loadingOfUnitsForSelect() {
      return this.getState('loadingOfUnitsForSelect', 'common')
    },
    fileList() {
      return this.currentItem.imgList?.map((item, index) => ({
        uid: index,
        url: item.path,
        key: item.key,
        status: 'done',
        name: item.path.substring(item.path.lastIndexOf('/'))
      })) ?? []
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await Promise.all([
            dispatch('common', 'getAdministrativeDivision'),
            dispatch('common', 'getUnitsForSelect')
          ])
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customDataHandler: values => {
            let temp = cloneDeep(values)

            temp.imgs = temp.imgList?.map(item => item.response?.data[0].key ?? item.key).join()
            temp = omit(temp, 'imgList')

            return temp
          },
          done: async () => {
            // 编辑时，更新 Header 内的相关信息
            if (this.currentItem.id) {
              await Promise.all([
                this.$store.dispatch('custom', {
                  moduleName: 'login',
                  customApiName: 'getUserInfo',
                  closeModalAfterFetched: false,
                  stateName: 'userInfo'
                }),
                this.$store.dispatch('custom', {
                  moduleName: 'login',
                  stateName: 'parkList',
                  customApiName: 'getParksOfCurrentUser',
                  closeModalAfterFetched: false
                })
              ])
            }
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="图片">
            {
              this.form.getFieldDecorator('imgList', {
                initialValue: this.fileList,
                rules: [
                  {
                    required: true, type: 'array', message: '请上传图片!', trigger: 'blur'
                  }
                ]
              })(
                <BNUploadPictures />
              )
            }
          </Form.Item>
          <Form.Item
            label="名称"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true, message: '请输入中心名称!', trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入中心名称"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="编号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('parkNo', {
                initialValue: this.currentItem.parkNo,
                rules: [
                  {
                    required: true, message: '请输入中心编号!', trigger: 'blur'
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
            label="管理员账号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('loginAccount', {
                initialValue: this.currentItem.loginAccount,
                rules: [
                  {
                    required: true,
                    message: '请输入管理员登录账号!',
                    trigger: 'blur'
                  },
                  { validator: verifyMobileNumber }
                ]
              })(
                <Input
                  placeholder="请输入登录账号"
                  disabled={!!this.currentItem.id}
                />
              )
            }
          </Form.Item>
          {
            // this.currentItem.id ? null : (
            //   <Form.Item label="登录密码" class={'half'}>
            //     {
            //       this.form.getFieldDecorator('loginPwd', {
            //         initialValue: this.currentItem.loginPwd
            //         // rules: [{ required: true, message: '请输入登录密码!', trigger: 'blur' }]
            //       })(
            //         <Input placeholder="请输入登录密码" />
            //       )
            //     }
            //   </Form.Item>
            // )
          }
          <Form.Item
            label="类型"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('parkType', {
                initialValue: this.currentItem.parkType || 1,
                rules: [
                  {
                    required: true, type: 'number', message: '请选择类型!', trigger: 'blur'
                  }
                ]
              })(
                <Select placeholder="请选择类型">
                  <Select.Option value={1}>普通中心</Select.Option>
                  <Select.Option value={2}>扩展中心</Select.Option>
                  <Select.Option value={3}>培育中心</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item
            label="地址"
            class={'custom'}
            required
          >
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('areaCode', {
                      initialValue: this.currentItem.provinceId && this.currentItem.cityId && this.currentItem.countyId
                        ? [
                          this.currentItem.provinceId,
                          this.currentItem.cityId,
                          this.currentItem.countyId
                        ]
                        : this.defaultAdministrativeDivision,
                      rules: [
                        {
                          required: true, type: 'array', message: '请选择行政区划!', trigger: 'blur'
                        }
                      ]
                    })(
                      <Cascader
                        placeholder="请选择省市区"
                        expandTrigger={'hover'}
                        allowClear
                        options={this.administrativeDivision}
                        fieldNames={{
                          label: 'name', value: 'id', children: 'children'
                        }}
                      />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('address', {
                      initialValue: this.currentItem.address,
                      rules: [
                        {
                          required: true, message: '请输入详细地址!', trigger: 'blur'
                        }
                      ]
                    })(
                      <Input
                        placeholder="请输入详细地址"
                        allowClear
                      />
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="监管单位">
            {
              this.form.getFieldDecorator(
                'regulationUnitIdList',
                { initialValue: this.currentItem.regulationUnitIdList || undefined }
              )(
                <Select
                  allowClear
                  mode={'multiple'}
                  placeholder="请选择监管单位"
                  notFoundContent={this.loadingOfUnitsForSelect ? <Spin /> : undefined}
                >
                  {
                    this.unitsForSelect.map(item => (
                      <Select.Option value={item.id}>{item.unitName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="运营单位">
            {
              this.form.getFieldDecorator(
                'operationUnitIdList',
                { initialValue: this.currentItem.operationUnitIdList || undefined }
              )(
                <Select
                  allowClear
                  mode={'multiple'}
                  placeholder="请选择运营单位"
                  notFoundContent={this.loadingOfUnitsForSelect ? <Spin /> : undefined}
                >
                  {
                    this.unitsForSelect.map(item => (
                      <Select.Option value={item.id}>{item.unitName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="物业单位">
            {
              this.form.getFieldDecorator(
                'propertyUnitIdList',
                { initialValue: this.currentItem.propertyUnitIdList || undefined }
              )(
                <Select
                  allowClear
                  mode={'multiple'}
                  placeholder="请选择物业单位"
                  notFoundContent={this.loadingOfUnitsForSelect ? <Spin /> : undefined}
                >
                  {
                    this.unitsForSelect.map(item => (
                      <Select.Option value={item.id}>{item.unitName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item
            label="负责人"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('dutyPerson', { initialValue: this.currentItem.dutyPerson })(
                <Input placeholder="请输入负责人姓名" />
              )
            }
          </Form.Item>
          <Form.Item
            label="负责人身份证"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('dutyPersonIdCard', {
                initialValue: this.currentItem.dutyPersonIdCard,
                rules: [{ validator: verifyIDNumber }]
              })(
                <Input placeholder="请输入负责人身份证号码" />
              )
            }
          </Form.Item>
          <Form.Item
            label="负责人手机号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('dutyPersonMobile', {
                initialValue: this.currentItem.dutyPersonMobile,
                rules: [{ validator: verifyMobileNumber }]
              })(
                <Input placeholder="请输入负责人手机号码" />
              )
            }
          </Form.Item>
          <Form.Item
            label="中心联系电话"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('phone', {
                initialValue: this.currentItem.phone,
                rules: [{ validator: verifyPhoneNumber }]
              })(
                <Input
                  placeholder="请输入联系电话"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="楼栋信息">
            {
              this.form.getFieldDecorator('buildInfo', { initialValue: this.currentItem.buildInfo })(
                <Input.TextArea
                  placeholder="请输入楼栋信息"
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="中心配套">
            {
              this.form.getFieldDecorator('parkSupport', { initialValue: this.currentItem.parkSupport })(
                <Input.TextArea
                  placeholder="请输入中心配套"
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="简介">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea
                  placeholder="请输入简介"
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="运营情况">
            {
              this.form.getFieldDecorator('operation', { initialValue: this.currentItem.operation })(
                <Input.TextArea
                  placeholder="请输入运营情况"
                  autoSize={{ minRows: 6 }}
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
                    required: true, type: 'number', message: '请输入排序值!', trigger: 'blur'
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
