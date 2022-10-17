import './index.scss'
import forModal from '@/mixins/forModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import { Button } from 'ant-design-vue'
import Table from './components/Table'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        footer: <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>
      },
      visibleField: 'visibleOfPreview'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value && this.currentItem.id) {
          await this.$store.dispatch('getDetails', {
            moduleName: this.moduleName,
            payload: { id: this.currentItem.id }
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel(this.visibleField) }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table />
      </DragModal>
    )
  }
}
