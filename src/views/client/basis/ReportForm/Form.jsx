import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'
import BaseForm from './components/BaseForm'
import { Spin, Button } from 'ant-design-vue'
import { mapState, mapAction } from '@/utils/store'

export default {
  name: 'ReportApplyForm',
  mixins: [dynamicState()],
  data() {
    return {currentItem: {name: ''}}
  },
  computed: {...mapState(['loading', 'list'])},
  mounted() {
    const { id, name } = this.$route.query

    this.$store.commit('setDetails', {
      value: {
        id, name
      }, moduleName: this.moduleName
    })
    dispatch(this.moduleName, 'getItemList', id)
  },
  methods: {
    async onSubmit(value) {
      const res = await this.addReport(value)

      if (res.status) {
        this.$router.go(-1)
      }
    },
    ...mapAction(['addReport'])
  },
  render() {
    return (
      <BNContainer
        width="100%"
        modalTitle={`我的报表 > ${this.$route.query.name}`}
        contentClass="bn-report-form-content"
      >
        <Spin spinning={this.loading}>
          <BaseForm list={this.list} onsubmit={this.onSubmit}>
            <Button
              loading={this.loading}
              htmlType="submit"
              type="primary"
            >
              确认提交
            </Button>
          </BaseForm>
        </Spin>
      </BNContainer>
    )
  }
}
