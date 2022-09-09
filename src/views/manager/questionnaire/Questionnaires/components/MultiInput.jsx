import '../assets/styles/index.scss'
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
          title: '名称',
          scopedSlots: { customRender: 'fullName' }
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
      this.$emit('change', this.dataSource)
    },
    onCreateRow() {
      const row = {
        fullName: '',
        id: Math.random()
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.$emit('change', this.dataSource)
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
          size={'middle'}
          tableLayout={'fixed'}
          {...{
            scopedSlots: {
              fullName: (text, record) => (
                <Input
                  vModel={record.fullName}
                  placeholder="请输入名称搜索资讯"
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
