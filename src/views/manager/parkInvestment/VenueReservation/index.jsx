import './assets/styles/index.scss'
import Form from './components/Form'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import { mapGetters } from 'vuex'

export default {
  name: 'VenueReservation',
  mixins: [dynamicState(store, dynamicModules)],
  computed: {
    ...mapGetters({
      listOfAccountApplicationRecord: 'listOfAccountApplicationRecord',
      getLoading: 'getLoading'
    })
  },
  async created() {
    // await this.$store.dispatch('accountOpening/getListOfAccountApplicationRecord')
  },
  render() {
    return (
      <div class={'bnm-venue-reservation-container'}>
        <div class={'venue-reservation-remind'}>
          <p>园区/楼栋/楼层</p>
          <p>房间详细信息</p>
        </div>
        <div class={'venue-reservation-form-container'}>
          <Form class={'venue-reservation-form'} />
        </div>
      </div>
    )
  }
}
