import '../assets/styles/index.scss'
import { Pagination } from 'ant-design-vue'
import forPagination from '@/mixins/forPagination'
import { omit } from 'lodash'

export default {
  mixins: [forPagination],
  render() {
    return (
      <Pagination
        class="bn-pages-pagination"
        {...{
          props: omit(this.$data, 'on'),
          on: this.$data.on
        }}
      />
    )
  }
}
