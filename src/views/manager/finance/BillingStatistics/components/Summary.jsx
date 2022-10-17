import '../assets/styles/index.scss'
import { Statistic } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    summary() {
      return this.getState('list', this.moduleName).at(-1)
    }
  },
  render() {
    return (
      <div class={'bnm-billing-statistics-summary'}>
        <Statistic
          title={'账单汇总'}
          value={this.summary?.totalAmount}
          precision={2}
          suffix={'元'}
        />
        <p>
          <span style={{ color: '#52c41a' }}>已结清：</span>
          <span>{this.summary?.endAmount ?? 0}元</span>
        </p>
        <p>
          <span style={{ color: '#f5222d' }}>欠缴：</span>
          <span>{this.summary?.oweAmount ?? 0}元</span>
        </p>
      </div>
    )
  }
}
