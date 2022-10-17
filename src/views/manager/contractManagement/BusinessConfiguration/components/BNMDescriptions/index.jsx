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
    },
    dataSource: {
      type: Object,
      default: () => ({})
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
            {this.showButton ? <Button
              ghost
              type={'primary'}
            >配置</Button> : null}
          </div>
        }
      >
        <Descriptions.Item label={'费项名称'}>{this.dataSource.itemName}</Descriptions.Item>
        <Descriptions.Item label={'金额'}>{this.dataSource.amountStr}</Descriptions.Item>
        <Descriptions.Item label={'费项描述'}>{this.dataSource.description}</Descriptions.Item>
        <Descriptions.Item label={'到期欠费是否使用履约保证金抵扣'}>{this.dataSource.isDeduction}</Descriptions.Item>
        <Descriptions.Item label={'收取方式'}>{this.dataSource.takeTypeStr}</Descriptions.Item>
      </Descriptions>
    )
  }
}
