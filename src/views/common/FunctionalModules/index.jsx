import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/client'
import TGContainer from '@/layouts/components/TGContainer'
import ULModuleForm from './components/ULModuleForm'
import ULModuleButtons from './components/ULModuleButtons'
import ULModuleTable from './components/ULModuleTable'
import ULModulePagination from './components/ULModulePagination'
import ULModuleModalForEdit from './components/ULModuleModalForEdit'
import './assets/styles/index.scss'

export default {
  name: 'FunctionalModules',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bn-functional-modules">
        <ULModuleForm slot="form" />
        <ULModuleButtons slot="buttons" />
        <ULModuleTable slot="table" />
        <ULModulePagination slot="pagination" />

        <ULModuleModalForEdit slot="modals" />
      </TGContainer>
    )
  }
}
