import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Spin } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import forModuleName from '@/mixins/forModuleName'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'
import DynamicComponent from './DynamicComponent'

export default Form.create({})({
  name: 'MyReports-FillOutReport',
  mixins: [
    dynamicState(store, dynamicModules),
    forModuleName(true),
    forTable(false)
  ],
  data() {
    return {
      submitLoading: false,
      stateName: 'data' // 需在store内初始化该字段
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
          const response = await this.$store.dispatch('custom', {
            customApiName: 'addReportRecord',
            closeModalAfterFetched: false,
            payload
          })

          if (response.status) {
            await this.$router.replace({ name: 'myReports' })
          }
        }

        this.submitLoading = false
      })
    }
  },
  render() {
    return (
      <Spin spinning={this.loading} class={'bnm-fill-out-report-container'}>
        <BNContainer
          width={'100%'}
          modalTitle={'立即填报'}
          showBoxShadow={false}
        >
          <Form
            formLoading
            class={'bnm-form-grid'}
            onSubmit={this.onSubmit}
          >
            {
              this.data.itemList?.map(item => (
                <Form.Item label={item.serialNum + ' ' + item.fullName}>
                  {
                    this.form.getFieldDecorator(item.id, {
                      initialValue: undefined,
                      rules: [{ required: !!item.isRequired, message: '请填写' + item.fullName + '！' }]
                    })(
                      <DynamicComponent dataSource={item} />
                    )
                  }
                </Form.Item>
              ))
            }
            {
              this.data.itemList?.length && this.$route.query.fillObj
                ? (
                  <Form.Item label={' '} colon={false}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={this.submitLoading ? 'loading' : ''}
                      disabled={!this.data.itemList.length || !this.$route.query.fillObj || this.submitLoading}
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
