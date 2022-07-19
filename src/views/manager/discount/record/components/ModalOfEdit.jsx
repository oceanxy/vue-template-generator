import '../assets/styles/index.scss'
import { Col, Form, Select, Row, Spin, Card, Input, message } from 'ant-design-vue'
import { debounce } from 'lodash'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapState, mapAction, mapMutation } from '@/utils/store'
import BNUploadFile from '@/components/BNUploadFile'
export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-eidt-discount-record-form'
      },
      bussienssInfo: null
    }
  },
  computed: {
    ...mapState(['bussienssSelect', 'discountSelect'])
  },
  async created() {},
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getBussienss()
        } else {
          this.bussienssInfo = null
        }
      }
    }
  },
  methods: {
    ...mapMutation(['set_visibleOfRooms']),
    customDataHandler(values) {
      return {
        contractId: this.bussienssInfo.contractId,
        ruleId: values.ruleId,
        attachmentList: values.attachmentList.map(item => {
          return item.response.data[0]
        })
      }
    },
    getBussienss(keyword) {
      this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'bussienssSelect',
        customApiName: 'getSampleCompanyContractList',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          companyName: keyword
        }
      })
    },
    getDiscount(keyword) {
      if (!this.bussienssInfo) {
        message.warn('请选择企业')
        return
      }
      this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'discountSelect',
        customApiName: 'saleRecord_getSaleRulePageList',
        payload: {
          pageIndex: 0,
          pageSize: 20,
          ruleName: keyword,
          contractId: this.bussienssInfo.contractId
        }
      })
    },
    onChangeBussienss(id) {
      const findData = this.bussienssSelect.list.find(item => item.id === id)
      this.bussienssInfo = Object.assign({}, findData || {})
      if (this.discountSelect.list.length === 0) {
        this.getDiscount()
      }
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
        <Form class="" colon={false}>
          <Row gutter={10}>
            <Col span={24}>
              <Form.Item label="企业名称">
                {this.form.getFieldDecorator('ruleName', {
                  rules: [{ required: true, message: '请选择企业名称!', trigger: 'change' }]
                })(
                  <Select
                    placeholder={'输入企业名称搜索'}
                    showSearch
                    filterOption={false}
                    onSearch={debounce(this.getBussienss, 300)}
                    notFoundContent={this.bussienssSelect.loading ? <Spin /> : undefined}
                    onChange={this.onChangeBussienss}>
                    {this.bussienssSelect.list.map(item => (
                      <Select.Option value={item.id} title={item.companyName}>
                        {item.companyName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
                {this.bussienssInfo ? (
                  <Card>
                    {this.bussienssInfo.list.map(item => {
                      return (
                        <div>
                          {item.name}：{item.value}
                        </div>
                      )
                    })}
                  </Card>
                ) : null}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="优惠政策">
                {this.form.getFieldDecorator('ruleId', {
                  initialValue: undefined,
                  rules: [{ required: true, message: '请选择优惠政策!', trigger: 'change' }]
                })(
                  <Select
                    placeholder={'输入优惠政策搜索'}
                    showSearch
                    filterOption={false}
                    onSearch={debounce(this.getDiscount, 300)}
                    notFoundContent={this.discountSelect.loading ? <Spin /> : undefined}
                    onchange={this.onChangeDiscount}>
                    {this.discountSelect.list.map(item => (
                      <Select.Option value={item.id} title={item.ruleName}>
                        {item.ruleName}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="租金优惠">
                {this.form.getFieldDecorator('amount', {
                  initialValue: ''
                })(<Input placeholder="请输入" disabled={true} style={{ width: '100%' }}></Input>)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="附件">
                <span>请上传相关申请文件</span>
                {this.form.getFieldDecorator('attachmentList', {
                  initialValue: []
                })(<BNUploadFile limit={3}></BNUploadFile>)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </DragModal>
    )
  }
})
