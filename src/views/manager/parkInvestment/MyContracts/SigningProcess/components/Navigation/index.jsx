import './assets/styles/index.scss'
import { Icon } from 'ant-design-vue'

export default {
  render() {
    return (
      <div class={'signing-process-navigation'}>
        <div class={'navigation-wrapper'}>
          <div class={'navigation-item checked'}>
            <Icon component={require('./assets/images/business.svg')} />
            <span>选择企业</span>
          </div>
          <div class={'navigation-item'}>
            <Icon component={require('./assets/images/info.svg')} />
            <span>填报签约信息</span>
          </div>
          <div class={'navigation-item'}>
            <Icon component={require('./assets/images/contract.svg')} />
            <span>合同签约</span>
          </div>
          <div class={'navigation-item'}>
            <Icon component={require('./assets/images/review.svg')} />
            <span>合同审核</span>
          </div>
        </div>
      </div>
    )
  }
}
