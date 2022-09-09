import './index.scss'
import { Alert, Button, Checkbox, DatePicker, Form, Input, Radio, Select, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forModuleName from '@/mixins/forModuleName'
import { debounce, omit } from 'lodash'
import { dispatch } from '@/utils/store'
import apis from '@/apis'
import moment from 'moment'

export default Form.create({})({
  name: 'SigningProcess-SelectCompany',
  mixins: [forModuleName(true)],
  data() {
    return {
      companyInfoSelected: [],
      disableChangingCompany: false
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    },
    list() {
      if (+this.$route.query.ac === 1 || +this.$route.query.ac === 2) {
        this.companyInfoSelected = this.details.list

        return [
          {
            id: this.details.companyId,
            companyName: this.details.companyName
          }
        ]
      }

      return this.getState('list', this.moduleName, this.submoduleName)
    },
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    },
    enterpriseClassifications() {
      return this.getState('enterpriseClassifications', 'common')
    }
  },
  async created() {
    if (Array.isArray(this.details.list)) {
      this.companyInfoSelected = this.details.list
      this.disableChangingCompany = true
    }

    await Promise.all([
      dispatch('common', 'getEnterpriseClassifications'),
      this.onSearch('')
    ])
  },
  methods: {
    async onSearch(keyword) {
      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        payload: {
          companyCategory: this.form.getFieldValue('companyCategory'),
          companyName: keyword,
          additionalQueryParameters: { ...this.$route.query }
        }
      })
    },
    onCompanyCategoryChange() {
      this.$store.commit('setList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        value: []
      })

      this.form.setFieldsValue({ companyId: undefined })
      this.companyInfoSelected = []
    },
    onCompanyChecked(item) {
      this.companyInfoSelected = item.list
    },
    transformValue(values) {
      let temp = { ...values }

      if (this.$route.query.id) {
        temp.id = this.$route.query.id
        temp.signingType = this.$route.query.ac
      }

      if ('dateRange' in temp) {
        temp.startTime = moment(temp.dateRange[0]).format('YYYYMMDD')
        temp.endTime = moment(temp.dateRange[1]).format('YYYYMMDD')

        temp = omit(temp, 'dateRange')
      }

      if ('companyTypeList' in temp) {
        temp.companyTypeList = temp.companyTypeList.map(id => ({
          id,
          fullName: (this.enterpriseClassifications.list?.find(item => item.id === id)).fullName
        }))
      }

      return temp
    },
    onSubmit(e) {
      e?.preventDefault()
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const payload = this.transformValue(values)
          const response = await apis.step1OfSubmitContract(payload)

          if (response.status) {
            await this.$store.dispatch('getDetails', {
              moduleName: this.moduleName,
              payload: { id: response.data.id }
            })
          }
        }
      })
    }
  },
  render() {
    return (
      <Form
        class="bnm-select-business-form bnm-form-grid"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 21 }}
        colon={false}
        onSubmit={this.onSubmit}
      >
        <Form.Item>
          {
            this.disableChangingCompany
              ? (
                <Alert
                  banner
                  closable
                  type={'info'}
                  message={
                    <span>
                      如要重新选择企业，请到
                      <Button
                        type={'link'}
                        style={{ height: 'auto', padding: 0 }}
                        onClick={() => this.$router.replace({ name: 'myContracts' })}
                      >
                        我的签约
                      </Button>
                      删除本次签约，然后重新签约！
                    </span>
                  }
                />
              )
              : (
                <Alert
                  banner
                  closable
                  type={'info'}
                  message={'确认签约企业后，将不可更改企业，请谨慎选择！'}
                />
              )
          }
        </Form.Item>
        <Form.Item label={'签约企业类型'}>
          {
            this.form.getFieldDecorator('companyCategory', {
              initialValue: this.details.companyCategory || 1,
              rules: [
                {
                  required: true,
                  type: 'number',
                  message: '请选择企业类型!',
                  trigger: 'change'
                }
              ]
            })(
              <Radio.Group
                disabled={this.disableChangingCompany || +this.$route.query.ac === 1 || +this.$route.query.ac === 2}
                onChange={this.onCompanyCategoryChange}
              >
                <Radio value={1}>企业</Radio>
                <Radio value={2}>团队</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label={'签约企业'}>
          {
            this.form.getFieldDecorator('companyId', {
              initialValue: this.details.companyId || undefined,
              rules: [
                {
                  required: true,
                  message: '请选择签约企业!',
                  trigger: 'change'
                }
              ]
            })(
              <Select
                disabled={this.disableChangingCompany || +this.$route.query.ac === 1 || +this.$route.query.ac === 2}
                placeholder={'输入企业名称搜索已注册企业'}
                showSearch
                filterOption={false}
                onSearch={debounce(this.onSearch, 300)}
                notFoundContent={this.loading ? <Spin /> : undefined}
              >
                {
                  this.list.map(item => (
                    <Select.Option
                      value={item.id}
                      title={item.companyName}
                      onClick={() => this.onCompanyChecked(item)}
                    >
                      {item.companyName}
                    </Select.Option>
                  ))
                }
              </Select>
            )
          }
          {
            this.form.getFieldValue('companyId')
              ? (
                <ul class={'business-info-selected'}>
                  {
                    this.companyInfoSelected.map(item => (
                      <li key={item.id}>{item.name}：<span>{item.value}</span></li>
                    ))
                  }
                </ul>
              )
              : null
          }
        </Form.Item>
        <Form.Item label="所属行业">
          <Spin spinning={this.enterpriseClassifications.loading}>
            {
              this.form.getFieldDecorator('companyTypeList', {
                initialValue: this.details.companyTypeList || [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选择所属行业!',
                    trigger: 'change'
                  }
                ]
              })(
                <Checkbox.Group class={'industry'}>
                  {
                    this.enterpriseClassifications.list?.map(item => (
                      <Checkbox value={item.id}>{item.fullName}</Checkbox>
                    ))
                  }
                </Checkbox.Group>
              )
            }
          </Spin>
        </Form.Item>
        {
          this.form.getFieldValue('companyCategory') === 2
            ? (
              <Form.Item label="孵化项目">
                {
                  this.form.getFieldDecorator('project')(
                    <Input placeholder={'请输入孵化项目名称'} />
                  )
                }
              </Form.Item>
            )
            : null
        }
        <Form.Item label="签约期限">
          {
            this.form.getFieldDecorator('dateRange', {
              initialValue: this.details.starTime
                ? [moment(this.details.starTime, 'YYYYMMDD'), moment(this.details.endTime, 'YYYYMMDD')]
                : [],
              rules: [
                {
                  required: true,
                  type: 'array',
                  message: '请选择签约期限!',
                  trigger: 'change'
                }
              ]
            })(
              <DatePicker.RangePicker style={{ width: '100%' }} />
            )
          }
        </Form.Item>
        <Form.Item label={' '}>
          <Button type="primary" html-type="submit" loading={this.loading}>下一步</Button>
        </Form.Item>
      </Form>
    )
  }
})
