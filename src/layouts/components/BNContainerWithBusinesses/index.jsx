import './index.scss'
import { Descriptions } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import BNContainer from '@/components/TGContainer'
import apis from '@/apis'

export default {
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return { generalInformation: [] }
  },
  async created() {
    const { cid, bid } = this.$route.query
    const response = await apis.getGeneralInformation({ cid, bid })

    if (response.status) {
      this.generalInformation = response.data?.companyDetailList ?? []
    }
  },
  methods: {
    async toPath(item) {
      if (item.isClick === 0) return

      await this.$router.push({ path: item.url })
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="tg-businesses-details-container"
        siderClass="tg-businesses-details-sider-container"
        contentClass="tg-businesses-details-content-container"
        siderOnLeft={true}
      >
        <div
          slot="sider"
          class="tg-businesses-details-sider"
        >
          {
            this.generalInformation.map(item => (
              <BNContainer
                width="100%"
                showBoxShadow={false}
                modalTitle={item.name}
              >
                <Descriptions
                  column={1}
                  colon={false}
                >
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
                              : <img
                                class="img"
                                src={item2.value}
                                alt=""
                              />
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
