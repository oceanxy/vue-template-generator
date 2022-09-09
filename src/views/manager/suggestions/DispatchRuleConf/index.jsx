import './index.scss'
import dynamicState from '@/mixins/dynamicState'
import Remind from './components/Remind'
import RemindersForHandlingComplaints from './components/RemindersForHandlingComplaints'
import AutoDispatchRules from './components/AutoDispatchRules'
import ModalOfRemindersForHandingComplaints from './components/ModalOfRemindersForHandingComplaints'
import ModalOfAutoDispatchRules from './components/ModalOfAutoDispatchRules'

export default {
  name: 'DispatchRuleConf',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'bnm-dispatch-rule-conf-container'}>
        <Remind />
        <RemindersForHandlingComplaints />
        <AutoDispatchRules />

        <ModalOfRemindersForHandingComplaints modalTitle={'配置投诉处理提醒'} />
        <ModalOfAutoDispatchRules modalTitle={'配置自动派单规则'} />
      </div>
    )
  }
}
