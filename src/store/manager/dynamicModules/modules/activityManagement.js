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
        schoolStree: {
          list: [],
          loading: false
        },
        // 选中的学校
        rightSchool: []
      },
      mutations: {
        AddSchoolList(state, item) {
          item.map(itm => {
            state.rightSchool.push(itm)
          })
          // state.rightSchool = item
        },
        DelSchoolList(state, id) {
          console.log('idid', id)
          state.rightSchool?.findIndex((itm, index) => {
            if (itm.id === id) {
              state.rightSchool.splice(index, 1)
            }
          })
        }
      },
      actions: {
        add_item({ commit }, item) {
          if (item) {
            commit('AddSchoolList', item)
          }
        },
        del_item({ commit }, id) {
          commit('DelSchoolList', id)
        }
      }
    })
  )
