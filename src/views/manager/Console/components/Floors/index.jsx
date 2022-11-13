import './index.scss'
import { mapGetters } from 'vuex'
import { Spin } from 'ant-design-vue'

export default {
  inject: ['moduleName'],
  data() {
    return { currentId: '' }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search() {
      return this.getState('search', this.moduleName)
    },
    floors() {
      return this.getState('floors', this.moduleName)
    }
  },
  watch: {
    'search.buildId': {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'floors',
            customApiName: 'getFloorsByBuilding',
            payload: { buildId: value }
          })
        }
      }
    }
  },
  methods: {
    async onClick(e) {
      const floorId = e.target.id

      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        payload: { floorId }
      })

      this.currentId = floorId
    }
  },
  render() {
    return (
      <Spin
        spinning={this.floors.loading}
        class="fe-console-main--floor"
      >
        <ul onClick={this.onClick}>
          <li
            value={''}
            class={this.currentId === '' ? 'active' : ''}
          >
            全部
          </li>
          {
            this.floors.list.map(item => (
              <li
                id={item.id}
                class={this.currentId === item.id ? 'active' : ''}
              >
                {item.fullName}
              </li>
            ))
          }
        </ul>
      </Spin>
    )
  }
}
