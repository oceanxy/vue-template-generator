import '../assets/styles/index.scss'

import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapAction, mapState } from '@/utils/store'

export default {
  mixins: [forModal()],
  data() {
    return {
      visibleField: 'visibleOfFile',
      modalProps: {
        width: 700,
        wrapclass: 'bnm-modal-file-discount-record',
        footer: null
      }
    }
  },
  computed: { ...mapState(['attachmentList']) },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.getAttachmentList({ id: this.currentItem.id })
        } else {
          // this.businessInfo = null
        }
      }
    }
  },
  methods: { ...mapAction(['getAttachmentList']) },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel('visibleOfEnterprise') }
    }

    return (
      <DragModal {...attributes}>
        <table class="file-table">
          <tr>
            <td width="100px">在线填报内容</td>
            <td></td>
          </tr>
          <tr>
            <td width="100px">置换申请</td>
            <td></td>
          </tr>
        </table>
      </DragModal>
    )
  }
}
