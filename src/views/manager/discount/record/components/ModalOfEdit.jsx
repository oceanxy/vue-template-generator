import '../assets/styles/index.scss'
import { Card, Col, Form, Input, message, Row, Select, Spin } from 'ant-design-vue'
import { debounce } from 'lodash'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapState } from '@/utils/store'
import BNUploadFile from '@/components/BNUploadFile'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapclass: 'bnm-modal-edit-discount-record-form'
      },
      businessInfo: null
    }
  },
  computed: {
    ...mapState(['businessSelect', 'discountSelect', 'details']),
    attachmentList() {
      const list = this.details.attachmentList || []

      return list.map(item => {
        return {
          ...item,
          url: item.path,
          uid: 'attachmentList',
          key: item.key,
          status: 'done',
          name: item.fileName
        }
      })
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await Promise.all([this.getBusiness(), this.getDetails()])
        } else {
          this.businessInfo = null
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      return {
        contractId: this.businessInfo.contractId,
        ruleId: values.ruleId,
        id: this.currentItem.id ?? '',
        attachmentList: values.attachmentList.map(item => item?.response?.data[0] ?? item)
      }
    },
    async getDetails() {
      if (!this.currentItem.id) return

      const res = await this.$store.dispatch('getDetails', {
        payload: { id: this.currentItem.id },
        moduleName: this.moduleName
      })

      if (res?.status) {
        const data = res.data

        this.businessInfo = {
          companyName: data.companyName,
          contractId: data.contractId,
          list: res.data.list
        }
        this.getDiscount(data.ruleName)
      }
    },
    async getBusiness(keyword) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'businessSelect',
        customApiName: 'getSampleCompanyContractList',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          companyName: keyword
        }
      })
    },
    async getDiscount(keyword) {
      if (!this.businessInfo) {
        message.warn('请选择企业')

        return
      }

      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'discountSelect',
        customApiName: 'saleRecord_getSaleRulePageList',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          ruleName: keyword,
          contractId: this.businessInfo.contractId
        }
      })
    },
    async onChangeBusiness(id) {
      const findData = this.businessSelect.list.find(item => item.id === id)

      this.businessInfo = Object.assign({}, findData || {})
      this.form.setFieldsValue({ ruleId: undefined, amount: undefined })
      await this.getDiscount()
    },
    onChangeDiscount(id) {
      const findData = this.discountSelect.list.find(item => item.id === id)
      const data = Object.assign({}, findData || {})

      this.form.setFieldsValue({ amount: data.amount })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class=""
          colon={false}
        >
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="企业名称">
                {
                  this.form.getFieldDecorator('companyName', {
                    initialValue: this.details.companyName ?? undefined,
                    rules: [
                      {
                        required: true,
                        message: '请选择企业!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Select
                      placeholder={'输入企业名称搜索'}
                      showSearch
                      filterOption={false}
                      onSearch={debounce(this.getBusiness, 300)}
                      notFoundContent={this.businessSelect.loading ? <Spin /> : undefined}
                      onChange={this.onChangeBusiness}
                    >
                      {
                        this.businessSelect.list.map(item => (
                          <Select.Option
                            value={item.id}
                            title={item.companyName}
                          >
                            {item.companyName}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  )
                }
                {
                  this.businessInfo ? (
                    <Card>
                      {
                        this.businessInfo.list.map(item => {
                          return (
                            <div>
                              {item.name}：{item.value}
                            </div>
                          )
                        })
                      }
                    </Card>
                  ) : null
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="优惠政策">
                {
                  this.form.getFieldDecorator('ruleId', {
                    initialValue: this.details.ruleId ?? undefined,
                    rules: [
                      {
                        required: true, message: '请选择优惠政策!', trigger: 'change'
                      }
                    ]
                  })(
                    <Select
                      placeholder={'输入优惠政策搜索'}
                      showSearch
                      filterOption={false}
                      onSearch={debounce(this.getDiscount, 300)}
                      notFoundContent={this.discountSelect.loading ? <Spin /> : undefined}
                      onchange={this.onChangeDiscount}
                    >
                      {
                        this.discountSelect.list.map(item => (
                          <Select.Option
                            value={item.id}
                            title={item.ruleName}
                          >
                            {item.ruleName}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="优惠金额">
                {
                  this.form.getFieldDecorator('amount', { initialValue: this.details.saleAmount ?? undefined })(
                    <Input
                      placeholder="请输入"
                      disabled={true}
                      style={{ width: '100%' }}
                    />
                  )
                }
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="附件">
                <span>请上传相关申请文件</span>
                {
                  this.form.getFieldDecorator('attachmentList', { initialValue: this.attachmentList })(
                    <BNUploadFile limit={3} />
                  )
                }
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
