import '../index.scss'
import { Button, Input, InputNumber, Space, Table } from 'ant-design-vue'

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        {
          title: '选项',
          width: 105,
          scopedSlots: { customRender: 'optionValue' }
        },
        {
          title: '得分',
          width: 50,
          scopedSlots: { customRender: 'score' }
        },
        {
          title: '操作',
          width: 32,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: []
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
      <div class="tg-multi-input questionnaire-item-table-container">
        <Button
          icon={'plus'}
          ghost
          size={'small'}
          type={'primary'}
          class={'plus-btn'}
          onClick={this.onCreateRow}
          disabled={this.disabled}
        >
          添加选项
        </Button>
        <Table
          class="multi-input-table questionnaire-item-table"
          tableLayout={'fixed'}
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          showHeader={false}
          rowKey="id"
          {...{
            scopedSlots: {
              optionValue: (text, record) => (
                <Input
                  vModel={record.optionValue}
                  placeholder="选项"
                  onBlur={() => this.onChange()}
                  disabled={this.disabled}
                />
              ),
              score: record => (
                <InputNumber
                  vModel={record.score}
                  style={{ width: '100%' }}
                  placeholder={'得分'}
                  onBlur={() => this.onChange()}
                  disabled={this.disabled}
                />
              ),
              operation: (text, record) => (
                <Space>
                  <Button
                    disabled={this.disabled}
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
