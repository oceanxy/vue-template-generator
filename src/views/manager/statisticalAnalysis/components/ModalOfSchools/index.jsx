import './index.scss'
import { Button, Form } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import Inquiry from './Inquiry'
import Table from './Table'
import TGPagination from '@/components/TGPagination'
import forModuleName from '@/mixins/forModuleName'

export default Form.create({})({
  name: 'Schools',
  mixins: [forModuleName(true), forModal()],
  data() {
    return {
      modalProps: {
        width: 1010,
        destroyOnClose: true,
        footer: [
          <Button onClick={() => this.onCancel(this.visibleField)}>关闭</Button>
        ]
      },
      visibleField: 'visibleOfSchools'
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'tg-submodule-container'}>
        <Inquiry />
        <Table />
        <TGPagination />
      </DragModal>
    )
  }
})
