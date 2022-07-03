import './index.scss'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import TableOfChooseContractTemplate from './TableOfChooseContractTemplate'
import forTableModal from '@/mixins/forModal/forTableModal'
import apis from '@/apis'

export default {
  inject: ['submoduleName'],
  mixins: [forTableModal()],
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
        width: 810,
        okText: '确认选择',
        footer: undefined,
        destroyOnClose: true
      },
      visibleField: 'visibleOfChooseContractTemplate',
      loading: false,
      dataSource: []
    }
  },
  provide() {
    return { visibleField: this.visibleField }
  },
  computed: {
    ...mapGetters({ getState: 'getState' })
  },
  watch: {
    async visible(value) {
      if (value) {
        this.loading = true

        const response = await apis.getContractTemplates({
          id: this.$route.query.id
        })

        this.loading = false

        if (response.status) {
          this.dataSource = response.data
        }
      }
    }
  },
  methods: {
    async onClose() {
      await this.$store.dispatch('setRowSelected', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        payload: {
          selectedRowKeys: [],
          selectedRows: []
        }
      })

      await this.onCancel(this.visibleField)
    },
    onSubmit() {
      //
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: this.onClose,
        ok: () => this.onCancel(this.visibleField)
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <TableOfChooseContractTemplate loading={this.loading} dataSource={this.dataSource} />
      </DragModal>
    )
  }
}
