import { createStoreModule } from '@/store/template'
import apis from '@/apis'
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
        organsTree: {
          loading: false,
          list: []
        },
        // 选中的学校
        rightSchool: []
      },
      mutations: {
        AddSchoolList(state, item) {
          item.map(itm => {
            state.rightSchool.push(itm)
          })
        },
        DelSchoolList(state, id) {
          const index = state.rightSchool.findIndex(itm => {
            if (itm.id === id) {
              return true
            }
          })

          state.rightSchool.splice(index, 1)
        }
      },
      actions: {
        add_item({ commit }, item) {
          if (item) {
            commit('AddSchoolList', item)
          }
        },
        del_item({ commit }, id) {
          console.log(id)
          commit('DelSchoolList', id)
        }
      }
    })
  )
