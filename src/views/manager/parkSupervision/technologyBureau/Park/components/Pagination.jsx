import { Pagination } from 'ant-design-vue'
import forPagination from '@/mixins/forPagination'
import { omit } from 'lodash'
import '../assets/styles/index.scss'

export default {
  mixins: [forPagination],
  render() {
    return (
      <Pagination
        class="tg-pagination"
        {...{
          props: omit(this.$data, 'on'),
          on: this.$data.on
        }}
      />
    )
  }
}
