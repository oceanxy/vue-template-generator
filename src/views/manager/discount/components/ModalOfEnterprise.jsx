import { Descriptions } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapAction, mapMutation, mapState } from '@/utils/store'

export default {
  mixins: [forModal()],
  data() {
    return {
      visibleField: 'visibleOfEnterprise',
      modalProps: {
        width: 800,
        footer: null
      }
    }
  },
  computed: { ...mapState(['businessInfo']) },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getCompanyProperties({ companyId: this.currentItem.companyId })
        } else {
          this.set_businessInfo([])
        }
      }
    }
  },
  methods: {
    ...mapAction(['getCompanyProperties']),
    ...mapMutation(['set_businessInfo'])
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel(this.visibleField) }
    }

    return (
      <DragModal {...attributes}>
        <Descriptions
          column={2}
          bordered={true}
        >
          {this.businessInfo.map(item => {
            return <Descriptions.Item label={item.name}>{item.value}</Descriptions.Item>
          })}
        </Descriptions>
      </DragModal>
    )
  }
}
