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
          value.forEach(item => {
            if (!item.id) {
              item.id = Math.random()
            }

            if (!('hasError' in item)) {
              item.hasError = false
            } else {
              if (item.optionValue === '' || item.optionValue === undefined) {
                item.hasError = true
              }
            }
          })

          this.dataSource = value
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
      this.onChange()
    },
    onCreateRow() {
      const row = {
        id: Math.random(),
        optionValue: '',
        score: '',
        hasError: false
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.dataSource = this.dataSource.map(item => {
        item.hasError = (this.dataSource.length === 1 && item.optionValue === '') ||
          (item.optionValue === '' && item.score !== '')

        return item
      })

      this.$emit('change', this.dataSource)
    }
  },
  render() {
    return (
      <div class="tg-multi-input bnm-data-collection-item-table-container">
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
          class={'multi-input-table item-table'}
          tableLayout={'fixed'}
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          showHeader={false}
          rowKey="id"
          {...{
            scopedSlots: {
              optionValue: (text, record) => (
                <div class={record.hasError && !this.disabled ? 'has-error' : ''}>
                  <Input
                    vModel={record.optionValue}
                    placeholder="选项"
                    onBlur={() => this.onChange()}
                    disabled={this.disabled}
                  />
                </div>
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
