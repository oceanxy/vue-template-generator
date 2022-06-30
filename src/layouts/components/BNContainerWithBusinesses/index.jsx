import './index.scss'
import { Descriptions } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import BNContainer from '@/components/BNContainer'
// import TGTabPane from '@/components/TGTabPane'
// import BillTable from '@/views/manager/basis/Businesses/components/BillTable'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import { dispatch } from '@/utils/store'

export default {
  name: 'BusinessDetails',
  mixins: [dynamicState(store, dynamicModules)],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    businessDetails() {
      return this.$store.state[this.moduleName].businessDetails
    }
  },
  async mounted() {
    const { id } = this.$route.query
    await dispatch(this.moduleName, 'getContractDetail', { id })
  },
  methods: {
    toPath(item) {
      if (item.isClick === 0) return

      this.$router.push({
        path: item.url
      })
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="bnm-businesses-details-container"
        siderClass="bnm-businesses-details-sider-container"
        contentClass="bnm-businesses-details-content-container"
        siderOnLeft={true}
      >
        <div slot="sider" class="bnm-businesses-details-sider">
          {
            this.businessDetails.map(item => (
              <BNContainer
                width="100%"
                showBoxShadow={false}
                modalTitle={item.name}
              >
                <Descriptions column={1} colon={false}>
                  {
                    item.propertiesList.map(item2 => (
                      <Descriptions.Item label={item2.name}>
                        <a
                          style={{ color: item2.isClick === 1 ? '#40a9ff' : '#999999' }}
                          onClick={() => this.toPath(item2)}
                        >
                          {
                            item2.dataType === 1
                              ? <span>{item2.value}</span>
                              : <img class="img" src={item2.value} alt="" />
                          }
                        </a>
                      </Descriptions.Item>
                    ))
                  }
                </Descriptions>
              </BNContainer>
            ))
          }
        </div>
        <RouterView />
      </TGContainerWithSider>
    )
  }
}
