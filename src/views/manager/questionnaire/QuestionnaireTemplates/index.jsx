import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
// import TGContainer from '@/layouts/components/TGContainer'
// import Inquiry from './components/Inquiry'
// import Table from './components/Table'
// import TGPagination from '@/components/TGPagination'
// import ModalOfEdit from './components/ModalOfEdit'
// import ModalOfPreview from './components/ModalOfPreview'

export default {
  name: 'QuestionnaireTemplates',
  mixins: [dynamicState()],
  render() {
    return (
      // <TGContainer class="bnm-questionnaire-templates-container">
      //   <Inquiry slot={'inquiry'} />
      //   <Table slot={'table'} />
      //   <TGPagination slot={'pagination'} />
      //   <template slot={'modals'}>
      //     <ModalOfEdit modalTitle={'{action}问卷模版'} />
      //     <ModalOfPreview modalTitle={'问卷题目'} />
      //   </template>
      // </TGContainer>
      <div>该页面已合并到 数据采集 -> 模版管理</div>
    )
  }
}
