import { Button, Form, Input, message, Radio, Select, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import { cloneDeep, debounce } from 'lodash'
import BNUploadPictures from '@/components/BNUploadPictures'

export default Form.create({})({
  inject: ['moduleName'],
  data() {
    return { loading: false }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    companyList() {
      return this.getState('companyList', this.moduleName) || []
    },
    personnelForSelect() {
      return this.getState('personnelForSelect', this.moduleName) || []
    }
  },
  async created() {
    await Promise.all([
      this.onSearchCompany(),
      this.onSearchPersonnel()
    ])
  },
  methods: {
    /**
     * 搜索企业
     * @param [keyword]
     * @returns {Promise<void>}
     */
    async onSearchCompany(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        customApiName: 'getBusinessesForSelect',
        stateName: 'companyList',
        payload: { companyName: keyword }
      })
    },
    /**
     * 搜索人员
     * @param [keyword] {string}
     * @returns {Promise<void>}
     */
    async onSearchPersonnel(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        customApiName: 'getSuggestionPersonnelForSelect',
        stateName: 'personnelForSelect',
        payload: { fullName: keyword }
      })
    },
    onSubmit(e) {
      e.preventDefault()

      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          this.loading = true
          const payload = cloneDeep(values)

          payload.imgs = payload.imgs.map(item => item.response.data[0].key).join()

          const status = await this.$store.dispatch('custom', {
            moduleName: this.moduleName,
            customApiName: 'addAssignComplaints',
            payload
          })

          this.loading = false

          if (status) {
            this.form.resetFields()
            message.success('登记成功，请耐心等待工作人员处理。')
            // 获取记录数据
            await this.$store.dispatch('getListForSelect', {
              moduleName: this.moduleName,
              stateName: 'complaintRecords',
              customApiName: 'getRecordsOfComplaint'
            })
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
        <Form.Item label="投诉企业">
          {
            this.form.getFieldDecorator('companyId', {
              rules: [
                {
                  required: true,
                  message: '请选择投诉企业!',
                  trigger: 'blur'
                }
              ]
            })(
              <Select
                placeholder="请选择投诉企业（输入企业名称可搜索）"
                notFoundContent={this.companyList.loading ? <Spin /> : undefined}
                onSearch={debounce(this.onSearchCompany, 300)}
                filterOption={false}
                showSearch
                allowClear
                options={
                  this.companyList.list.map(item => ({
                    value: item.id,
                    label: item.companyName
                  }))}
              />
            )
          }
        </Form.Item>
        <Form.Item label={'投诉类型'}>
          {
            this.form.getFieldDecorator('complaintType', {
              rules: [
                {
                  required: true,
                  type: 'number',
                  message: '请选择投诉类型!',
                  trigger: 'change'
                }
              ]
            })(
              <Radio.Group>
                <Radio value={1}>园区管理</Radio>
                <Radio value={2}>服务态度</Radio>
                <Radio value={3}>服务质量</Radio>
                <Radio value={4}>服务效率</Radio>
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label={'投诉内容'}>
          {
            this.form.getFieldDecorator('content', {
              rules: [
                {
                  required: true,
                  message: '请输入投诉内容！',
                  trigger: 'blur'
                }
              ]
            })(
              <Input.TextArea
                placeholder={'请输入投诉内容'}
                autoSize={{ minRows: 6 }}
              />
            )
          }
        </Form.Item>
        <Form.Item label={'投诉人姓名'} class={'half'}>
          {
            this.form.getFieldDecorator('complainantName', {
              rules: [
                {
                  required: true,
                  message: '请输入投诉人姓名！',
                  trigger: 'blur'
                }
              ]
            })(
              <Input placeholder="请输入投诉人姓名" allowClear />
            )
          }
        </Form.Item>
        <Form.Item label={'投诉人电话'} class={'half'}>
          {
            this.form.getFieldDecorator('complainantPhone', {
              rules: [
                {
                  required: true,
                  message: '请输入投诉人电话！',
                  trigger: 'blur'
                }
              ]
            })(
              <Input placeholder="请输入投诉人电话" allowClear />
            )
          }
        </Form.Item>
        <Form.Item label={'图片说明'}>
          {
            this.form.getFieldDecorator('imgs', { initialValue: [] })(
              <BNUploadPictures limit={5} />
            )
          }
        </Form.Item>
        <Form.Item label="受理人">
          {
            this.form.getFieldDecorator('assigneeId')(
              <Select
                placeholder="请选择受理人（输入受理人姓名或身份证号可搜索）"
                notFoundContent={this.personnelForSelect.loading ? <Spin /> : undefined}
                onSearch={debounce(this.onSearchPersonnel, 300)}
                filterOption={false}
                showSearch
                allowClear
                options={
                  this.personnelForSelect.list.map(item => ({
                    value: item.id,
                    label: (
                      <div>
                        <span>{item.fullName}</span>
                        <span style={{ color: '#b3b3b3', marginLeft: '10px' }}>{item.organName}</span>
                      </div>
                    )
                  }))}
              />
            )
          }
        </Form.Item>
        <Form.Item label={' '} colon={false}>
          <Button
            icon={this.loading ? 'loading' : 'check'}
            type={'primary'}
            htmlType={'submit'}
            disabled={this.loading}
          >
            投诉登记
          </Button>
        </Form.Item>
      </Form>
    )
  }
})
