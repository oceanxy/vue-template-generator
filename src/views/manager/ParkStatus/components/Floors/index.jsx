import './index.scss'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'

export default {
  inject: ['moduleName'],
  data() {
    return {
      currentId: ''
    }
  },
  computed: {
    ...mapGetters({
      getState: 'getState'
    }),
    floors() {
      return this.getState('floors', this.moduleName)
    }
  },
  async created() {
    if (!this.floors.length) {
      await dispatch(this.moduleName, 'getFloorsByBuilding')
    }
  },
  methods: {
    async onClick(e) {
      const floorId = e.target.id
      console.log(e.target)

      await this.$store.dispatch('setSearch', {
        moduleName: this.moduleName,
        payload: { floorId }
      })

      this.currentId = floorId
    }
  },
  render() {
    return (
      <ul
        class="park-status-main--floor"
        onClick={this.onClick}
        slot="sider"
      >
        <li
          value={''}
          class={this.currentId === '' ? 'active' : ''}
        >
          全部
        </li>
        {
          this.floors.map(item => (
            <li
              id={item.id}
              class={this.currentId === item.id ? 'active' : ''}
            >
              {item.fullName}
            </li>
          ))
        }
      </ul>
    )
  }
}
