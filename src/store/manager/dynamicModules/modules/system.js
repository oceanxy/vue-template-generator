import { createStoreModule } from '@/store/template'

export default commitRootInModule => createStoreModule(
  {
    state: {
      currentMenuId: '',
      menuTree: {
        loading: false,
        list: []
      }
    },
    actions: {
      setCurrentMenuId({ state, commit, dispatch }, { moduleName, value }) {
        if (state.currentMenuId !== value) {
          dispatch('setSearch', {
            payload: { parentId: value },
            moduleName
          }, { root: true })

          commit('setDetails', {
            value,
            moduleName: 'system',
            stateName: 'currentMenuId'
          }, { root: true })
        }
      }
    }
  }
)
