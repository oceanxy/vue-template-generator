import '../assets/styles/index.scss'
import { TreeSelect } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    tableYear: {
      get() {
        return this.getState('tableYear', this.moduleName)
      },
      set(value) {
        this.$store.commit('setDetails', {
          stateName: 'tableYear',
          moduleName: this.moduleName,
          value
        })
      }
    },
    years() {
      return this.getState('years', this.moduleName)
    }
  },
  watch: {
    years: {
      deep: true,
      handler(value) {
        this.tableYear = value.list?.[0]?.dateVal
      }
    }
  },
  render() {
    return (
      <div>
        按类型统计
        <TreeSelect
          vModel={this.tableYear}
          allowClear
          style={{
            width: '120px',
            marginLeft: 'auto'
          }}
          placeholder={'年份/月份'}
          treeData={this.years.list}
          replaceFields={{
            children: 'childrenList',
            title: 'dateName',
            key: 'id',
            value: 'dateVal'
          }}
        />
      </div>
    )
  }
}
