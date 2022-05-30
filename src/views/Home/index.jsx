import './assets/styles/index.scss'
import { Button, Divider, Icon, List, Tag } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import TGTitleWithShape from '@/components/TGTitleWithShape'
import TGShortcutMenu from '@/components/TGShortcutMenu'
import TGList from '@/components/TGList'

export default {
  render() {
    return (
      <div class="tg-home">
        <div class='tg-home-main'>
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
            <List
              class="container"
              dataSource={[
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 1 },
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 1 },
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 1 },
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 2 },
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 2 },
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 2 },
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 },
                { name: '紧急的待办事项', date: '2022/05/20 16:00:00', status: 3 }
              ]}
              {
                ...{
                  scopedSlots: {
                    renderItem: item => (
                      <List.Item class="list-container">
                        <TGTitleWithShape class={`shape ${['todo', 'doing', 'done'][+item.status - 1]}`}>
                          <span class="name">{item.name}</span>
                          <Tag color="#F5222D">急</Tag>
                        </TGTitleWithShape>
                        <Button.Group class="btns">
                          <Button>处理</Button>
                        </Button.Group>
                        <div class="date">{item.date}</div>
                      </List.Item>
                    )
                  }
                }
              }
            />
          </BNContainer>
        </div>
        <div class="tg-home-sider">
          <BNContainer
            width='100%'
            title='我的快捷菜单'
            showBoxShadow={false}
            class='shortcut-menu-container'
            titleClass='not-login-title'
            contentClass='shortcut-container'
          >
            <TGShortcutMenu column={3} />
          </BNContainer>
          <BNContainer
            class='my-news-container'
            width='100%'
            title='我的消息'
            showBoxShadow={false}
            showMore
            titleClass='not-login-title'
          >
            <TGList layout='dateBefore' />
          </BNContainer>
        </div>
      </div>
    )
  }
}
