import './index.scss'
import { Calendar } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import moment from 'moment'

export default {
  inject: ['moduleName'],
  methods: {
    async onSelect(date) {
      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        payload: { currentTime: moment(date).format('YYYYMMDD') }
      })
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        class="fe-console-datetime-picker"
        modalTitle="选择日期"
      >
        <Calendar
          fullscreen={false}
          onSelect={this.onSelect}
          defaultValue={moment()}
        />
      </BNContainer>
    )
  }
}
