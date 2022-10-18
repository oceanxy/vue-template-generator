import './assets/styles/modalOfFile.scss'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapAction, mapMutation, mapState } from '@/utils/store'

// import { Button } from 'ant-design-vue'
export default {
  mixins: [forModal()],
  data() {
    return {
      visibleField: 'visibleOfFile',
      modalProps: {
        width: 600,
        wrapclass: 'bnm-modal-discount-business-file',
        footer: null
      }
    }
  },
  computed: { ...mapState(['businessFile']) },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getAttachmentList({ id: this.currentItem.id })
        } else {
          this.set_businessFile([])
        }
      }
    }
  },
  methods: {
    ...mapAction(['getAttachmentList']),
    ...mapMutation(['set_businessFile'])
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel(this.visibleField) }
    }

    return (
      <DragModal {...attributes}>
        <table class="file-table">
          {/* <tr>
            <td width="100px">在线填报内容</td>
            <td>
              <Button>立即填报</Button>
            </td>
          </tr> */}
          <tr>
            <td width="100px">文件列表</td>
            <td>
              <ul class="file-list">
                {this.businessFile.map(item => (
                  <li class="item">
                    <span>{item.fileName}</span>
                    <a
                      href={item.path}
                      target="_brank"
                    >
                      下载
                    </a>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </table>
      </DragModal>
    )
  }
}
