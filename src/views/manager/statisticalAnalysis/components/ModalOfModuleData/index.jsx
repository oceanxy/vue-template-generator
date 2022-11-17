import './index.scss'
import { Button, Form } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true,
        footer: [
          <Button onClick={() => this.onCancel(this.visibleField)}>关闭</Button>
        ]
      },
      visibleField: 'visibleOfModuleData'
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        》222
      </DragModal>
    )
  }
})
