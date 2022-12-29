import { Button, Form, Icon } from 'ant-design-vue'
import DragModal from '@/components/DragModal'
import forModal from '@/mixins/forModal'
import TableOfStudentInfo from './TableOfStudentInfo'
import forModuleName from '@/mixins/forModuleName'

export default Form.create({})({
  name: 'StudentInfo',
  mixins: [forModal(), forModuleName(true)],
  data() {
    return {
      modalProps: {
        width: 910,
        destroyOnClose: true,
        footer: [
          <Button type={'primary'} onClick={() => this.onCancel(this.visibilityFieldName)}>
            <Icon type={'close'} />
            关闭
          </Button>
        ]
      },
      visibilityFieldName: 'visibilityOfStudentInfo'
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <TableOfStudentInfo />
      </DragModal>
    )
  }
})
