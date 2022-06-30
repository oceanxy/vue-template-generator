import './index.scss'
import forModal from '@/mixins/forModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'
import { Button } from 'ant-design-vue'
import Inquiry from './components/Inquiry'
import Table from './components/Table'

export default {
  mixins: [forModal()],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    modalTitle: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      modalProps: {
        width: 700,
        footer: <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>
      },
      visibleField: 'visibleOfPreview'
    }
  },
  computed: mapState({
    allSiteApps: 'allSiteApps',
    allFunctionalModules: 'allFunctionalModules'
  }),
  watch: {
    visible(value) {
      if (value) {
        //
      } else {
        //
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField)
      }
    }

    return (
      <DragModal {...attributes}>
        <Inquiry />
        <Table />
      </DragModal>
    )
  }
}
