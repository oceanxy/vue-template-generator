import './assets/css/index.scss'
import BNContainer from '@/components/BNContainer'
import Pagination from './components/Pagination'
import Table from './components/Table'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'Parknews',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
  render() {
    return (
      <BNContainer width="100%" modalTitle="园区新闻" class="bn-parknews-content">
        <Table />
        <br />
        <Pagination></Pagination>
      </BNContainer>
    )
  }
}
