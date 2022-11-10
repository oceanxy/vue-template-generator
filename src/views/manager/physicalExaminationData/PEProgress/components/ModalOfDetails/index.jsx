import '../assets/styles/index.scss'
import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import Table from './Table'

export default {
  mixins: [forTableModal()],
  data() {
    return {
      modalProps: { destroyOnClose: true },
      visibleField: 'visibleOfDetails'
    }
  },
  computed: {
    attributes() {
      return {
        attrs: {
          ...this.modalProps,
          title: this.modalTitle.replace(
            '{action}',
            this.currentItem?.peItem?.itemName
          )
        },
        on: { cancel: () => this.onCancel(this.visibleField) }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        name: {this.currentItem}
        <Table />
      </DragModal>
    )
  }
}
