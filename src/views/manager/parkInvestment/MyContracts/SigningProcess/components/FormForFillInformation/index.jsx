import './index.scss'
import { Button, Checkbox, Col, Form, InputNumber, Row, Select } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import apis from '@/apis'
import forModuleName from '@/mixins/forModuleName'
import ModalOfChooseVenue from './ModalOfChooseVenue'
import Table from './Table'

export default Form.create({})({
  name: 'SigningProcess-FillInformation',
  inject: ['moduleName'],
  mixins: [forModuleName(true)],
  data() {
    return {
      enterprisePaymentCycle: [],
      feesPayableByCompany: [],
      hasHatcheriesSelected: false,
      fees: [
        {
          id: '24234',
          itemName: '服务费',
          amount: 1000,
          realAmount: 1000,
          saleId: undefined
        },
        {
          id: '2425534',
          itemName: '保证金',
          amount: 1000,
          realAmount: 1000,
          saleId: 1
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getState: 'getState'
    }),
    details() {
      return this.getState('details', this.moduleName)
    },
    hatcheryIds() {
      return this.details.placeList?.map(item => item.id) ?? []
    }
  },
  async created() {
    await this.getHatcheries()
    await this.getEnterprisePaymentCycle()

    this.$watch(
      () => this.form.getFieldValue('roomIds'),
      value => {
        this.hasHatcheriesSelected = !!value.length
      }
    )

    this.$watch(
      () => this.form.getFieldsValue(['roomIds', 'costCycle']),
      async value => {
        if (value.roomIds.length && value.costCycle) {
          await this.getFeesPayableByCompany()
        }
      }
    )
  },
  methods: {
    async getHatcheries() {
      if (this.hatcheryIds.length) {
        await this.$store.dispatch('getList', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          additionalQueryParameters: {
            ids: this.hatcheryIds.join()
          }
        })
      }
    },
    async getFeesPayableByCompany() {
      const response = await apis.getFeesPayableByCompany({
        id: this.$route.query.id,
        costCycle: this.form.getFieldValue('costCycle'),
        roomIds: this.form.getFieldValue('roomIds').join()
      })

      if (response.status) {
        this.feesPayableByCompany = response.data
      }
    },
    async getEnterprisePaymentCycle() {
      const response = await apis.getEnterprisePaymentCycle({ id: this.$route.query.id })

      if (response.status) {
        this.enterprisePaymentCycle = response.data
      }
    },
    transformValue(values) {
      const temp = { ...values }

      temp.id = this.$route.query.id

      if ('roomIds' in temp) {
        temp.roomIds = temp.roomIds.join('')
      }

      if ('companyTypeList' in temp) {
        temp.companyTypeList = temp.companyTypeList.map(id => ({
          id,
          fullName: (this.enterpriseClassifications?.find(item => item.id === id)).fullName
        }))
      }

      return temp
    },
    onSubmit(e) {
      e?.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const payload = this.transformValue(values)

          await apis.step2OfSubmitContract(payload)
        }
      })
    }
  },
  render() {
    return (
      <div class={'bnm-fill-info-container'}>
        <Form
          class="bnm-fill-info-form bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
          onSubmit={this.onSubmit}
        >
          <Form.Item label="孵化场所">
            <Button
              type={'primary'}
              ghost
              style={{ display: this.hatcheryIds.length || this.hasHatcheriesSelected ? 'none' : '' }}
              onClick={() => this._setVisibleOfModal({}, 'visibleOfChooseVenue')}
            >
              选择孵化场所
            </Button>
            <div
              class={'fill-info-hatchery-container'}
              style={{ display: this.hatcheryIds.length || this.hasHatcheriesSelected ? '' : 'none' }}
            >
              {
                this.form.getFieldDecorator('roomIds', {
                  initialValue: this.hatcheryIds
                })(
                  <Table class={'fill-info-hatchery-table'} />
                )
              }
              <div>
                <Button
                  type={'primary'}
                  ghost
                  onClick={() => this._setVisibleOfModal({}, 'visibleOfChooseVenue')}
                >
                  重新选择孵化场所
                </Button>
              </div>
            </div>
          </Form.Item>
          <Form.Item label="缴费周期">
            {
              this.form.getFieldDecorator('costCycle', {
                initialValue: this.details.costCycle || undefined
              })(
                <Select placeholder={'输入选择缴费周期'}>
                  {
                    this.enterprisePaymentCycle.map(item => (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="应缴费项">
            {
              this.form.getFieldDecorator('itemList', {
                // initialValue: this.details.itemList
              })(
                <Checkbox.Group class={'fill-info-amount-due-container'}>
                  {
                    this.fees.map(item => (
                      <Row>
                        <Col class={'fee-item-container'}>
                          <Checkbox value={item.id}>{item.itemName}</Checkbox>
                          <div class={'fee-item'}>
                            <span class={'label'}>应缴金额</span>
                            <span class={'value'}>￥{item.amount}</span>
                          </div>
                          <div class={'fee-item'}>
                            <span class={'label preferential'}>优惠</span>
                            <Select
                              vModel={item.saleId}
                              class={'value select'}
                              placeholder={'请选择优惠券'}
                              title={'请选择优惠券'}
                            >
                              <Select.Option value={1}>12222</Select.Option>
                            </Select>
                          </div>
                          <div class={'fee-item'}>
                            <span class={'label'}>实缴金额</span>
                            <InputNumber
                              vModel={item.realAmount}
                              class={'value total'}
                              placeholder={'请输入实缴金额'}
                              precision={2}
                            />
                          </div>
                        </Col>
                      </Row>
                    ))
                  }
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label={' '}>
            <Button type="primary" html-type="submit">下一步</Button>
          </Form.Item>
        </Form>
        <ModalOfChooseVenue modalTitle={'选择孵化场所'} />
      </div>
    )
  }
})
