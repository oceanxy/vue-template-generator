import { createStoreModule } from '@/store/template'

export default commitRootInModule =>
  createStoreModule({
    state: {
      // 二维码弹窗
      visibilityOfCode: false,
      visibilityOfImport: false,
      // 设置学生宿舍
      visibilityOfSetRooms: false,
      schoolListByThisUser: {
        loading: false,
        list: []
      },
      streetList: {
        loading: false,
        list: []
      },
      codeBatchUrl: {
        loading: false,
        list: null
      },
      grade: [],
      classNumber: '',
      // 查询所有楼栋楼层房间
      allBuildList: {
        loading: false,
        list: []
      }
    },
    mutations: {
      set_allBuildList(state, payload) {
        state.allBuildList.list = payload
      }
    },
    actions: {
      getAllBuildList({ commit }, data) {
        commit('set_allBuildList', data)
      }
    }
  })
