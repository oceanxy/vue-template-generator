import './index.scss'
import BNMDescriptions from '@/views/manager/contractManagement/BusinessConfiguration/components/BNMDescriptions'

export default {
  render() {
    return (
      <div class={'bnm-business-configuration-container'}>
        <BNMDescriptions title={'合同到期提醒设置'} showButton />
        <BNMDescriptions title={'线索分配机制'} showButton />
        <BNMDescriptions title={'签约模板配置'} />
        <BNMDescriptions title={'合同模板编辑'} showButton />
        <BNMDescriptions title={'企业考核指标'} showButton />
      </div>
    )
  }
}
