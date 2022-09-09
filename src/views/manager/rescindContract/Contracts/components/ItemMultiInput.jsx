import { Button, Input, InputNumber, Space, Table } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      columns: [
        {
          title: '项目',
          scopedSlots: { customRender: 'itemName' }
        },
        {
          title: '描述',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '扣款金额（￥）',
          width: 150,
          scopedSlots: { customRender: 'amount' }
        },
        {
          title: (
            <Button
              icon={'plus'}
              ghost
              size={'small'}
              type={'primary'}
              onClick={this.onCreateRow}
            />
          ),
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
        id: Math.random(),
        itemName: '',
        description: '',
        amount: ''
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
          tableLayout={'fixed'}
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          rowKey="id"
          size={'middle'}
          {...{
            scopedSlots: {
              itemName: (text, record) => (
                <Input
                  vModel={record.itemName}
                  placeholder="项目"
                  onBlur={() => this.onChange()}
                />
              ),
              description: record => (
                <Input
                  vModel={record.description}
                  placeholder={'描述'}
                  onBlur={() => this.onChange()}
                />
              ),
              amount: record => (
                <InputNumber
                  vModel={record.amount}
                  style={{ width: '100%' }}
                  placeholder={'金额'}
                  precision={2}
                  onBlur={() => this.onChange()}
                />
              ),
              operation: (text, record) => (
                <Space>
                  <Button
                    icon="minus"
                    onClick={() => this.onDelClick(record.id)}
                  />
                </Space>
              )
            }
          }}
        />
      </div>
    )
  }
}
