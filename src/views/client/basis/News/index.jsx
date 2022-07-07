import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import TGButtons from '@/views/client/basis/News/components/Buttons'
import TGTable from '@/views/client/basis/News/components/Table'
import Pagination from './components/Pagination'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'News',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
  render() {
    return (
      <BNContainer width="100%" modalTitle="我的消息" contentClass="bn-news-content">
        <TGButtons />
        <br />
        <TGTable />
        <br />
        <Pagination></Pagination>
      </BNContainer>
    )
  }
}
