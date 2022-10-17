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
      setCurrentMenuId({
        state,
        commit,
        dispatch
      }, {
        moduleName,
        payload: { value, isFetchList }
      }) {
        if (state.currentMenuId !== value) {
          commit('setDetails', {
            value,
            moduleName: 'system',
            stateName: 'currentMenuId'
          }, { root: true })
        }

        dispatch(
          'setSearch',
          {
            payload: { parentId: value },
            isFetchList,
            moduleName
          },
          { root: true }
        )
      }
    }
  }
)
