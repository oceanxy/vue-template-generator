import './index.scss'
import { Button, Input, Table } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      columns: [
        {
          title: '中心',
          scopedSlots: { customRender: 'allPath' }
        },
        {
          title: '楼栋',
          scopedSlots: { customRender: 'remark' }
        },
        {
          title: '房号',
          scopedSlots: { customRender: 'remark2' }
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
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => {
            item.id = Math.random()
            return item
          })
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
        allPath: '',
        remark: '',
        id: Math.random()
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.$emit('change', this.dataSource)
    }
  },
  render() {
    // const attr = {
    //   props: {
    //     ...omit(this.$props, 'value'),
    //     ...this.$attrs
    //   },
    //   on: this.$listeners
    // }

    return (
      <div class="tg-multi-input">
        <Table
          class="multi-input-table"
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          rowKey="id"
          tableLayout={'fixed'}
          {...{
            scopedSlots: {
              allPath: (text, record) => (
                <Input
                  vModel={record.allPath}
                  placeholder="请输入完整路径"
                  onBlur={this.onChange}
                />
              ),
              remark: (text, record) => (
                <Input
                  vModel={record.remark}
                  placeholder="请输入备注"
                  onBlur={this.onChange}
                />
              ),
              remark2: (text, record) => (
                <Input
                  vModel={record.remark}
                  placeholder="请输入备注"
                  onBlur={this.onChange}
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
