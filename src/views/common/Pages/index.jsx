import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import ULPageForm from './components/ULPageForm'
import ULPageTable from './components/ULPageTable'
import ULPagePagination from './components/ULPagePagination'
import ULPageModalForEdit from './components/ULPageModalForEdit'
import ULPageButtons from './components/ULPageButtons'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/client'
import ULPageModalForConflictPage from '@/views/Pages/components/ULPageModalForConflictPage'

export default {
  name: 'Pages',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bn-pages">
        <ULPageForm slot="form" />
        <ULPageButtons slot="buttons" />
        <ULPageTable slot="table" />
        <ULPagePagination slot="pagination" />

        <div slot="modals">
          <ULPageModalForEdit />
          <ULPageModalForConflictPage />
        </div>
      </TGContainer>
    )
  }
}
