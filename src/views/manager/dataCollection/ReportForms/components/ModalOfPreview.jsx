import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import { Button, Collapse, Form, Spin } from 'ant-design-vue'
import DynamicComponent from '../../MyReports/FillOutReport/DynamicComponent'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 440,
        footer: [
          <Button onClick={() => this.onCancel(this.visibleField)}>关闭</Button>
        ]
      },
      visibleField: 'visibleOfPreview',
      activeKey: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    visible() {
      return this.getState(this.visibleField, this.moduleName)
    },
    preview() {
      return this.getState('preview', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          const status = await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            payload: { reportId: this.currentItem.id },
            stateName: 'preview',
            customApiName: 'getReportPreview'
          })

          if (status) {
            this.$nextTick(() => {
              this.activeKey = this.preview.data.itemCatalogList?.[0].id ?? ''
            })
          }
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
      <DragModal {...attributes} class={'bnm-table-modal bnm-report-form-preview'}>
        <Spin spinning={this.preview.loading}>
          <Collapse vModel={this.activeKey}>
            {
              this.preview.data.itemCatalogList?.map(item => (
                <Collapse.Panel
                  key={item.id}
                  header={item.fullName || '暂无分类名称'}
                >
                  <Form>
                    {
                      item.itemList.map(comp => (
                        <Form.Item label={comp.fullName}>
                          <DynamicComponent dataSource={comp} disabled />
                        </Form.Item>
                      ))
                    }
                  </Form>
                </Collapse.Panel>
              )) ?? null
            }
          </Collapse>
        </Spin>
      </DragModal>
    )
  }
}
