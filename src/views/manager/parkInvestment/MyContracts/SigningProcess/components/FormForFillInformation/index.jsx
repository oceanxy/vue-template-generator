import './index.scss'
import { Button, Checkbox, Col, Form, Row, Select } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'
import ModalOfChooseVenue from './ModalOfChooseVenue'
import forIndex from '@/mixins/forIndex'
import Table from './Table'

export default Form.create({})({
  mixins: [forInquiry(), forIndex],
  data() {
    return ({
      value: []
    })
  },
  computed: {
    ...mapGetters({
      getCurrentItem: 'getCurrentItem'
    }),
    currentItem() {
      return this.getCurrentItem(this.moduleName)
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
            {
              this.value.length
                ? (
                  <Button
                    type={'primary'}
                    ghost
                    onClick={() => this._setVisibleOfModal({}, 'visibleOfChooseVenue')}
                  >
                    选择孵化场所
                  </Button>
                )
                : (
                  <div class={'fill-info-hatchery-container'}>
                    <Table class={'fill-info-hatchery-table'} />
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
                )
            }
          </Form.Item>
          <Form.Item label="应缴费项">
            {
              this.form.getFieldDecorator('bb', {
                initialValue: this.currentItem.bb || []
              })(
                <Checkbox.Group class={'fill-info-amount-due-container'}>
                  <Row>
                    <Col class={'fee-item'}>
                      <Checkbox value={1}>场地租金</Checkbox>
                      <div>
                        <span>应缴金额</span>
                        <span>￥2688.00</span>
                      </div>
                      <div>
                        <span>优惠</span>
                        <Select placeholder={'请选择优惠券'}>
                          <Select.Option value={1}>1</Select.Option>
                        </Select>
                      </div>
                      <div>
                        <span>实缴金额</span>
                        <span class={'total'}>￥2688.00</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col class={'fee-item'}>
                      <Checkbox value={2}>服务管理费</Checkbox>
                      <div>
                        <span>应缴金额</span>
                        <span>￥2688.00</span>
                      </div>
                      <div>
                        <span>优惠</span>
                        <Select placeholder={'请选择优惠券'}>
                          <Select.Option value={1}>1</Select.Option>
                        </Select>
                      </div>
                      <div>
                        <span>实缴金额</span>
                        <span class={'total'}>￥2688.00</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col class={'fee-item'}>
                      <Checkbox value={3}>保证金</Checkbox>
                      <div>
                        <span>应缴金额</span>
                        <span>￥2688.00</span>
                      </div>
                    </Col>
                  </Row>
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label="缴费周期">
            {
              this.form.getFieldDecorator('nn', {
                initialValue: this.currentItem.nn
              })(
                <Select placeholder={'输入选择缴费周期'}>
                  <Select.Option value={0}>按季缴纳</Select.Option>
                </Select>
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
