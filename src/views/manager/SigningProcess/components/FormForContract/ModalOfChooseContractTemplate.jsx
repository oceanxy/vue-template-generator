import './index.scss'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import TableOfChooseContractTemplate from './TableOfChooseContractTemplate'
import forTableModal from '@/mixins/forModal/forTableModal'
import apis from '@/apis'

export default {
  inject: ['submoduleName'],
  mixins: [forTableModal()],
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
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        this.loading = true

        const response = await apis.getContractTemplates({
          id: this.details.id
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

      await this.onCancel(this.visibleField, this.submoduleName)
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
        ok: () => this.onCancel(this.visibleField, this.submoduleName)
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <TableOfChooseContractTemplate loading={this.loading} dataSource={this.dataSource} />
      </DragModal>
    )
  }
}
