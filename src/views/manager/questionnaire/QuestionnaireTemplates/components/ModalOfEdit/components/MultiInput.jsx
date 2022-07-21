import '../index.scss'
import { debounce } from 'lodash'
import ItemMultiInput from './ItemMultiInput'
import { Button, Input, Select, Space, Switch, Table } from 'ant-design-vue'

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
          title: '标题',
          width: 140,
          scopedSlots: { customRender: 'fullName' }
        },
        {
          title: '描述',
          width: 140,
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '选项',
          scopedSlots: { customRender: 'itemOptionList' }
        },
        {
          title: '组件类型',
          width: 100,
          scopedSlots: { customRender: 'modType' }
        },
        {
          title: '是否必填',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'isRequired' }
        },
        {
          title: '启用状态',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'status' }
        },
        {
          title: (
            <Button
              icon={'plus'}
              type="primary"
              ghost
              onClick={this.onCreateRow}
            >
              添加问卷题目
            </Button>
          ),
          width: 180,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: [],
      loading: false
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
        id: Math.random(),
        serialNum: this.dataSource.length + 1,
        fullName: '',
        itemOptionList: [],
        description: '',
        modType: 1,
        isRequired: true,
        status: true
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.loading = true
      this.$emit('change', this.dataSource)
      this.loading = false
    },
    onMoveUp(id) {
      this.loading = true
      const index = this.dataSource.findIndex(item => item.id === id)
      const target = this.dataSource.filter((item, i) => {
        if (index === i) {
          item.serialNum = +item.serialNum - 1
        }

        if (index - 1 === i) {
          item.serialNum = +item.serialNum + 1
        }

        return index === i || index - 1 === i
      })

      this.dataSource.splice(index - 1, 2, ...([target[0], target[1]] = [target[1], target[0]]))
      this.loading = false
    },
    onMoveDown(id) {
      this.loading = true
      const index = this.dataSource.findIndex(item => item.id === id)
      const target = this.dataSource.filter((item, i) => {
        if (index === i) {
          item.serialNum = +item.serialNum + 1
        }

        if (index + 1 === i) {
          item.serialNum = +item.serialNum - 1
        }

        return index === i || index + 1 === i
      })

      this.dataSource.splice(index, 2, ...([target[0], target[1]] = [target[1], target[0]]))
      this.loading = false
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
          loading={{
            spinning: this.loading,
            delay: 300
          }}
          {...{
            scopedSlots: {
              fullName: (text, record) => (
                <Input.TextArea
                  vModel={record.fullName}
                  placeholder="问卷标题"
                  autoSize={{ minRows: 4 }}
                  onBlur={() => this.onChange()}
                />
              ),
              modType: record => (
                <Select
                  vModel={record.modType}
                  placeholder={'组件类型'}
                  onChange={debounce(this.onChange, 300)}
                >
                  <Select.Option value={1}>单选</Select.Option>
                  <Select.Option value={2}>多选</Select.Option>
                  <Select.Option value={4}>简答</Select.Option>
                </Select>
              ),
              itemOptionList: record => (
                <ItemMultiInput
                  vModel={record.itemOptionList}
                  onChange={this.onChange}
                />
              ),
              description: record => (
                <Input.TextArea
                  vModel={record.description}
                  placeholder={'描述内容'}
                  autoSize={{ minRows: 4 }}
                  onBlur={this.onChange}
                />
              ),
              isRequired: record => (
                <Switch vModel={record.isRequired} onChange={this.onChange} />
              ),
              status: record => (
                <Switch vModel={record.status} onChange={this.onChange} />
              ),
              operation: (text, record, index) => (
                <Space>
                  <Button
                    icon="minus"
                    onClick={() => this.onDelClick(record.id)}
                  />
                  <Button
                    icon="up"
                    title={'上移'}
                    disabled={index <= 0}
                    onClick={() => this.onMoveUp(record.id)}
                  />
                  <Button
                    icon="down"
                    title={'下移'}
                    disabled={index >= this.dataSource.length - 1}
                    onClick={() => this.onMoveDown(record.id)}
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
