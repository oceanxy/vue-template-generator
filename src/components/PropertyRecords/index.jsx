/**
 * 物业报修侧边栏
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-06-02 周四 10:58:05
 */

import './index.scss'
import { Button, Divider } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import PropertyCard from '@/components/PropertyCard'

export default {
  render() {
    return (
      <BNContainer
        width="100%"
        class="properties-records"
        contentClass="repair-records"
        moduleTitle={
          <div class="title">
            我的报修记录
            <div class="btns">
              <Button class="all">全部</Button>
              <Divider type="vertical" />
              <Button class="todo">待处理</Button>
              <Divider type="vertical" />
              <Button class="in-progress">已处理</Button>
            </div>
          </div>
        }
      >
        <PropertyCard statusColor="#faad14" data={{ status: 0 }} />
        <PropertyCard statusColor="#52C41A" data={{ status: 1 }} />
        <PropertyCard />
      </BNContainer>
    )
  }
}
