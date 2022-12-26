import { Button } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import Inquiry from './Inquiry'
import Table from './Table'
import TGPagination from '@/components/TGPagination'
import forModuleName from '@/mixins/forModuleName'

export default {
  name: 'Schools',
  mixins: [forModuleName(true), forModal()],
  data() {
    return {
      modalProps: {
        width: 910,
        destroyOnClose: true,
        footer: [
          <Button onClick={() => this.onCancel(this.visibleField)}>关闭</Button>
        ]
      },
      visibleField: 'visibilityOfSchools'
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'tg-submodule-container'}>
        <Inquiry />
        <Table />
        <TGPagination
          customApiName={'getSchoolsForStatisticalAnalysis'}
          injectParentSearch={true}
        />
      </DragModal>
    )
  }
}
