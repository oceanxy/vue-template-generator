export default commitRootInModule => ({
  state: {
    years: {
      loading: false,
      list: []
    },
    selectedYear: undefined,
    complaintStatisticsByYears: {
      loading: false,
      list: []
    },
    complaintStatisticsByStatus: {
      loading: false,
      list: []
    },
    complaintStatisticsByType: {
      loading: false,
      list: []
    }
  },
  modules: {
    complaintCompanyRanking: {
      state: {
        loading: false,
        list: [],
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          total: 0
        }
      }
    },
    personnelAcceptanceRanking: {
      state: {
        loading: false,
        list: [],
        pagination: {
          pageIndex: 0,
          pageSize: 10,
          total: 0
        }
      }
    }
  }
})
