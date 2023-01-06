import forTableModal from '@/mixins/forModal/forTableModal'
import forModuleName from '@/mixins/forModuleName'
import DragModal from '@/components/DragModal'
import Table from './Table'
import { Button } from 'ant-design-vue'

export default {
  name: 'ReviewThePlan',
  mixins: [forTableModal(), forModuleName(true)],
  data() {
    return {
      modalProps: {
        width: 810,
        destroyOnClose: true,
        footer: [
          <Button icon={'close'} onClick={() => this.onCancel(this.visibilityFieldName)}>
            关闭
          </Button>,
          <Button type={'primary'} icon={'export'}>
            导出
          </Button>
        ]
      },
      visibilityFieldName: 'visibilityOfDetails'
    }
  },
  computed: {
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(this.visibilityFieldName),
          ok: () => this.onSubmit()
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <p>一年级二班</p>
        <p>计划名称</p>
        <Table />
      </DragModal>
    )
  }
}
