import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 400,
        okText: '确定'
      },
      visibleField: 'visibleOfRecoverClues'
    }
  },
  computed: mapState({
    allSiteApps: 'allSiteApps',
    allFunctionalModules: 'allFunctionalModules'
  }),
  watch: {
    async visible(value) {
      if (value) {
        // await this.$store.dispatch('getAllFunctionalModules')
      }
    }
  },
  methods: {
    onSubmit() {
      //
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: this.onSubmit
      }
    }

    return (
      <DragModal {...attributes}>
        收回线索后，对应的人员将不可对线索进行跟进，请谨慎操作
      </DragModal>
    )
  }
}
