import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import TGButtons from '@/views/client/basis/News/components/Buttons'
import TGTable from '@/views/client/basis/News/components/Table'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'News',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainer
        width="100%"
        modalTitle="我的消息"
        contentClass="bn-news-content"
      >
        <TGButtons />
        <TGTable />
        <TGPagination />
      </BNContainer>
    )
  }
}
