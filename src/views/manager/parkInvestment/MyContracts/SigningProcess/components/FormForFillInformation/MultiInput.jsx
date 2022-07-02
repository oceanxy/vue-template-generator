import './index.scss'
import { Button, Table, TreeSelect } from 'ant-design-vue'
import { cloneDeep } from 'lodash'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      columns: [
        {
          title: '孵化场所',
          scopedSlots: { customRender: 'hatcheryId' }
        },
        {
          title: <Button icon={'plus'} onClick={this.onCreateRow} />,
          width: 60,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: []
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    hatcheryTree: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => ({
            id: item,
            value: item
          }))
        } else {
          this.dataSource = []
          this.onCreateRow()
        }
      }
    }
  },
  methods: {
    onDelClick(id) {
      const index = this.dataSource.findIndex(item => item.id === id)
      this.dataSource.splice(index, 1)
    },
    onCreateRow() {
      const row = {
        id: Math.random(),
        value: undefined
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.$emit('change', cloneDeep(this.dataSource).map(item => item.value))
    }
  },
  render() {
    return (
      <div class="tg-multi-input">
        <Table
          class="multi-input-table"
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          rowKey="id"
          tableLayout={'fixed'}
          size={'middle'}
          {...{
            scopedSlots: {
              hatcheryId: (text, record) => (
                <TreeSelect
                  vModel={record.value}
                  showSearch
                  allowClear
                  dropdownClassName={'bnm-select-dropdown'}
                  treeData={this.hatcheryTree}
                  replaceFields={{ children: 'children', title: 'name', key: 'id', value: 'id' }}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择孵化场所'}
                  onChange={this.onChange}
                />
              ),
              operation: (text, record) => (
                <Button icon="delete" onClick={() => this.onDelClick(record.id)} />
              )
            }
          }}
        />
      </div>
    )
  }
}
