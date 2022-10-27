import '../index.scss'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'
import { Button, Descriptions, Spin } from 'ant-design-vue'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 810,
        footer: [
          <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>
        ]
      },
      visibleField: 'visibleOfDetails'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'details',
            payload: { id: this.currentItem.id },
            customApiName: 'getDetailsOfHousingResources'
          })
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
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Spin spinning={this.details.loading}>
          <Descriptions
            bordered
            column={2}
            size={'small'}
            class={'fe-console-details'}
          >
            <Descriptions.Item
              label={'图片'}
              span={2}
            >
              <div class={'imgs'}>
                {
                  this.details.data?.imgList?.map(item => (
                    <img
                      src={item.path}
                      alt={item.fileName || ''}
                    />
                  ))
                }
              </div>
            </Descriptions.Item>
            <Descriptions.Item label={'房号'}>{this.details.data.roomNo}</Descriptions.Item>
            <Descriptions.Item label={'房源位置'}>{this.details.data.floorNameStr}</Descriptions.Item>
            <Descriptions.Item label={'面积'}>{this.details.data.roomArea}㎡</Descriptions.Item>
            <Descriptions.Item label={'出租单价'}>{this.details.data.price}元/㎡</Descriptions.Item>
            <Descriptions.Item label={'计费方式'}>{this.details.data.priceTypeStr}</Descriptions.Item>
            <Descriptions.Item label={'工位数'}>{this.details.data.roomNo}</Descriptions.Item>
            <Descriptions.Item label={'装修情况'}>{this.details.data.renovationStatusStr}</Descriptions.Item>
            <Descriptions.Item label={'房源结构'}>{this.details.data.structureStr}</Descriptions.Item>
            <Descriptions.Item label={'配套设施'}>{this.details.data.supportFacilityStr}</Descriptions.Item>
          </Descriptions>
        </Spin>
      </DragModal>
    )
  }
}
