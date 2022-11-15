/**
 * 表格混合
 * @Author: Omsber
 * @Email: xyzsyx@163.com
 * @Date: 2022-03-14 周一 16:08:37
 */

import { mapGetters } from 'vuex'
import { message, Modal, Table } from 'ant-design-vue'
import forIndex from '@/mixins/forIndex'
import { cloneDeep, omit } from 'lodash'

/**
 * 用于 table 的混合
 * @param [isInject=true] {boolean} 是否从 inject 导入 moduleName，默认 true
 * @param [isFetchList=true] {boolean} 是否在组件初始化完成后立即获取列表数据，默认 true
 * @param [stateName='list'] {string} 表格数据在 store.state 里对应的名称
 * @returns {Object}
 */
export default ({
  isInject = true,
  isFetchList = true,
  stateName = 'list'
} = {}) => {
  const _stateName = stateName
  const forTable = {
    mixins: [forIndex],
    inject: {
      // 通知组件在初始化阶段是否自动请求数据。
      // 该变量与 isFetchList 是相同的作用，区别在于 provide 和 inject 可以不限层级的传递数据。
      // 来自于 @/components/TGContainerWithTreeSider 组件。
      notInitList: { default: false }
    },
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
          size: 'middle',
          bordered: true,
          rowClassName(record, index) {
            return index % 2 === 1 ? 'table-row-background' : ''
          }
        },
        scopedSlots: { serialNumber: this.getConsecutiveSerialNumber },
        exportButtonDisabled: false
      }
    },
    computed: {
      ...mapGetters({ getState: 'getState' }),
      loading() {
        return this.getState('loading', this.moduleName, this.submoduleName)
      },
      currentItem() {
        return this.getState('currentItem', this.moduleName, this.submoduleName)
      },
      rowKey() {
        return this.getState('rowKey', this.moduleName, this.submoduleName) || 'id'
      },
      /**
       * 当前页起始序号（一般在存在分页的页面使用）
       * @returns {number}
       */
      currentPageStartNumber() {
        const pagination = this.getState('pagination', this.moduleName, this.submoduleName)

        return (pagination?.pageIndex ?? 0) * (pagination?.pageSize ?? 10)
      },
      selectedRowKeys() {
        return this.getState('selectedRowKeys', this.moduleName, this.submoduleName)
      },
      sortFieldList() {
        return this.getState('sortFieldList', this.moduleName, this.submoduleName)
      },
      attributes() {
        const events = {}

        if (this.sortFieldList?.length) {
          events.change = this.onChange
        }

        return {
          props: {
            ...this.tableProps,
            loading: this.loading
          },
          on: { ...events }
        }
      }
    },
    watch: {
      selectedRowKeys(value) {
        this.tableProps.rowSelection.selectedRowKeys = value
      },
      /**
       * 监听排序集合，根据后端返回的值初始化表头
       * @param value
       */
      sortFieldList(value) {
        value.map(sortObj => {
          const index = this.tableProps.columns.findIndex(column => column.dataIndex === sortObj.fieldCode)

          if (index !== -1) {
            this.tableProps.columns.splice(index, 1, {
              ...this.tableProps.columns[index],
              sorter: true,
              sortCode: sortObj.fieldSortCode
            })
          }
        })
      }
    },
    beforeMount() {
      this.tableProps.rowKey = this.rowKey
    },
    async mounted() {
      // 为 list 创建动态侦听器
      if (!this.submoduleName) {
        this.$watch(
          () => this.$store.state[this.moduleName].list,
          async list => {
            this.tableProps.dataSource = list
            this.resize()
          }
        )

        if (isFetchList && !this.notInitList) {
          await this.fetchList()
        }
      } else {
        // 判断是否是弹窗内的子模块列表
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
        record._sn = index + 1 + this.currentPageStartNumber

        return record._sn
      },
      /**
       * 获取列表数据
       * @param [merge] {boolean} 是否合并数据，默认false，主要用于“加载更多”功能
       * @returns {Promise<void>}
       */
      async fetchList({ merge } = {}) {
        return await this.$store.dispatch('getList', {
          merge,
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          /**
           * this.stateName 与 _stateName 解释：
           *  this.stateName 是在混入组件内设置的，可以在 混入组件的 computed 或 data 内定义；
           *
           *  _stateName 为本“混合”的参数，详情见顶部注释。通过“混合”的参数的传入，只能传递固定值，
           *  从 Vue.mixins 的特性可知，“混合”并不是在运行时中运行的。
           *  所以此处的 _stateName 只适合事先确定好的，不会改变的混入组件使用。
           */
          stateName: this.stateName || _stateName,
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
       * @param [customFieldName='status'] {string} 自定义参数名，用于传递状态变更值。默认 'status'
       * @param [actualFieldName='status'] {string} 列表中实际用于保存该状态的字段名，主要用于被修改状态的字段名不为 'status' 的情况下更新本地数据。
       *  当修改的状态的字段名不为 status 时必传。默认 'status'
       * @param [idKey='id'] {string} 自定义参数ID的名称， 默认 'id'
       * @param [nameKey='fullName'] {string} 自定义名称字段的键，主要用于页面提示。 默认 'fullName'
       * @param [customApiName] {string} 自定义请求接口名，一般在要修改状态字段的表格位于弹窗内时使用。
       * @param [stateName] {string} store.state 中存储该表格数据的字段名，默认 'list'
       * @param [optimisticUpdate=true] {string} 乐观更新，是否在成功调用更新接口后向服务器请求新的列表数据。
       * 默认true，使用乐观更新，即不向服务器请求新的列表数据，前端执行乐观更新操作。
       * @returns {Promise<void>}
       */
      async onStatusChange({
        checked,
        record,
        customFieldName = 'status',
        actualFieldName = 'status',
        idKey = 'id',
        nameKey = 'fullName',
        customApiName,
        stateName,
        optimisticUpdate = true
      } = {}) {
        stateName = stateName || _stateName

        const status = await this.$store.dispatch('updateStatus', {
          moduleName: this.moduleName,
          customFieldName,
          customApiName,
          stateName: stateName !== 'list' ? stateName : '',
          payload: {
            [idKey]: record[this.tableProps.rowKey || 'id'],
            [customFieldName]: checked ? 1 : 0
          }
        })

        const state = this.$store.state[this.moduleName]
        const _dataSource = cloneDeep((state[this.submoduleName] ?? state)[stateName])
        // _dataSource.list 取值是为了适配 store.state 中定义为 “{ loading: false, list: [] }” 结构的数据类型。
        // 如果遇到新的数据结构，可能需要另外的逻辑来适配，这里为了避免报错，赋值为空数组。
        const dataSource = Array.isArray(_dataSource) ? _dataSource : (_dataSource.list || [])
        const index = dataSource.findIndex(item => item[idKey] === record[idKey])

        if (status) {
          let name

          if (nameKey.includes('.')) {
            name = nameKey.split('.').reduce((prev, curr) => prev[curr], record)
          } else {
            name = record[nameKey]
          }

          message.success([
            <span style={{ color: '#16b364' }}>
              {name}
            </span>, ' 的状态已更新！'
          ])
        }

        if (optimisticUpdate) {
          if (status) {
            // 更新当前行受控Switch组件的值
            dataSource[index][actualFieldName] = checked ? 1 : 0
          } else {
            // 调用接口失败时，还原值
            dataSource[index][actualFieldName] = checked ? 0 : 1
          }

          this.$store.commit('setState', {
            stateName,
            value: stateName !== 'list' ? { loading: false, list: dataSource } : dataSource,
            moduleName: this.moduleName,
            submoduleName: this.submoduleName
          })
        } else {
          await this.fetchList()
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

        await this.$store.dispatch('export', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          additionalQueryParameters: payload,
          fileName: fileName
        })

        this.exportButtonDisabled = false
        message.destroy()
      },
      /**
       * antd vue Table 的 change 事件
       * 分页、排序、筛选变化时触发
       * @param pagination
       * @param filters
       * @param sorter
       * @returns {Promise<void>}
       */
      async onChange(pagination, filters, sorter) {
        await this.$store.dispatch('setSearch', {
          moduleName: this.moduleName,
          submoduleName: this.submoduleName,
          payload: {
            orderBy: sorter.column.sortCode.replace(
              /\$\{orderby}/,
              sorter.order.substring(0, sorter.order.length - 3)
            )
          },
          isResetSelectedRows: true // 注意此参数要设置为 true。因为排序变了，序号也重新计算了，所以需要清空已选择的行数据
        })
      },
      /**
       * 重新布局，根据页面大小判断是否显示Table组件的滚动条
       * 当且仅当对应store内的state.list发生变化时会自动调用，其余情况请手动调用;
       * 调用方式：建议在监听渲染表格的数据变化时调用
       */
      resize() {
        const tableRef = this.tableName
          ? this.$refs[this.tableName]
          : this.$refs[`${this.submoduleName ? `${this.submoduleName}Of` : ''}${this.moduleName}Table`]

        if (tableRef) {
          this.$nextTick(() => {
            // 表格元素
            const table = tableRef.$el
            const TABLE_CONTAINER_HEIGHT = table.clientHeight
            const HEADER_HEIGHT = table.querySelector('.ant-table-thead')?.clientHeight ?? 0
            const TABLE_BODY_WIDTH = table.querySelector('.ant-table-body')?.clientWidth ?? 0
            const HTML_TABLE_WIDTH = table.querySelector('.ant-table-body > table')?.clientWidth ?? 0
            const HTML_TABLE_HEIGHT = table.querySelector('.ant-table-body > table')?.clientHeight ?? 0
            const FOOTER_HEIGHT = table.querySelector('.ant-table-footer')?.clientHeight ?? 0
            const scroll = { scrollToFirstRowOnChange: true }

            // 固定列时，需要设置 scroll.x
            if (HTML_TABLE_WIDTH > TABLE_BODY_WIDTH) {
              scroll.x = TABLE_BODY_WIDTH
            }

            // 这里配合了css的flex布局实现
            if (HTML_TABLE_HEIGHT > TABLE_CONTAINER_HEIGHT) {
              // 多减去1像素是为了消除 '.ant-table-header.ant-table-hide-scrollbar' 元素上设置的 'margin: -6px;' 对布局的影响
              scroll.y = TABLE_CONTAINER_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - 1
            }

            this.tableProps.scroll = scroll
          })
        }
      }
    },
    render() {
      return (
        <Table
          ref={this.tableName || `${this.submoduleName ? `${this.submoduleName}Of` : ''}${this.moduleName}Table`}
          scopedSlots={this.scopedSlots}
          {...this.attributes}
        />
      )
    }
  }

  if (isInject) {
    forTable.inject = {
      ...forTable.inject,
      // 模块名（页面组件使用 dynamicState 混合后会自动 provide 该属性）
      moduleName: { default: undefined },
      // 获取本组件的ref，依赖 moduleName（从 /src/components/BNContainerWithSider 注入的函数）
      getRefOfChild: { default: () => undefined }
    }
  }

  return forTable
}
