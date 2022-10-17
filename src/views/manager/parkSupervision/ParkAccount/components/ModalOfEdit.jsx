import '../assets/styles/index.scss'
import { Cascader, Col, Form, Input, InputNumber, Row, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import dynamicState from '@/mixins/dynamicState'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import { verifyIDNumber, verifyMobileNumber } from '@/utils/validators'
import { cloneDeep } from 'lodash'

export default Form.create({ name: 'editForm' })({
  mixins: [
    forFormModal(),
    dynamicState({ customModuleName: 'organizations' })
  ],
  data() {
    return { modalProps: { width: 810 } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    organizationTree() {
      return this.getState('organizationTree', 'common')
    },
    roleTree() {
      return this.getState('roleTree', 'common') || { loading: false, list: [] }
    },
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        await Promise.all([
          dispatch('common', 'getOrganizationTree'),
          dispatch('common', 'getRoleTree'),
          dispatch('common', 'getAdministrativeDivision')
        ])
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
            const temp = cloneDeep(values)

            temp.roleIds = temp.roleIds.join()

            return temp
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class={'bnm-form-grid'}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="组织机构">
            {
              this.form.getFieldDecorator('organId', {
                initialValue: this.currentItem.organId,
                rules: [
                  {
                    required: true,
                    message: '请选择组织机构!',
                    trigger: 'blur'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  disabled
                  treeData={this.organizationTree?.list ?? []}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  placeholder={'请选择所属组织机构'}
                  searchPlaceholder={'请输入关键字以搜索'}
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="登录账号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('loginName', {
                initialValue: this.currentItem.loginName,
                rules: [
                  {
                    required: true,
                    message: '请输入登录账号!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder={'请输入登录账号'}
                  disabled
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="姓名"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入姓名!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder={'请输入姓名'} />
              )
            }
          </Form.Item>
          <Form.Item label={'角色'}>
            {
              this.form.getFieldDecorator('roleIds', {
                initialValue: this.currentItem.roleIds?.split(','),
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选择角色!',
                    trigger: 'blur'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  multiple
                  treeData={this.roleTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  placeholder={'请选择角色'}
                  searchPlaceholder={'请输入关键字以搜索'}
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="手机号码"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('mobile', {
                initialValue: this.currentItem.mobile,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号码!',
                    trigger: 'blur'
                  },
                  { validator: verifyMobileNumber }
                ]
              })(
                <Input
                  placeholder={'请输入手机号码'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="身份证号"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('idCard', {
                initialValue: this.currentItem.idCard,
                rules: [
                  { validator: verifyIDNumber }
                ]
              })(
                <Input
                  placeholder={'请输入身份证号码'}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="联系地址"
            class={'custom'}
          >
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('areaCode', {
                      initialValue: this.currentItem.provinceId
                        ? [
                          this.currentItem.provinceId,
                          this.currentItem.cityId,
                          this.currentItem.countyId
                        ]
                        : undefined
                    })(
                      <Cascader
                        placeholder="请选择省市区"
                        expandTrigger={'hover'}
                        allowClear
                        options={this.administrativeDivision}
                        fieldNames={{
                          label: 'name',
                          value: 'id',
                          children: 'children'
                        }}
                      />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('address', { initialValue: this.currentItem.address })(
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
          <Form.Item label="简介">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea
                  placeholder="请输入简介"
                  autoSize={{ minRows: 6 }}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="排序"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('sortIndex', { initialValue: this.currentItem.sortIndex || 0 })(
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
                initialValue: this.currentItem.status === 1
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
