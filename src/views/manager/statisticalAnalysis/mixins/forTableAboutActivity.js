/**
 * 统计分析模块下页面关于活动混合逻辑
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-11-14 周一 16:05:48
 */

import { mapGetters } from 'vuex'

/**
 * 统计分析模块下页面关于活动混合
 * @param type {number} 要获取的统计数据的类型 1:身高体重/派生指数 2：血压 3：视力 4：肺活量 5龋齿 6疾病 7营养状况
 * @returns {Object}
 */
export default ({ type } = {}) => ({
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    activities() {
      return this.getState('activities', this.moduleName)
    },
    townOrSubDistricts() {
      return this.getState('townOrSubDistricts', this.moduleName)
    }
  },
  async created() {
    const status = await this.$store.dispatch('getListWithLoadingStatus', {
      moduleName: this.moduleName,
      stateName: 'activities',
      customApiName: 'getActivitiesForStatisticsAnalysis',
      payload: { itemType: type }
    })

    if (status) {
      await Promise.all([
        // this.setSearch(this.activities.list[0].id, !this.notInitList),
        this.getTownOrSubDistrictsForSelectByActivityId(this.activities.list[0].id)
      ])
    }
  },
  methods: {
    async getTownOrSubDistrictsForSelectByActivityId(activityId) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'townOrSubDistricts',
        customApiName: 'getTownOrSubDistrictsForSelectByActivityId',
        payload: { activityId }
      })
    },
    async setSearch(activityId, isFetchList) {
      await this.$store.dispatch('setSearch', {
        payload: {
          activityId,
          activityOrgId: ''
        },
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        isFetchList
      })
    }
  }
})
