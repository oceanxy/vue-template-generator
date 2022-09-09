import './index.scss'
import { Button, Checkbox, Col, Form, InputNumber, Row, Select, Space, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import apis from '@/apis'
import forModuleName from '@/mixins/forModuleName'
import ModalOfChooseVenue from './ModalOfChooseVenue'
import Table from './Table'
import { cloneDeep, omit } from 'lodash'

export default Form.create({})({
  name: 'SigningProcess-FillInformation',
  mixins: [forModuleName(true)],
  data() {
    return {
      loading: false,
      feePayableIds: [],
      hasHatcheriesSelected: false
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    feesPayableByCompany() {
      return this.getState('feesPayableByCompany', this.moduleName, this.submoduleName)
    },
    enterprisePaymentCycle() {
      return this.getState('enterprisePaymentCycle', this.moduleName, this.submoduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    },
    hatcheryIds() {
      const roomIdFormRouteQuery = this.$route.query.rid ? [this.$route.query.rid] : []
      const roomIdFromDetails = this.details.placeList?.map(item => item.id) ?? []

      return [].concat(roomIdFormRouteQuery, roomIdFromDetails)
    }
  },
  async created() {
    await this.getHatcheries()
    await this.getEnterprisePaymentCycle()

    // 为应缴费项获取并设置初始值
    this.feePayableIds = []

    this.$watch(
      () => this.form.getFieldValue('roomIds'),
      value => {
        this.hasHatcheriesSelected = !!value.length
      }
    )

    this.$watch(
      () => this.form.getFieldsValue(['roomIds', 'costCycle']),
      async (value, oldValue) => {
        // 比较值的变化 不用直接比较 value 和 oldValue，getFieldsValue方法每次获取的值的内存地址都不一样
        if (
          value.roomIds.length &&
          value.costCycle &&
          (
            value.roomIds.sort().toString() !== oldValue?.roomIds.sort().toString() ||
            value.costCycle !== oldValue?.costCycle
          )
        ) {
          // 如果存在值，则回填
          if (this.details.itemIdList.length) {
            this.form.setFieldsValue({ 'feePayableIds': this.details.itemIdList })
          } else {
            // 如果孵化场所和缴费周期的值发生变化，则重置应缴费项的值
            this.form.setFieldsValue({ 'feePayableIds': [] })
          }

          // 远程获取应缴费项的数据
          await this.getFeesPayableByCompany()
        }
      },
      { immediate: true }
    )
  },
  methods: {
    goBack() {
      this.$store.commit('setDetails', {
        moduleName: this.moduleName,
        merge: true,
        value: { signingStage: 1 }
      })
    },
    async getHatcheries() {
      if (this.hatcheryIds.length) {
        await this.$store.dispatch('getList', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          additionalQueryParameters: { ids: this.hatcheryIds.join() }
        })
      }
    },
    async getFeesPayableByCompany() {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        stateName: 'feesPayableByCompany',
        customApiName: 'getFeesPayableByCompany',
        payload: {
          id: this.details.id,
          costCycle: this.form.getFieldValue('costCycle'),
          roomIds: this.form.getFieldValue('roomIds').join()
        }
      })
    },
    async getEnterprisePaymentCycle() {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        stateName: 'enterprisePaymentCycle',
        customApiName: 'getEnterprisePaymentCycle',
        payload: { id: this.details.id }
      })
    },
    transformValue(values) {
      let temp = cloneDeep(values)

      temp.id = this.details.id

      if ('roomIds' in temp) {
        temp.roomIds = temp.roomIds.join()
      }

      if ('feePayableIds' in temp) {
        temp.itemList = this.feesPayableByCompany.list.filter(feeItem => temp.feePayableIds.includes(feeItem.id))

        temp = omit(temp, 'feePayableIds')
      }

      return temp
    },
    onCouponChange(saleIds, item) {
      if (!saleIds) {
        item.realAmount = item.amount
      } else {
        const realAmount = item.amount - item.saleList
          ?.filter(saleItem => saleIds.includes(saleItem.id))
          .reduce((discountedPrice, cur) => {
            discountedPrice = discountedPrice + cur.amount

            return discountedPrice
          }, 0)

        item.realAmount = realAmount >= 0 ? realAmount : 0
      }
    },
    onSubmit(e) {
      e?.preventDefault()
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          this.loading = true

          const payload = this.transformValue(values)
          const response = await apis.step2OfSubmitContract(payload)

          this.loading = false

          if (response.status) {
            await this.$store.dispatch('getDetails', {
              moduleName: this.moduleName,
              payload: { id: this.details.id }
            })
          }
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
                  initialValue: this.hatcheryIds,
                  rules: [
                    {
                      required: true, type: 'array', message: '请至少选择一个孵化场所！', trigger: 'change'
                    }
                  ]
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
                initialValue: this.details.costCycle ? String(this.details.costCycle) : undefined,
                rules: [
                  {
                    required: true,
                    message: '请选择缴费周期！',
                    trigger: 'change'
                  }
                ]
              })(
                <Select
                  placeholder={'输入选择缴费周期'}
                  notFoundContent={this.enterprisePaymentCycle.loading ? <Spin /> : undefined}
                >
                  {
                    this.enterprisePaymentCycle.list.map(item => (
                      <Select.Option value={item.id}>{item.name}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="应缴费项">
            {
              this.form.getFieldDecorator('feePayableIds', {
                initialValue: this.feePayableIds || [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请勾选缴费项目！',
                    trigger: 'change'
                  }
                ]
              })(
                <Checkbox.Group class={'fill-info-amount-due-container'}>
                  {
                    this.feesPayableByCompany.list.length
                      ? (
                        <Spin spinning={this.feesPayableByCompany.loading}>
                          {
                            this.feesPayableByCompany.list.map(item => (
                              <Row>
                                <Col class={'fee-item-container'}>
                                  <Checkbox value={item.id}>{item.itemName}</Checkbox>
                                  <div class={'fee-item'}>
                                    <span class={'label'}>应缴金额</span>
                                    <span class={'value'}>￥{item.amount}</span>
                                  </div>
                                  <div class={'fee-item coupon'}>
                                    <span class={'label preferential'}>优惠</span>
                                    <Select
                                      vModel={item.saleIds}
                                      class={'value select'}
                                      placeholder={'请选择优惠券'}
                                      allowClear
                                      mode={'multiple'}
                                      title={'请选择优惠券'}
                                      onChange={saleIds => this.onCouponChange(saleIds, item)}
                                    >
                                      {
                                        item.saleList?.map(saleItem => (
                                          <Select.Option value={saleItem.id}>
                                            {saleItem.saleName}
                                          </Select.Option>
                                        ))
                                      }
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
                        </Spin>
                      )
                      : '选择孵化场所和缴费周期后显示'
                  }
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label={' '}>
            <Space class={'bnm-contract-step-btns'}>
              <Button onClick={this.goBack}>上一步</Button>
              <Button
                type="primary"
                html-type="submit"
                disabled={this.loading}
              >
                下一步
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <ModalOfChooseVenue modalTitle={'选择孵化场所'} />
      </div>
    )
  }
})
