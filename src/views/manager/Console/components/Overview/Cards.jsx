import './assets/styles/index.scss'
import { Card } from 'ant-design-vue'

export default {
  render() {
    return (
      <div class={'overview-bottom'}>
        <Card>
          <div class={'icon optometry'}></div>
          <p>验光正常率</p>
          <p>86.13%</p>
        </Card>
        <Card>
          <div class={'icon dental-caries'}></div>
          <p>龋齿眼疾正常率</p>
          <p>86.13%</p>
        </Card>
        <Card>
          <div class={'icon internal-medicine'}></div>
          <p>内科正常率</p>
          <p>86.13%</p>
        </Card>
        <Card>
          <div class={'icon surgical'}></div>
          <p>外科正常率</p>
          <p>86.13%</p>
        </Card>
      </div>
    )
  }
}
