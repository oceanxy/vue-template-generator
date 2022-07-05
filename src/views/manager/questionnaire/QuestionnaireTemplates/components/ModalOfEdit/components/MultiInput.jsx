import '../index.scss'
import { debounce } from 'lodash'
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
          width: 160,
          scopedSlots: { customRender: 'fullName' }
        },
        {
          title: '描述',
          width: 160,
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '选项',
          scopedSlots: { customRender: 'optionValueList' }
        },
        {
          title: '数据类型',
          width: 120,
          scopedSlots: { customRender: 'dataType' }
        },
        {
          title: '组件类型',
          width: 120,
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
        id: Math.random(),
        serialNum: this.dataSource.length + 1,
        fullName: '',
        optionValueList: [],
        description: '',
        dataType: 1,
        modType: 1,
        isRequired: true,
        status: true
      }

      this.dataSource.push(row)
    },
    onChange() {
      this.$emit('change', this.dataSource)
    },
    onMoveUp(id) {
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

      this.dataSource.splice(index - 1, 2, ...target)
    },
    onMoveDown(id) {
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

      this.dataSource.splice(index - 1, 2, ...target)
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
              dataType: record => (
                <Select
                  vModel={record.dataType}
                  placeholder={'数据类型'}
                  onChange={debounce(this.onChange, 300)}
                >
                  <Select.Option value={1}>选择</Select.Option>
                  <Select.Option value={2}>数值</Select.Option>
                  <Select.Option value={3}>文本</Select.Option>
                  <Select.Option value={4}>时间</Select.Option>
                  <Select.Option value={5}>文件</Select.Option>
                  <Select.Option value={6}>地区</Select.Option>
                </Select>
              ),
              modType: record => (
                <Select
                  vModel={record.modType}
                  placeholder={'组件类型'}
                  onChange={debounce(this.onChange, 300)}
                >
                  <Select.Option value={1}>单选</Select.Option>
                  <Select.Option value={2}>多选</Select.Option>
                  <Select.Option value={3}>简答</Select.Option>
                </Select>
              ),
              optionValueList: record => (
                <Select
                  vModel={record.optionValueList}
                  mode={'tags'}
                  tokenSeparators={[',']}
                  placeholder={'请输入选项，按回车确认添加'}
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
                    disabled={index <= 0}
                    onClick={() => this.onMoveUp(record.id)}
                  />
                  <Button
                    icon="down"
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
