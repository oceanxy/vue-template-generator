import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Input } from 'ant-design-vue'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'
import BaseForm from './components/BaseForm'
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
    list() {
      return this.$store.state[this.moduleName].list
    }
  },
  mounted() {
    const { id } = this.$route.query
    dispatch(this.moduleName, 'getItemList', id)
  },
  // computed: mapState({
  //   allSiteApps: 'allSiteApps',
  //   allPages: 'allPages',
  //   score() {
  //     return 0
  //   }
  // }),
  methods: {},
  render() {
    return (
      <BNContainer
        width="100%"
        modalTitle={`我的报表 > ${this.$route.query.name}`}
        contentClass="bn-report-form-content">
        <BaseForm list={this.list}></BaseForm>
      </BNContainer>
    )
  }
}
