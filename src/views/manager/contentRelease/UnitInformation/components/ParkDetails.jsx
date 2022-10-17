import '../index.scss'
import { Button, Descriptions, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    unitDetails() {
      return this.getState('unitDetails', this.moduleName)
    },
    parkDetails() {
      return this.getState('parkDetails', this.moduleName)
    }
  },
  watch: {
    unitDetails: {
      deep: true,
      async handler(value) {
        if (value.data.id) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'parkDetails',
            customApiName: 'getParkDetails',
            payload: { parkId: value.data.id }
          })
        }
      }
    }
  },
  render() {
    return (
      <Spin
        spinning={this.parkDetails.loading}
        class={'conf-item'}
      >
        <Descriptions
          bordered
          column={1}
          title={
            <div class={'conf-title'}>
              <span>{this.parkDetails.data.fullName || '园区信息'}</span>
              <Button
                ghost
                type={'primary'}
              >配置</Button>
            </div>
          }
        >
          <Descriptions.Item label={'地址'}>{this.parkDetails.data.address}</Descriptions.Item>
          <Descriptions.Item label={'开户银行'}>{}</Descriptions.Item>
          <Descriptions.Item label={'账户'}>{this.parkDetails.data.loginAccount}</Descriptions.Item>
          <Descriptions.Item label={'监管单位'}>{this.parkDetails.data.regulationUnitNames}</Descriptions.Item>
          <Descriptions.Item label={'物业单位'}>{}</Descriptions.Item>
          <Descriptions.Item label={'运营单位'}>{}</Descriptions.Item>
          <Descriptions.Item label={'负责人'}>{this.parkDetails.data.dutyPerson}</Descriptions.Item>
          <Descriptions.Item label={'负责人手机'}>{this.parkDetails.data.dutyPersonMobile}</Descriptions.Item>
          <Descriptions.Item label={'联系电话'}>{}</Descriptions.Item>
          <Descriptions.Item label={'园区图片'}>{
            this.parkDetails.data.imgList?.map(item => (
              <img
                src={item.path}
                alt=""
              />
            ))
          }</Descriptions.Item>
          <Descriptions.Item label={'园区简介'}>{this.parkDetails.data.description}</Descriptions.Item>
          <Descriptions.Item label={'运营情况'}>{this.parkDetails.data.operation}</Descriptions.Item>
          <Descriptions.Item label={'楼栋信息'}>{this.parkDetails.data.buildInfo}</Descriptions.Item>
          <Descriptions.Item label={'园区配套'}>{this.parkDetails.data.parkSupport}</Descriptions.Item>
        </Descriptions>
      </Spin>
    )
  }
}
