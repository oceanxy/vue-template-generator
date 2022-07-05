import './index.scss'
import BNContainer from '@/components/BNContainer'
import preview from './assets/images/preview.svg'
import download from './assets/images/download.svg'
import renew from './assets/images/renew.svg'
import terminateContract from './assets/images/terminateContract.svg'
import { Button, Descriptions, Icon, Space, Spin } from 'ant-design-vue'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'

export default {
  name: 'Contract',

  mixins: [dynamicState(store, dynamicModules)],
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    },
    list() {
      return this.$store.state[this.moduleName].list
    }
  },
  created() {
    dispatch(this.moduleName, 'getContracts', { moduleName: this.moduleName })
  },
  render() {
    return (
      <Spin spinning={this.loading}>
        <BNContainer width="100%" modalTitle="我的合同" contentClass="bn-contract-content">
          {this.list.map(item => (
            <BNContainer
              modalTitle={item.companyName}
              class="contract-item"
              titleClass="contract-item-title"
              contentClass="contract-item-content">
              <Descriptions column={1}>
                {item.list.map(item2 => (
                  <Descriptions.Item label={item2.name}>{item2.value}</Descriptions.Item>
                ))}
                <Descriptions.Item>
                  <Space>
                    <Button type="primary" ghost class="preview">
                      <Icon component={preview} />
                      合同预览
                    </Button>
                    <Button type="primary" ghost class="preview">
                      <Icon component={download} />
                      合同下载
                    </Button>
                    <Button type="primary" ghost class="preview">
                      <Icon component={renew} />
                      我要续约
                    </Button>
                    <Button type="primary" ghost class="preview">
                      <Icon component={terminateContract} width="0.5em" />
                      申请解约
                    </Button>
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            </BNContainer>
          ))}
          {/* <BNContainer
            modalTitle="企业续签合同"
            class="contract-item"
            titleClass="contract-item-title"
            contentClass="contract-item-content">
            <Descriptions column={1}>
              <Descriptions.Item label="租用场所">珠光御景 / 南区27栋 / 606号</Descriptions.Item>
              <Descriptions.Item label="合同期限">2022-05-18 至 2023-05-17（5年）</Descriptions.Item>
              <Descriptions.Item label="生成时间">2022-05-18 19:51</Descriptions.Item>
              <Descriptions.Item label="签约状态">
                已签约（签约时间：2022-05-18 19:51，经办人：李卢,15865854254 ）
              </Descriptions.Item>
              <Descriptions.Item>
                <div class="contract-status">签约审核中，请耐心等待</div>
              </Descriptions.Item>
              <Descriptions.Item>
                <Space>
                  <Button type="primary" ghost class="preview">
                    <Icon component={preview} />
                    合同预览
                  </Button>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </BNContainer>
          <BNContainer
            moduleTitle=" 21423423D丨企业入驻合同"
            class="contract-item"
            titleClass="contract-item-title"
            contentClass="contract-item-content">
            <Descriptions column={1}>
              <Descriptions.Item label="租用场所">珠光御景 / 南区29栋 / 546号</Descriptions.Item>
              <Descriptions.Item label="合同期限">2022-05-18 至 2023-05-17（5年）</Descriptions.Item>
              <Descriptions.Item label="生成时间">2022-05-18 19:51</Descriptions.Item>
              <Descriptions.Item label="签约状态">
                已签约（签约时间：2022-05-18 19:51，经办人：陈强,15232635585 ）
              </Descriptions.Item>
              <Descriptions.Item>
                <div class="contract-status">签约审核中，请耐心等待</div>
              </Descriptions.Item>
              <Descriptions.Item>
                <Space>
                  <Button type="primary" ghost class="preview">
                    <Icon component={download} />
                    合同下载
                  </Button>
                  <Button type="primary" ghost class="preview">
                    <Icon component={renew} />
                    我要续约
                  </Button>
                  <Button type="primary" ghost class="preview">
                    <Icon component={terminateContract} width="0.5em" />
                    申请解约
                  </Button>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </BNContainer>
          <BNContainer
            moduleTitle=" 21423423D丨企业入驻合同"
            class="contract-item"
            titleClass="contract-item-title"
            contentClass="contract-item-content">
            <Descriptions column={1}>
              <Descriptions.Item label="租用场所">珠光御景壹号 / 北区07栋 / 26号</Descriptions.Item>
              <Descriptions.Item label="合同期限">2022-05-18 至 2023-05-17（5年）</Descriptions.Item>
              <Descriptions.Item label="生成时间">2022-05-18 19:51</Descriptions.Item>
              <Descriptions.Item label="签约状态">
                已签约（签约时间：2022-05-18 19:51，经办人：陈永森,13883191521 ）
              </Descriptions.Item>
              <Descriptions.Item>
                <div class="contract-status">签约审核中，请耐心等待</div>
              </Descriptions.Item>
              <Descriptions.Item>
                <Space>
                  <Button type="primary" ghost class="preview">
                    <Icon component={download} />
                    合同下载
                  </Button>
                  <Button type="primary" ghost class="preview">
                    <Icon component={renew} />
                    我要续约
                  </Button>
                  <Button type="primary" ghost class="preview">
                    <Icon component={terminateContract} width="0.5em" />
                    申请解约
                  </Button>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </BNContainer>
          <BNContainer
            moduleTitle=" 21423423D丨企业入驻合同"
            class="contract-item"
            titleClass="contract-item-title"
            contentClass="contract-item-content">
            <Descriptions column={1}>
              <Descriptions.Item label="租用场所">珠光御景山水城 / 17栋 / 606号</Descriptions.Item>
              <Descriptions.Item label="合同期限">2022-05-18 至 2023-05-17（5年）</Descriptions.Item>
              <Descriptions.Item label="生成时间">2022-05-18 19:51</Descriptions.Item>
              <Descriptions.Item label="签约状态">
                已签约（签约时间：2022-05-18 19:51，经办人：张思雨,13852658547 ）
              </Descriptions.Item>
              <Descriptions.Item>
                <div class="contract-status">签约审核中，请耐心等待</div>
              </Descriptions.Item>
              <Descriptions.Item>
                <Space>
                  <Button type="primary" ghost class="preview">
                    <Icon component={download} />
                    合同下载
                  </Button>
                  <Button type="primary" ghost class="preview">
                    <Icon component={renew} />
                    我要续约
                  </Button>
                  <Button type="primary" ghost class="preview">
                    <Icon component={terminateContract} width="0.5em" />
                    申请解约
                  </Button>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </BNContainer> */}
        </BNContainer>
      </Spin>
    )
  }
}
