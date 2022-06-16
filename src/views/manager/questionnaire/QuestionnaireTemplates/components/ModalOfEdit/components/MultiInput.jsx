import '../index.scss'
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
          scopedSlots: { customRender: 'a' }
        },
        {
          title: '标题',
          scopedSlots: { customRender: 'allPath' }
        },
        {
          title: '数据类型',
          scopedSlots: { customRender: 'dataType' }
        },
        {
          title: '组件类型',
          scopedSlots: { customRender: 'compType' }
        },
        {
          title: '选项（一行一项）',
          scopedSlots: { customRender: 'item' }
        },
        {
          title: '描述',
          scopedSlots: { customRender: 'remark' }
        },
        {
          title: '是否必填',
          scopedSlots: { customRender: 'isRequired' }
        },
        {
          title: '启用状态',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          width: 100,
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
        <Button
          icon={'plus'}
          type="primary"
          ghost
          onClick={this.onCreateRow}
        >
          添加问卷题目
        </Button>
        <Table
          class="multi-input-table"
          tableLayout={'fixed'}
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          rowKey="id"
          {...{
            scopedSlots: {
              allPath: (text, record) => (
                <Input
                  vModel={record.allPath}
                  placeholder="请输入完整路径"
                  onBlur={this.onChange}
                />
              ),
              dataType: record => (
                <Select>
                  <Select.Option value={1}>文件</Select.Option>
                  <Select.Option value={2}>数值</Select.Option>
                  <Select.Option value={3}>序列</Select.Option>
                </Select>
              ),
              compType: record => (
                <Select>
                  <Select.Option value={1}>单选</Select.Option>
                  <Select.Option value={2}>多选</Select.Option>
                  <Select.Option value={3}>简答</Select.Option>
                </Select>
              ),
              item: record => (
                <Input
                  type="textarea"
                  autosize={{ minRows: 4 }}
                  placeholder={'例如：\r\n选项一\r\n选项二\r\n选项三'}
                />
              ),
              remark: record => (
                <Input
                  type="textarea"
                  autosize={{ minRows: 4 }}
                />
              ),
              isRequired: record => (
                <Switch />
              ),
              status: record => (
                <Switch />
              ),
              operation: (text, record) => (
                <Space>
                  <Button icon="up" onClick={() => this.onDelClick(record.id)} />
                  <Button icon="down" onClick={() => this.onDelClick(record.id)} />
                </Space>
              )
            }
          }}
        />
      </div>
    )
  }
}
