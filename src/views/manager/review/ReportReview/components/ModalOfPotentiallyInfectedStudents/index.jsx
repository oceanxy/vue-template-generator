import DragModal from '@/components/DragModal'
import forTableModal from '@/mixins/forModal/forTableModal'
import forModuleName from '@/mixins/forModuleName'
import Inquiry from './Inquiry'
import Table from './Table'
import TGPagination from '@/components/TGPagination'
import { Button } from 'ant-design-vue'

export default {
  name: 'PotentiallyInfectedStudents',
  mixins: [forTableModal(), forModuleName(true)],
  data() {
    return {
      visibilityFieldName: 'visibilityOfPotentiallyInfectedStudents',
      modalProps: {
        width: 910,
        destroyOnClose: true,
        footer: [
          <Button
            icon={'close'}
            onClick={() => this.onCancel(this.visibilityFieldName)}
          >
            关闭
          </Button>,
          <Button
            type={'primary'}
            icon={'export'}
            onClick={() => this.onExport()}
          >
            导出
          </Button>
        ]
      }
    }
  },
  computed: {
    currentItem() {
      return this.$store.state[this.moduleName].currentItem
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: { cancel: () => this.onCancel(this.visibilityFieldName) }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          this.$store.commit('setState', {
            value: {
              floorId: this.currentItem.floorId,
              studentId: this.currentItem.studentId,
              type: 1, // 同源类型：1 楼层 2宿舍
              roomId: this.currentItem.roomId
            },
            moduleName: this.moduleName,
            submoduleName: this.submoduleName,
            stateName: 'search'
          })
        }
      }
    }
  },
  methods: {
    onExport() {
      //
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
}
