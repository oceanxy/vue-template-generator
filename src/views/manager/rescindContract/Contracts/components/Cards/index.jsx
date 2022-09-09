import './assets/styles/index.scss'
import { Card, Spin, Tag } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  data() {
    return {
      cardList: [
        { image: require('./assets/images/contract.png') },
        { image: require('./assets/images/in-effect.png') },
        { image: require('./assets/images/expired.png') },
        { image: require('./assets/images/cancelled.png') },
        { image: require('./assets/images/renewed.png') }
      ]
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    contractCards() {
      return this.getState('contractCards', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'contractCards',
      customApiName: 'getContractCards'
    })
  },
  render() {
    return (
      <Spin spinning={this.contractCards.loading}>
        <div class={'bnm-rescind-contract-card-content'}>
          {
            this.contractCards.list.map((item, index) => (
              <Card style={{ '--image': `url(${this.cardList[index].image})` }}>
                <div class={'card-value'}>{item.count}</div>
                <div class={'card-label'}>
                  {item.name}
                  {
                    item.specialTips ? (
                      <Tag color={'red'} style={{ border: 'none' }}>{item.specialTips}</Tag>
                    ) : null
                  }
                </div>
              </Card>
            ))
          }
        </div>
      </Spin>
    )
  }
}
