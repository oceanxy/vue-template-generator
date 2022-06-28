/*
 * @Author: yangjialong 1476927892@qq.com
 * @Date: 2022-06-27 16:39:07
 * @LastEditors: yangjialong 1476927892@qq.com
 * @LastEditTime: 2022-06-28 11:37:11
 * @FilePath: \vue-template-generator\src\views\manager\contractManagement\ContractReview\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfContractReview from './components/ModalOfContractReview'

export default {
  name: 'ContractReview',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <BNContainerWithParkSider contentClass={'bnm-contract-review-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <ModalOfContractReview slot={'modals'} modalTitle={'签约审核'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
