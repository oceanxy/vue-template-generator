import './assets/styles/index.scss'
import TGContainers from '@/layouts/components/TGContainers'
import ULPageForm from './components/ULPageForm'
import ULPageTable from './components/ULPageTable'
import ULPagePagination from './components/ULPagePagination'
import ULPageModalForEdit from './components/ULPageModalForEdit'
import ULPageButtons from './components/ULPageButtons'
import dynamicState from '@/mixins/dynamicState'
import ULPageModalForConflictPage from '@/views/Pages/components/ULPageModalForConflictPage'

export default {
  name: 'Pages',
  mixins: [dynamicState],
  render() {
    return (
      <TGContainers class="bn-pages">
        <ULPageForm slot="form" />
        <ULPageButtons slot="buttons" />
        <ULPageTable slot="table" />
        <ULPagePagination slot="pagination" />

        <div slot="modals">
          <ULPageModalForEdit />
          <ULPageModalForConflictPage />
        </div>
      </TGContainers>
    )
  }
}
