import { Button, DatePicker, Form, message, Select } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'
import { cloneDeep, omit } from 'lodash'

export default Form.create({})({
  data() {
    return { loading: false }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    roleTree() {
      return this.getState('roleTree', 'common') || { loading: false, list: [] }
    },
    parksForSelect() {
      return this.getState('parksForSelect', 'common') || []
    },
    administrativeDivision() {
      return this.getState('administrativeDivision', 'common') || []
    }
  },
  async created() {
    await Promise.all([
      dispatch('common', 'getParksForSelect'),
      dispatch('common', 'getRoleTree'),
      dispatch('common', 'getAdministrativeDivision')
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

          payload.provinceId = payload.areaCode[0]
          payload.cityId = payload.areaCode[1]
          payload.countyId = payload.areaCode[2]
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
        <Form.Item label={'签约企业'}>
          {
            this.form.getFieldDecorator('parkId', {
              rules: [
                {
                  required: true, message: '请选择所属中心!', trigger: 'blur'
                }
              ]
            })(
              <Select placeholder={'请选择所属中心'}>
                {
                  this.parksForSelect.map(item => (
                    <Select.Option value={item.id}>{item.fullName}</Select.Option>
                  ))
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label={'预定期限'}>
          {
            this.form.getFieldDecorator('parkId', {
              rules: [
                {
                  required: true, message: '请选择预定期限时间范围!', trigger: 'change'
                }
              ]
            })(
              <DatePicker.RangePicker
                style={{ width: '100%' }}
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
