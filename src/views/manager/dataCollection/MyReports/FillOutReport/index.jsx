import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Spin } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'
import DynamicComponent from './DynamicComponent'

export default Form.create({})({
  name: 'MyReports-FillOutReport',
  mixins: [
    dynamicState({ injectSubmoduleName: true }),
    forTable(false)
  ],
  data() {
    return {
      submitLoading: false,
      stateName: 'data'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    },
    data() {
      return this.getState(this.stateName, this.moduleName, this.submoduleName)
    }
  },
  methods: {
    validator(rule, value, callback, item) {
      // 查找该项是否存在必填的佐证材料
      const requireItems = item.itemProveList.filter(file => file.isMust === 1)
      const requireIds = requireItems.map(file => file.id)

      if (requireIds.length) {
        const uploadedIds = value?.attachmentList?.map(file => file.proveId) ?? []
        const messages = []

        uploadedIds.forEach((uploadedId, index) => {
          if (!requireIds.includes(uploadedId)) {
            messages.push(`请上传佐助材料：${requireItems[index].fullName}！`)
          }
        })

        if (messages.length) {
          callback(new Error(messages.join('， ')))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    onSubmit(e) {
      e?.preventDefault()

      this.form.validateFieldsAndScroll(async (err, values) => {
        this.submitLoading = true

        const payload = {
          fillObj: this.$route.query.fillObj,
          reportId: this.data.id,
          reportName: this.data.fullName,
          reportResultList: Object.values(values).filter(item => !!item)
        }

        if (!err) {
          const status = await this.$store.dispatch('custom', {
            customApiName: 'addReportRecord',
            closeModalAfterFetched: false,
            payload
          })

          if (status) {
            await this.$router.replace({ name: 'myReports' })
          }
        }

        this.submitLoading = false
      })
    }
  },
  render() {
    return (
      <Spin
        spinning={this.loading}
        class={'bnm-fill-out-report-container'}
      >
        <BNContainer
          width={'100%'}
          modalTitle={'立即填报'}
          showBoxShadow={false}
        >
          <p>填报时间：{this.data.startTimeStr} ~ {this.data.endTimeStr}</p>
          {
            this.data.description
              ? <p style={{ color: '#999999' }}>报表详情：{this.data.description}</p>
              : null
          }

          <Form
            class={'bnm-form-grid'}
            onSubmit={this.onSubmit}
          >
            {
              this.data.itemCatalogList?.map(classification => ([
                <div class={'bnm-fill-out-classified-info'}>
                  <span>{classification.fullName}</span>
                </div>,
                [
                  ...[
                    classification.itemList.map(item => (
                      <Form.Item label={item.serialNum + ' ' + item.fullName}>
                        {
                          this.form.getFieldDecorator(item.id, {
                            initialValue: undefined,
                            rules: [
                              {
                                required: !!item.isRequired,
                                message: '请填写' + item.fullName + '！'
                              },
                              { validator: (rule, value, callback) => this.validator(rule, value, callback, item) }
                            ]
                          })(
                            <DynamicComponent dataSource={item} />
                          )
                        }
                      </Form.Item>
                    ))
                  ]
                ]
              ]))
            }
            {
              this.data.itemCatalogList?.length && this.$route.query.fillObj
                ? (
                  <Form.Item
                    label={' '}
                    colon={false}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={this.submitLoading ? 'loading' : ''}
                      disabled={
                        !this.data.itemCatalogList.length ||
                        !this.$route.query.fillObj ||
                        this.submitLoading
                      }
                    >
                      确认提交
                    </Button>
                  </Form.Item>
                )
                : null
            }
          </Form>
        </BNContainer>
      </Spin>
    )
  }
})
