import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import { message, Space } from 'ant-design-vue'

export default {
  name: 'TGContainerWithTable',
  inject: ['moduleName'],
  props: {
    // 是否显示侧边树
    showTree: {
      type: Boolean,
      default: false
    },
    // 是否显示页面标题
    showPageTitle: {
      type: Boolean,
      default: true
    },
    // 自定义容器的额外样式表
    customContentClassName: {
      type: String,
      default: ''
    }
  },
  provide: {
    // 提供给所有子级或插槽，以判断本页面是否存在列表组件
    isTableExist() {
      return !!this.$slots.table
    }
  },
  computed: {
    taskQueues() {
      return this.$store.state[this.moduleName].taskQueues ?? []
    }
  },
  async mounted() {
    await this.fetchTableData()
  },
  methods: {
    // 获取表格数据
    async fetchTableData() {
      if (this.showTree) {
        try {
          const result = await Promise.all(this.taskQueues)

          let payload = {}

          for (const _payload of result) {
            payload = { ...payload, ..._payload }
          }

          await this.$store.dispatch('setSearch', {
            moduleName: this.moduleName,
            submoduleName: this.submoduleName,
            payload,
            isResetSelectedRows: true,
            ...this.$attrs?.optionsOfGetList ?? {}
          })
        } catch (error) {
          message.error(error)
        }
      }
    },
    filterSlots() {
      return [
        this.$slots.inquiry || this.$slots.others,
        this.$slots.chart,
        // customContent 和 table 结构只能二选一，如果二者都存在，customContent 优先
        this.$slots.customContent
          ? (
            <div class={'tg-container-custom-content-container'}>
              <div
                class={
                  `tg-container-custom-content${this.customContentClassName
                    ? ` ${this.customContentClassName}`
                    : ''}`
                }
              >
                {this.$slots.customContent}
              </div>
              {
                this.$slots.bottomFunctions
                  ? (
                    <div class={'tg-container-bottom-functions'}>
                      {this.$slots.bottomFunctions}
                    </div>
                  )
                  : null
              }
            </div>
          )
          : this.$slots.table
            ? (
              <div class={'tg-container-table-container'}>
                {this.$slots.table}
                {this.$slots.pagination}
                {this.$slots.default}
              </div>
            )
            : null,
        <div class="tg-container-modals">{this.$slots.modals}</div>
      ]
    }
  },
  render() {
    return (
      <div class="tg-container">
        <div class={'tg-content-title'}>
          {
            this.showPageTitle
              ? (
                <Space class={'tg-content-title-space'}>
                  {
                    this.$route.meta.icon
                      ? <IconFont type={this.$route.meta.icon} />
                      : null
                  }
                  {this.$route.meta.title}
                </Space>
              )
              : null
          }
          <div class={'tg-content-function'}>
            {
              this.$slots.functions
                ? this.$slots.functions
                : null
            }
          </div>
        </div>
        {
          this.showTree
            ? (
              <TGContainerWithTreeSider props={{ ...this.$attrs }}>
                {this.filterSlots()}
              </TGContainerWithTreeSider>
            )
            : (
              <div class="tg-container-content">
                {this.filterSlots()}
              </div>
            )
        }
      </div>
    )
  }
}
