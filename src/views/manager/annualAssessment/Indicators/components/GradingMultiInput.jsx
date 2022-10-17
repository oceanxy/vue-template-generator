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
          title: '序号',
          width: 60,
          align: 'center',
          dataIndex: 'serialNum'
        },
        {
          title: '描述',
          scopedSlots: { customRender: 'optionValue' }
        },
        {
          title: '基准分',
          width: 100,
          scopedSlots: { customRender: 'score' }
        },
        {
          title: (
            <Button
              icon={'plus'}
              ghost
              size={'small'}
              type={'primary'}
              class={'plus-btn'}
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
        serialNum: this.dataSource.length + 1,
        optionValue: '',
        score: ''
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
          size={'middle'}
          rowKey="id"
          {...{
            scopedSlots: {
              optionValue: (text, record) => (
                <Input
                  vModel={record.optionValue}
                  placeholder="选项"
                  onBlur={() => this.onChange()}
                />
              ),
              score: record => (
                <InputNumber
                  vModel={record.score}
                  style={{ width: '100%' }}
                  placeholder={'得分'}
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
