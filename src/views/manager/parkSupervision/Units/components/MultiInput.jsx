import { Button, Input, Space, Switch, Table } from 'ant-design-vue'

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
    parentForm: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      columns: [
        {
          title: '开户行',
          width: 160,
          scopedSlots: { customRender: 'bankName' }
        },
        {
          title: '开户行账号',
          width: 160,
          scopedSlots: { customRender: 'bankNo' }
        },
        {
          title: '设为默认',
          width: 70,
          align: 'center',
          scopedSlots: { customRender: 'isDefault' }
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
          width: 40,
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
            item._isDefault = !!item.isDefault

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
        bankName: '',
        bankNo: '',
        isDefault: 0,
        _isDefault: false
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.$emit('change', this.dataSource)
    },
    onSwitchChange(record, checked) {
      if (checked) {
        this.dataSource.forEach(item => {
          if (item !== record) {
            item._isDefault = false
            item.isDefault = 0
          }
        })
      }

      record.isDefault = checked ? 1 : 0
      this.parentForm.setFields({ unitBankList: {} }) // 取消父级表单的验证信息，如果有

      this.onChange()
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
              bankName: (text, record) => (
                <Input
                  vModel={record.bankName}
                  placeholder="开户行"
                  onBlur={() => this.onChange()}
                />
              ),
              bankNo: record => (
                <Input
                  vModel={record.bankNo}
                  placeholder={'开户行账号'}
                  onBlur={() => this.onChange()}
                />
              ),
              isDefault: record => (
                <Switch
                  vModel={record._isDefault}
                  onChange={checked => this.onSwitchChange(record, checked)}
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
