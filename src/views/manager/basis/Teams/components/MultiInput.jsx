import '../assets/styles/index.scss'
import { Button, Input, Switch, Table } from 'ant-design-vue'
import { debounce } from 'lodash'

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
          title: '姓名',
          width: 120,
          scopedSlots: { customRender: 'fullName' }
        },
        {
          title: '手机号码',
          scopedSlots: { customRender: 'mobile' }
        },
        {
          title: '身份证号',
          scopedSlots: { customRender: 'idCard' }
        },
        {
          title: '设为负责人',
          width: 120,
          align: 'center',
          scopedSlots: { customRender: 'isLeader' }
        },
        {
          title: (
            <Button
              icon={'plus'}
              onClick={this.onCreateRow}
              disabled={this.disabled}
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
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => {
            item.id = item.id || Math.random()

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

      this.emit()
    },
    onCreateRow() {
      const row = {
        fullName: '',
        mobile: '',
        idCard: '',
        isLeader: 0,
        id: Math.random()
      }

      this.dataSource.push(row)
    },
    onSwitchChange(value, record) {
      record.isLeader = value ? 1 : 0
      this.emit()
    },
    emit() {
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
          tableLayout={'fixed'}
          size={'middle'}
          {...{
            scopedSlots: {
              fullName: (text, record) => (
                <Input
                  vModel={record.fullName}
                  placeholder="请输入姓名"
                  disabled={this.disabled}
                  onChange={debounce(this.emit, 300)}
                />
              ),
              mobile: (text, record) => (
                <Input
                  vModel={record.mobile}
                  placeholder="请输入手机号码"
                  disabled={this.disabled}
                  onChange={debounce(this.emit, 300)}
                />
              ),
              idCard: (text, record) => (
                <Input
                  vModel={record.idCard}
                  placeholder="请输入身份证号码"
                  disabled={this.disabled}
                  onChange={debounce(this.emit, 300)}
                />
              ),
              isLeader: (text, record) => (
                <Switch
                  disabled={this.disabled}
                  defaultChecked={record.isLeader === 1}
                  onChange={value => this.onSwitchChange(value, record)}
                />
              ),
              operation: (text, record) => (
                <Button
                  icon="delete"
                  onClick={() => this.onDelClick(record.id)}
                  disabled={this.disabled}
                />
              )
            }
          }}
        />
      </div>
    )
  }
}
