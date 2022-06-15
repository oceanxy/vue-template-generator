import './assets/styles/index.scss'
import { Button, Divider, Icon, Tag } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import TGShortcutMenu from '@/components/TGShortcutMenu'
import TGList from '@/components/TGList'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import TGListWithSubTitle from '@/components/TGListWithSubTitle'

export default {
  render() {
    return (
      <TGContainerWithSider class="tg-home">
        <template slot="default">
          <div class="tg-home-summary">
            <div class="user-info">
              <Icon type="user" class="avatar" />
              <div class="info">
                <span class="name">重庆誉存科技有限公司</span>
                <span class="address">
                  珠光御景/南区27栋/606号
                  <Icon type="right" />
                </span>
              </div>
              <div class="tags">
                <Tag color="blue">已入住</Tag>
                <Tag color="cyan">已签约</Tag>
                <Tag color="red">已欠费</Tag>
              </div>
            </div>
            <div class="upcoming">
              <div class="upcoming-item my-to-do">
                <div class="name">我的待办</div>
                <div class="value">288</div>
              </div>
              <div class="upcoming-item in-progress">
                <div class="name">进行中的待办</div>
                <div class="value">288</div>
              </div>
              <div class="upcoming-item my-news">
                <div class="name">我的消息</div>
                <div class="value">288</div>
              </div>
            </div>
          </div>
          <BNContainer
            class="tg-home-upcoming"
            width="100%"
            title={
              <div class="title">
                我的待办
                <div class="btns">
                  <Button class="all">全部</Button>
                  <Divider type="vertical" />
                  <Button class="todo">待办</Button>
                  <Divider type="vertical" />
                  <Button class="in-progress">进行中</Button>
                  <Divider type="vertical" />
                  <Button class="done">已办</Button>
                </div>
              </div>
            }
          >
            <TGListWithSubTitle />
          </BNContainer>
        </template>
        <template slot="sider">
          <BNContainer
            width="100%"
            title="我的快捷菜单"
            showBoxShadow={false}
            class="shortcut-menu-container"
            titleClass="not-login-title"
            contentClass="shortcut-container"
          >
            <TGShortcutMenu column={3} />
          </BNContainer>
          <BNContainer
            class="my-news-container"
            width="100%"
            title="我的消息"
            showBoxShadow={false}
            showMore
            titleClass="not-login-title"
          >
            <TGList layout="dateBefore" />
          </BNContainer>
        </template>
      </TGContainerWithSider>
    )
  }
}
