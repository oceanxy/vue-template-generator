import './index.scss'
import { Button, Descriptions } from 'ant-design-vue'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    showButton: {
      type: Boolean,
      default: false
    }
  },
  render() {
    return (
      <Descriptions
        bordered
        column={1}
        class={'business-configuration-item'}
        title={
          <div class={'business-configuration-title'}>
            <span>{this.title}</span>
            {this.showButton ? <Button ghost type={'primary'}>配置</Button> : null}
          </div>
        }
      >
        <Descriptions.Item label={'开始提醒日期'}>到期前30天</Descriptions.Item>
        <Descriptions.Item label={'结束提醒日期'}>到期后30天</Descriptions.Item>
        <Descriptions.Item label={'提醒频率（天/次）'}>5</Descriptions.Item>
        <Descriptions.Item label={'提醒对象'}>客户，园区管理员</Descriptions.Item>
        <Descriptions.Item label={'提醒内容'}>尊敬的企业用户您好，您的园区租用合同即将于XX天后到期（到期日期：2022-05-18），请及时续签</Descriptions.Item>
      </Descriptions>
    )
  }
}
