import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'
import BaseForm from './components/BaseForm'
import { Spin } from 'ant-design-vue'
export default {
  name: 'ReportApplyForm',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {
      currentItem: {
        name: ''
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    },
    list() {
      return this.$store.state[this.moduleName].list
    }
  },
  mounted() {
    const { id, name } = this.$route.query
    this.$store.commit('setDetails', { value: { id, name }, moduleName: this.moduleName })
    dispatch(this.moduleName, 'getItemList', id)
  },
  methods: {
    async onSubmit(value) {
      console.log(value)
      const res = await dispatch(this.moduleName, 'addReport', value)
      if (res.status) {
        this.$router.go(-1)
      }
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        modalTitle={`我的报表 > ${this.$route.query.name}`}
        contentClass="bn-report-form-content">
        <Spin spinning={this.loading}>
          <BaseForm list={this.list} onsubmit={this.onSubmit}></BaseForm>
        </Spin>
      </BNContainer>
    )
  }
}
