/**
 * 表格混合
 * @Author: Oceanxy
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 16:08:37
 */

import { mapGetters } from 'vuex'
import { message, Modal } from 'ant-design-vue'
import forIndex from '@/mixins/forIndex'
import { omit } from 'lodash'

/**
 * 用于 table 的混合
 * @param [isInject] {boolean} 是否从 inject 导入 moduleName
 * @param [isFetchList] {boolean} 是否初始获取列表
 * @returns {Object}
 */
export default (isInject = true, isFetchList = true) => {
  const forTable = {
    mixins: [forIndex],
    data() {
      return {
        tableProps: {
          columns: [],
          rowSelection: {
            selections: true,
            fixed: true,
            columnWidth: 50,
            onChange: this.onRowSelectionChange,
            selectedRowKeys: []
          },
          // tableLayout: 'fixed',
          dataSource: [],
          loading: false,
          pagination: false,
          scroll: {}, // 注意：此属性不要手动设置，在this.resize方法内已经自动分配
          size: 'middle'
        },
        exportButtonDisabled: false
      }
    },
    computed: {
      ...mapGetters({
        getState: 'getState',
        getLoading: 'getLoading',
        getCurrentItem: 'getCurrentItem'
      }),
      rowKey() {
        return this.getState('rowKey', this.moduleName, this.submoduleName) || 'id'
      },
      serialNumber() {
        const pagination = this.getState('pagination', this.moduleName, this.submoduleName)

        return (pagination?.pageIndex ?? 0) * (pagination?.pageSize ?? 10)
      },
      selectedRowKeys() {
        return this.getState('selectedRowKeys', this.moduleName, this.submoduleName)
      }
    },
    watch: {
      selectedRowKeys(value) {
        this.tableProps.rowSelection.selectedRowKeys = value
      }
    },
    async created() {
      // 为 list 创建动态侦听器
      if (!this.submoduleName) {
        this.$watch(
          () => this.$store.state[this.moduleName].list,
          async list => {
            this.tableProps.dataSource = list
            this.resize()
          }
        )

        if (isFetchList) {
          await this.fetchList()
        }
      } else {
        if (this.visibleField) {
          this.$watch(
            () => this.$store.state[this.moduleName][this.visibleField],
            async visibleField => {
              if (visibleField && isFetchList) {
                await this.fetchList()
              }
            },
            { immediate: true }
          )
        } else {
          if (isFetchList) {
            await this.fetchList()
          }
        }

        this.$watch(
          () => this.$store.state[this.moduleName][this.submoduleName].list,
          async list => {
            this.tableProps.dataSource = list
            this.resize()
          },
          { immediate: true }
        )
      }
    },
    beforeMount() {
      this.tableProps.rowKey = this.rowKey
    },
    mounted() {
      window.addEventListener('resize', this.resize)

      this.$on('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.resize)
      })


      // 为 /src/components/BNContainerWithSider 组件注入获取 table ref 的逻辑
      if (this.getRefOfChild instanceof Function) {
        this.getRefOfChild(this.$refs[`${this.moduleName}Table`])
      }
    },
    methods: {
      /**
       * 生成连续的序号
       * @param text
       * @param record
       * @param index
       * @returns {*}
       */
      getConsecutiveSerialNumber(text, record, index) {
        record._sn = index + 1 + this.serialNumber

        return record._sn
      },
      /**
       * 获取列表数据
       * @param [merge] {boolean} 是否合并数据，默认false，主要用于“加载更多”功能
       * @returns {Promise<void>}
       */
      async fetchList(merge) {
        await this.$store.dispatch('getList', {
          merge,
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          stateName: this.stateName, // 在组件内设置用于接收数据的字段名，默认“list”
          additionalQueryParameters: {
            ...this.$route.query,
            // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
            // 请根据参数的取值和性质自行决定在 data 内或 computed 内定义。
            ...(this.additionalQueryParameters || {})
          }
        })
      },
      /**
       * 行内改变状态
       * @param checked {boolean} 当前状态
       * @param record {Object} 列表数据对象
       * @param [customFieldName] {string} 自定义字段名， 默认 'status'
       * @param [idKey] {string} 自定义ID字段的键， 默认 'id'
       * @param [nameKey] {string} 自定义名称字段的键， 默认 'fullName'
       * @returns {Promise<void>}
       */
      async onStatusChange({
        checked,
        record,
        customFieldName = 'status',
        idKey = 'id',
        nameKey = 'fullName'
      }) {
        const status = await this.$store.dispatch('updateStatus', {
          moduleName: this.moduleName,
          customFieldName,
          payload: {
            [idKey]: record[this.tableProps.rowKey || 'id'],
            [customFieldName]: checked ? 1 : 2
          }
        })

        const index = this.tableProps.dataSource.findIndex(item => item.id === record.id)

        if (status) {
          message.success([
            <span style={{ color: 'blue' }}>
              {record[nameKey]}
            </span>, ' 的状态已更新！'
          ])

          // 更新当前行受控Switch组件的值
          this.$set(this.tableProps.dataSource[index], customFieldName, checked ? 1 : 2)
        } else {
          // 调用接口失败时，还原值
          this.$set(this.tableProps.dataSource[index], customFieldName, checked ? 2 : 1)
        }
      },
      /**
       * 行内新增
       * @param initialValue {Object} 初始化默认值
       * @param parentId {string} 父级ID
       * @returns {Promise<void>}
       */
      async onAddClick(initialValue, parentId) {
        await this._setVisibleOfModal({
          parentId,
          ...omit(initialValue, 'id')
        })
      },
      /**
       * 编辑
       * @param record {Object} 列表数据对象
       * @returns {Promise<void>}
       */
      async onEditClick(record) {
        await this._setVisibleOfModal(record)
      },
      /**
       * 审核或相关意见填写
       * @param ids {string}
       * @returns {Promise<void>}
       */
      async onAuditClick(ids) {
        await this._setVisibleOfModal({ ids })
      },
      /**
       * 删除
       * @param record {Object} 列表数据对象
       */
      onDeleteClick(record) {
        Modal.confirm({
          title: '确认',
          content: '确定要删除吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: async close => {
            const status = await this.$store.dispatch('delete', {
              ids: [record.id],
              moduleName: this.moduleName,
              submoduleName: this.submoduleName,
              additionalQueryParameters: {
                ...this.$route.query,
                // 获取子模块数据需要的额外参数，在引用该混合的子模块内覆盖设置。
                // 请根据参数的取值和性质自行决定在 data 内或 computed 内定义。
                ...(this.additionalQueryParameters || {})
              }
            })

            if (status) {
              message.success([
                <span style={{ color: 'blue' }}>{record.fullName}</span>,
                ' 已成功删除！'
              ])
            }

            close()
          }
        })
      },
      /**
       * 表格行change事件回调
       * @param selectedRowKeys {string[]} 当前所有页码中选中行的ID，翻页不影响选中数据
       * @param selectedRows {Object[]} 当前页选中的数据对象
       * @returns {Promise<void>}
       */
      async onRowSelectionChange(selectedRowKeys, selectedRows) {
        await this.$store.dispatch('setRowSelected', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          payload: {
            selectedRowKeys,
            selectedRows
          }
        })
      },
      /**
       * 导出数据
       * @param payload {Object} 参数
       * @param fileName {string} 文件名称
       * @returns {Promise<void>}
       */
      async onExport(payload, fileName) {
        message.loading({
          content: '正在导出，请稍候...',
          duration: 0
        })
        this.exportButtonDisabled = true

        await this.$store.dispatch('downExcel', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          queryParameters: payload,
          fileName: fileName
        })

        this.exportButtonDisabled = false
        message.destroy()
      },
      /**
       * 重新布局，根据页面大小判断是否显示Table组件的滚动条
       * 当且仅当对应store内的state.list发生变化时会自动调用，其余情况请手动调用;
       * 调用方式：建议在监听渲染表格的数据变化时调用
       */
      resize() {
        const tableRef = this.$refs[`${this.submoduleName ? `${this.submoduleName}Of` : ''}${this.moduleName}Table`]

        if (tableRef) {
          this.$nextTick(() => {
            let notSetWidth = 0 // 未设置宽度的列的宽度和（每一列统一设置为100）
            // 表格元素
            const table = tableRef.$el
            // // 定宽列之和(不包含未设置宽度的列)
            const fixedWidthSum = this.tableProps.columns.reduce((total, item) => {
              if (!item.width) {
                notSetWidth += 100
              }

              return total + (item.width || 0)
            }, 0)
            const TABLE_CONTAINER_WIDTH = table.clientWidth
            const TABLE_CONTAINER_HEIGHT = table.clientHeight
            const HEADER_HEIGHT = table.querySelector('.ant-table-thead')?.clientHeight ?? 0
            const HTML_TABLE_HEIGHT = table.querySelector('.ant-table-body > table')?.clientHeight ?? 0
            const FOOTER_HEIGHT = table.querySelector('.ant-table-footer')?.clientHeight ?? 0
            const scroll = { scrollToFirstRowOnChange: true }

            // 固定列时，需要设置 scroll.x
            if (fixedWidthSum + notSetWidth > TABLE_CONTAINER_WIDTH) {
              scroll.x = fixedWidthSum + notSetWidth
            }

            // 这里配合了css的flex布局实现
            if (HTML_TABLE_HEIGHT > TABLE_CONTAINER_HEIGHT) {
              scroll.y = TABLE_CONTAINER_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT
            }

            this.tableProps.scroll = scroll
          })
        }
      }
    }
  }

  if (isInject) {
    forTable.inject = ['moduleName']
    forTable.inject = {
      // 模块名（页面组件使用 dynamicState 混合后会自动 provide 该属性）
      moduleName: { default: undefined },
      // 获取本组件的ref，依赖 moduleName（从 /src/components/BNContainerWithSider 注入的函数）
      getRefOfChild: { default: () => undefined }
    }
  }

  return forTable
}
