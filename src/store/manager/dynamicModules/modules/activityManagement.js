import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        // 学校范围弹窗
        visibleOfSchoolList: false,
        yearList: {
          list: [],
          loading: false
        },
        itemList: {
          list: [],
          loading: false
        },
        activeSchoolList: {
          list: [],
          loading: false
        },
        organsTree: {
          loading: false,
          list: []
        },
        details: null,
        // 选中的学校
        rightSchool: []
      },
      mutations: {
        setAddSchoolList(state, item) {
          item.map(itm => {
            state.rightSchool.push(itm)
          })
        },
        setDelSchoolList(state, id) {
          const index = state.rightSchool.findIndex(itm => {
            if (itm.id === id) {
              return true
            }
          })

          state.rightSchool.splice(index, 1)
        }
      },
      actions: {
        addSchoolItem({ commit }, item) {
          if (item) {
            commit('setAddSchoolList', item)
          }
        },
        delSchoolItem({ commit }, id) {
          console.log(id)
          commit('setDelSchoolList', id)
        }
      }
    })
  )
