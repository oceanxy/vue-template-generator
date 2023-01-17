import { createStoreModule } from '@/store/template'
import { omit } from 'lodash'

export default commitRootInModule =>
  omit(
    createStoreModule({
      state: {
        // 学校范围弹窗
        visibilityOfSchoolList: false,
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
        // 右侧的学校
        rightSchool: [],
        // 选中的学校
        checkSchool: []
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
          commit('setDelSchoolList', id)
        }
      }
    })
  )
