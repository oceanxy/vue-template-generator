import './index.scss'
import { Alert, Form, TreeSelect } from 'ant-design-vue'
import DragModal from '@/components/DragModal'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'

export default Form.create({})({
  inject: ['submoduleName'],
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 400,
        okText: '确认选择'
      },
      visibleField: 'visibleOfChooseVenue'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    },
    hatcheryIds() {
      const roomIdFormRouteQuery = this.$route.query.rid ? [this.$route.query.rid] : []
      const roomIdFromDetails = this.details.placeList?.map(item => item.id) ?? []

      return [].concat(roomIdFormRouteQuery, roomIdFromDetails)
    },
    hatcheryTree() {
      return this.getState('hatcheryTree', this.moduleName, this.submoduleName)
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        await dispatch(this.moduleName, 'getHatcheryTree', { id: this.details.id })
      }
    }
  },
  methods: {
    onClose() {
      this.onCancel(this.visibleField)
      this.form.resetFields()
    },
    // 此处需要重写 onSubmit，不能使用 forFormModal 内的 onSubmit
    async onSubmit() {
      const status = await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        additionalQueryParameters: { ids: this.form.getFieldValue('hatcheryIds').join() }
      })

      if (status) {
        this.onClose()
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onClose(),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal modal-of-choose-venue'}>
        <Alert
          message="不同中心考核形式不同，请谨慎选择"
          banner
          closable
          type={'info'}
          class={'bnm-alert-info'}
        />
        <Form colon={false}>
          <Form.Item>
            {
              this.form.getFieldDecorator('hatcheryIds', {
                initialValue: this.hatcheryIds,
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请至少选择一个房间！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  multiple
                  dropdownClassName={'bnm-select-dropdown'}
                  treeData={this.hatcheryTree}
                  replaceFields={{
                    children: 'children', title: 'name', key: 'id', value: 'id'
                  }}
                  treeNodeFilterProp={'title'}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择孵化场所'}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
