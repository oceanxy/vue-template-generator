/**
 * 物业报修侧边栏
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-02 周四 10:58:05
 */

import './index.scss'
import { Button, Divider, Empty, Spin } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import PropertyCard from '@/components/PropertyCard'

export default {
  props: {
    loading: Boolean,
    list: Array,
    title: String,
    pageIndex: {
      type: Number,
      default: 0
    },
    pageTotal: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    statusSearch(value) {
      this.$emit('setStatus', value)
    },
    onChangePager(type) {
      if (type === 'up') {
        if (this.pageIndex <= 0) return

        this.$emit('pagerChange', this.pageIndex - 1)
      } else if (type === 'next') {
        if (this.pageIndex + 1 >= Number.parseInt(this.pageTotal / 10 + 1)) return

        this.$emit('pagerChange', this.pageIndex + 1)
      }
    }
  },
  watch: {},
  render() {
    return (
      <BNContainer
        width="100%"
        class="properties-records"
        contentClass="repair-records"
        modalTitle={
          <div class="title">
            {this.title}
            <div class="btns">
              <Button class="all" onclick={() => this.statusSearch('')}>
                全部
              </Button>
              <Divider type="vertical" />
              <Button class="todo" onclick={() => this.statusSearch(2)}>
                待处理
              </Button>
              <Divider type="vertical" />
              <Button class="in-progress" onclick={() => this.statusSearch(1)}>
                已处理
              </Button>
            </div>
          </div>
        }>
        <Spin spinning={this.loading}>
          {this.list.map(item => {
            return <PropertyCard data={item}></PropertyCard>
          })}
          {this.list.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> : null}
          <br />
          <div class="pager-btn">
            <Button.Group>
              <Button onclick={() => this.onChangePager('up')}>上一页</Button>
              <Button onclick={() => this.onChangePager('next')}>下一页</Button>
            </Button.Group>
          </div>
        </Spin>
      </BNContainer>
    )
  }
}
