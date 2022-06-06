import './index.scss'
import BNContainer from '@/components/BNContainer'
import preview from './assets/images/preview.svg'
import download from './assets/images/download.svg'
import renew from './assets/images/renew.svg'
import terminateContract from './assets/images/terminateContract.svg'
import { Button, Descriptions, Icon, Space } from 'ant-design-vue'

export default {
  render() {
    return (
      <BNContainer
        width="100%"
        title="我的合同"
        contentClass="bn-contract-content"
      >
        <BNContainer
          title="企业续签合同"
          class="contract-item"
          titleClass="contract-item-title"
          contentClass="contract-item-content"
        >
          <Descriptions column={1}>
            <Descriptions.Item label="租用场所">珠光御景 / 南区27栋 / 606号</Descriptions.Item>
            <Descriptions.Item label="合同期限">2022-05-18 至 2023-05-17（5年）</Descriptions.Item>
            <Descriptions.Item label="生成时间">2022-05-18 19:51</Descriptions.Item>
            <Descriptions.Item label="签约状态">已签约（签约时间：2022-05-18 19:51，经办人：陈永森,13883192629 ）</Descriptions.Item>
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
          title=" 21423423D丨企业入驻合同"
          class="contract-item"
          titleClass="contract-item-title"
          contentClass="contract-item-content"
        >
          <Descriptions column={1}>
            <Descriptions.Item label="租用场所">珠光御景 / 南区27栋 / 606号</Descriptions.Item>
            <Descriptions.Item label="合同期限">2022-05-18 至 2023-05-17（5年）</Descriptions.Item>
            <Descriptions.Item label="生成时间">2022-05-18 19:51</Descriptions.Item>
            <Descriptions.Item label="签约状态">已签约（签约时间：2022-05-18 19:51，经办人：陈永森,13883192629 ）</Descriptions.Item>
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
                  <Icon component={terminateContract} width='0.5em' />
                  申请解约
                </Button>
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </BNContainer>
      </BNContainer>
    )
  }
}
