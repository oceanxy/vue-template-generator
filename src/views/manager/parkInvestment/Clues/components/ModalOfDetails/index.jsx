import './index.scss'
import { Button, Form } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import dynamicState from '@/mixins/dynamicState'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import store, { dynamicModules } from '@/store/manager'

export default Form.create({})({
  name: 'Clues-ModalOfDetails',
  mixins: [dynamicState(store, dynamicModules), forModal('clues')],
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfDetails',
      modalProps: {
        width: 700,
        footer: <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>
      }
    }
  },
  computed: {
    ...mapState({
      allSiteApps: 'allSiteApps',
      allFunctionalModules: 'allFunctionalModules'
    })
  },
  watch: {
    async visible(value) {
      if (value) {
        // await this.$store.dispatch('getAllFunctionalModules')
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
      <DragModal {...attributes} class={'bnm-housing-resources-container'}>
        <Inquiry />
        <Table />
      </DragModal>
    )
  }
})
