import '../assets/styles/index.scss'
import { Pagination } from 'ant-design-vue'
import forPagination from '@/mixins/forPagination'
import { omit } from 'lodash'

export default {
  mixins: [forPagination],
  render() {
    return (
      <Pagination
        class="tg-pagination"
        {...{
          props: omit(this.paginationProps, 'on'),
          on: this.paginationOn
        }}
      />
    )
  }
}
