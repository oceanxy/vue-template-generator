import { Button, Cascader, Col, Form, Input, message, Row, TreeSelect } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import { cloneDeep, omit } from 'lodash'
import { verifyIDNumber, verifyMobileNumber } from '@/utils/validators'

export default Form.create({})({
  data() {
    return { loading: false }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    // parksForSelect() {
    //   return this.getState('parksForSelect', 'common') || []
    // },
    // organizationTree() {
    //   return this.getState('organizationTree', 'common')
    // },
    roleTree() {
      return this.getState('roleTree', 'common') || { loading: false, list: [] }
    },
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    }
  },
  async created() {
    await Promise.all([
      // await dispatch('common', 'getOrganizationTree'),
      // await dispatch('common', 'getParksForSelect'),
      await dispatch('common', 'getRoleTree'),
      await dispatch('common', 'getAdministrativeDivision')
    ])
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()

      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          this.loading = true
          let payload = cloneDeep(values)

          payload.roleIds = payload.roleIds.join()

          if (payload.areaCode) {
            payload.provinceId = payload.areaCode[0]
            payload.cityId = payload.areaCode[1]
            payload.countyId = payload.areaCode[2]
          }

          payload = omit(payload, 'areaCode')

          const status = await dispatch('accountOpening', 'addAccountOpening', payload)

          this.loading = false

          if (status) {
            this.form.resetFields()
            message.success('申请已成功发送，请耐心等待管理员审核。')
            await dispatch('accountOpening', 'getListOfAccountApplicationRecord')
          }
        }
      })
    }
  },
  render() {
    return (
      <Form
        class={'bnm-form-grid'}
        onSubmit={this.onSubmit}
      >
        {/*<Form.Item label={'所属中心'} class={'half'}>*/}
        {/*  {*/}
        {/*    this.form.getFieldDecorator('parkId', {*/}
        {/*      rules: [*/}
        {/*        {*/}
        {/*          required: true, message: '请选择所属中心!', trigger: 'blur'*/}
        {/*        }*/}
        {/*      ]*/}
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
        {/*<Form.Item*/}
        {/*  label="组织机构"*/}
        {/*  class={'half'}*/}
        {/*>*/}
        {/*  {*/}
        {/*    this.form.getFieldDecorator('organId', {*/}
        {/*      rules: [*/}
        {/*        {*/}
        {/*          required: true,*/}
        {/*          message: '请选择组织机构!',*/}
        {/*          trigger: 'blur'*/}
        {/*        }*/}
        {/*      ]*/}
        {/*    })(*/}
        {/*      <TreeSelect*/}
        {/*        showSearch*/}
        {/*        allowClear*/}
        {/*        treeData={this.organizationTree?.list ?? []}*/}
        {/*        replaceFields={{*/}
        {/*          children: 'children', title: 'name', key: 'id', value: 'id'*/}
        {/*        }}*/}
        {/*        treeNodeFilterProp={'title'}*/}
        {/*        placeholder={'请选择所属组织机构'}*/}
        {/*        searchPlaceholder={'请输入关键字以搜索'}*/}
        {/*      />*/}
        {/*    )*/}
        {/*  }*/}
        {/*</Form.Item>*/}
        <Form.Item
          label={'申请账号'}
          class={'half'}
        >
          {
            this.form.getFieldDecorator('loginAccount', {
              rules: [
                {
                  required: true,
                  message: '请输入登录账号!',
                  trigger: 'blur'
                }
              ]
            })(
              <Input placeholder={'请输入登录账号'} />
            )
          }
        </Form.Item>
        {/* <Form.Item label={'登录密码'} class={'half'}>
          {
            this.form.getFieldDecorator('loginPwd', {
              rules: [{
                required: true, message: '请输入登录密码!', trigger: 'blur'
              }]
            })(
              <Input placeholder={'请输入登录密码'} />
            )
          }
        </Form.Item> */}
        <Form.Item
          label={'角色'}
          class={'half'}
        >
          {
            this.form.getFieldDecorator('roleIds', {
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
                  children: 'children', title: 'name', key: 'id', value: 'id'
                }}
                treeNodeFilterProp={'title'}
                placeholder={'请选择角色'}
                searchPlaceholder={'请输入关键字以搜索'}
              />
            )
          }
        </Form.Item>
        <Form.Item
          label={'姓名'}
          class={'half'}
        >
          {
            this.form.getFieldDecorator('fullName', {
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
        <Form.Item
          label={'手机号码'}
          class={'half'}
        >
          {
            this.form.getFieldDecorator('mobile', {
              rules: [
                {
                  required: true,
                  message: '请输入手机号!',
                  trigger: 'blur'
                },
                { validator: verifyMobileNumber }
              ]
            })(
              <Input placeholder={'请输入手机号'} />
            )
          }
        </Form.Item>
        <Form.Item
          label={'身份证号码'}
          class={'half'}
        >
          {
            this.form.getFieldDecorator('idCard', { rules: [{ validator: verifyIDNumber }] })(
              <Input placeholder={'请输入身份证号码'} />
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
                  this.form.getFieldDecorator('areaCode')(
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
                  this.form.getFieldDecorator('address')(
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
        <Form.Item label={'申请说明'}>
          {
            this.form.getFieldDecorator('description')(
              <Input.TextArea
                placeholder={'请输入申请说明'}
                autoSize={{ minRows: 6 }}
              />
            )
          }
        </Form.Item>
        <Form.Item
          label={' '}
          colon={false}
        >
          <Button
            icon={this.loading ? 'loading' : 'check'}
            type={'primary'}
            htmlType={'submit'}
            disabled={this.loading}
          >
            提交审核
          </Button>
        </Form.Item>
      </Form>
    )
  }
})
